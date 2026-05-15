export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const barberId = (session as { barberId?: string }).barberId
  const { status } = await req.json()

  if (!['confirmed', 'completed', 'cancelled'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const appt = await prisma.appointment.findUnique({ where: { id: params.id } })
  if (!appt || appt.barberId !== barberId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const updated = await prisma.appointment.update({ where: { id: params.id }, data: { status } })
  return NextResponse.json(updated)
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const appt = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { service: true, barber: { select: { shopName: true, slug: true } } },
  })
  if (!appt) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(appt)
}
