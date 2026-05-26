export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateAppointmentInstances, deleteFutureInstances, MONTHS_TO_GENERATE } from '@/lib/recurring'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rule = await prisma.recurringAppointment.findUnique({
    where: { id: params.id },
    include: { service: true },
  })
  if (!rule || rule.barberId !== barberId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = await req.json()

  if (body.status && ['active', 'paused', 'cancelled'].includes(body.status)) {
    if (body.status === 'cancelled') {
      await deleteFutureInstances(params.id)
    }

    await prisma.recurringAppointment.update({
      where: { id: params.id },
      data: { status: body.status },
    })

    if (body.status === 'active' && rule.status !== 'active') {
      const end = rule.endDate
      const untilDate = end || new Date(Date.now() + MONTHS_TO_GENERATE * 30 * 24 * 60 * 60 * 1000)
      await generateAppointmentInstances(
        {
          recurringAppointmentId: params.id,
          barberId: rule.barberId,
          serviceId: rule.serviceId,
          clientName: rule.clientName,
          clientPhone: rule.clientPhone,
          clientEmail: rule.clientEmail,
          frequency: rule.frequency as 'weekly' | 'biweekly',
          dayOfWeek: rule.dayOfWeek,
          time: rule.time,
          startDate: rule.startDate,
          endDate: rule.endDate,
        },
        untilDate,
      )
    }

    return NextResponse.json({ success: true })
  }

  if (body.regenerate) {
    const end = rule.endDate
    const untilDate = end || new Date(Date.now() + MONTHS_TO_GENERATE * 30 * 24 * 60 * 60 * 1000)
    const created = await generateAppointmentInstances(
      {
        recurringAppointmentId: params.id,
        barberId: rule.barberId,
        serviceId: rule.serviceId,
        clientName: rule.clientName,
        clientPhone: rule.clientPhone,
        clientEmail: rule.clientEmail,
        frequency: rule.frequency as 'weekly' | 'biweekly',
        dayOfWeek: rule.dayOfWeek,
        time: rule.time,
        startDate: rule.startDate,
        endDate: rule.endDate,
      },
      untilDate,
    )
    return NextResponse.json({ instancesCreated: created })
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rule = await prisma.recurringAppointment.findUnique({ where: { id: params.id } })
  if (!rule || rule.barberId !== barberId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await deleteFutureInstances(params.id)
  await prisma.recurringAppointment.delete({ where: { id: params.id } })

  return NextResponse.json({ success: true })
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rule = await prisma.recurringAppointment.findUnique({
    where: { id: params.id },
    include: {
      service: { select: { name: true, durationMins: true, price: true } },
      appointments: {
        where: { startsAt: { gte: new Date() } },
        orderBy: { startsAt: 'asc' },
        select: { id: true, startsAt: true, endsAt: true, status: true },
      },
    },
  })
  if (!rule || rule.barberId !== barberId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(rule)
}
