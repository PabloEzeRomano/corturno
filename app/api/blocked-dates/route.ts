export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const blocked = await prisma.blockedDate.findMany({ where: { barberId }, orderBy: { date: 'asc' } })
  return NextResponse.json(blocked)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { date, reason } = await req.json()
  if (!date) return NextResponse.json({ error: 'Fecha requerida.' }, { status: 400 })

  const blocked = await prisma.blockedDate.create({
    data: { barberId, date: new Date(date), reason: reason || null },
  })
  return NextResponse.json(blocked, { status: 201 })
}
