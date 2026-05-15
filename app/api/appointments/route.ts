export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { barberId, serviceId, clientName, clientPhone, clientEmail, date, time } = await req.json()

    if (!barberId || !serviceId || !clientName || !clientPhone || !date || !time) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } })
    if (!service) return NextResponse.json({ error: 'Servicio no encontrado.' }, { status: 404 })

    const [h, m] = time.split(':').map(Number)
    const startsAt = new Date(`${date}T${time}:00`)
    const endsAt = new Date(startsAt.getTime() + service.durationMins * 60 * 1000)

    const appt = await prisma.appointment.create({
      data: { barberId, serviceId, clientName, clientPhone, clientEmail: clientEmail || null, startsAt, endsAt },
    })

    return NextResponse.json(appt, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = req.nextUrl
  const status = searchParams.get('status')
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const where: Record<string, unknown> = { barberId }
  if (status && status !== 'all') where.status = status
  if (from) where.startsAt = { ...(where.startsAt as object || {}), gte: new Date(from) }
  if (to) where.startsAt = { ...(where.startsAt as object || {}), lte: new Date(to) }

  const appointments = await prisma.appointment.findMany({
    where,
    include: { service: true },
    orderBy: { startsAt: 'asc' },
  })

  return NextResponse.json(appointments)
}
