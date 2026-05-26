export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateAppointmentInstances, deleteFutureInstances, MONTHS_TO_GENERATE } from '@/lib/recurring'

export async function GET() {
  const session = await auth()
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rules = await prisma.recurringAppointment.findMany({
    where: { barberId },
    include: {
      service: { select: { name: true, durationMins: true, price: true } },
      appointments: {
        where: { startsAt: { gte: new Date() } },
        orderBy: { startsAt: 'asc' },
        take: 1,
        select: { startsAt: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const result = rules.map(r => ({
    ...r,
    nextAppointment: r.appointments[0]?.startsAt || null,
    appointments: undefined,
  }))

  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { serviceId, clientName, clientPhone, clientEmail, frequency, dayOfWeek, time, startDate, endDate } = await req.json()

  if (!serviceId || !clientName || !clientPhone || !frequency || dayOfWeek === undefined || !time || !startDate) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
  }

  if (!['weekly', 'biweekly'].includes(frequency)) {
    return NextResponse.json({ error: 'Frecuencia inválida.' }, { status: 400 })
  }

  const service = await prisma.service.findFirst({
    where: { id: serviceId, barberId },
  })
  if (!service) return NextResponse.json({ error: 'Servicio no encontrado.' }, { status: 404 })

  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null

  const rule = await prisma.recurringAppointment.create({
    data: {
      barberId,
      serviceId,
      clientName,
      clientPhone,
      clientEmail: clientEmail || null,
      frequency,
      dayOfWeek,
      time,
      startDate: start,
      endDate: end,
    },
  })

  const untilDate = end || new Date(start.getTime() + MONTHS_TO_GENERATE * 30 * 24 * 60 * 60 * 1000)
  const created = await generateAppointmentInstances(
    {
      recurringAppointmentId: rule.id,
      barberId,
      serviceId,
      clientName,
      clientPhone,
      clientEmail: clientEmail || null,
      frequency: frequency as 'weekly' | 'biweekly',
      dayOfWeek,
      time,
      startDate: start,
      endDate: end,
    },
    untilDate,
  )

  return NextResponse.json({ rule, instancesCreated: created }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID requerido.' }, { status: 400 })

  const rule = await prisma.recurringAppointment.findUnique({ where: { id } })
  if (!rule || rule.barberId !== barberId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await deleteFutureInstances(id)
  await prisma.recurringAppointment.update({
    where: { id },
    data: { status: 'cancelled' },
  })

  return NextResponse.json({ success: true })
}
