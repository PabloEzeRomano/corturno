export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

async function getBarberId(session: unknown) {
  return (session as { barberId?: string })?.barberId
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = await getBarberId(session)
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const services = await prisma.service.findMany({ where: { barberId }, orderBy: { name: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = await getBarberId(session)
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, durationMins, price } = await req.json()
  if (!name || !durationMins || price === undefined) {
    return NextResponse.json({ error: 'Faltan campos.' }, { status: 400 })
  }

  const service = await prisma.service.create({
    data: { barberId, name, durationMins: Number(durationMins), price: Number(price) },
  })
  return NextResponse.json(service, { status: 201 })
}
