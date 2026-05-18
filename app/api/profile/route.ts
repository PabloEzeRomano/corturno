export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const barber = await prisma.barber.findUnique({
    where: { id: barberId },
    select: { id: true, name: true, phone: true, shopName: true, slug: true, email: true },
  })
  if (!barber) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(barber)
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, phone, shopName } = await req.json()

  const updated = await prisma.barber.update({
    where: { id: barberId },
    data: {
      ...(name !== undefined && { name }),
      ...(phone !== undefined && { phone: phone || null }),
      ...(shopName !== undefined && { shopName }),
    },
    select: { id: true, name: true, phone: true, shopName: true, slug: true },
  })

  return NextResponse.json(updated)
}

export async function DELETE() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.$transaction([
    prisma.appointment.deleteMany({ where: { barberId } }),
    prisma.service.deleteMany({ where: { barberId } }),
    prisma.availability.deleteMany({ where: { barberId } }),
    prisma.blockedDate.deleteMany({ where: { barberId } }),
    prisma.barber.delete({ where: { id: barberId } }),
  ])

  return NextResponse.json({ success: true })
}
