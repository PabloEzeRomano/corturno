export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAvailableSlots } from '@/lib/availability'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { searchParams } = req.nextUrl
  const dateStr = searchParams.get('date')
  const serviceId = searchParams.get('serviceId')
  const excludeId = searchParams.get('excludeId')

  if (!dateStr || !serviceId) {
    return NextResponse.json({ error: 'Missing date or serviceId' }, { status: 400 })
  }

  const barber = await prisma.barber.findUnique({ where: { slug: params.slug } })
  if (!barber) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const service = await prisma.service.findUnique({ where: { id: serviceId } })
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })

  const date = new Date(dateStr + 'T00:00:00')
  const slots = await getAvailableSlots(barber.id, date, service.durationMins, excludeId || undefined)

  return NextResponse.json({ slots })
}
