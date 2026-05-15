export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const barberId = (session as { barberId?: string }).barberId
  if (!barberId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const service = await prisma.service.findUnique({ where: { id: params.id } })
  if (!service || service.barberId !== barberId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const updated = await prisma.service.update({
    where: { id: params.id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.durationMins !== undefined && { durationMins: Number(data.durationMins) }),
      ...(data.price !== undefined && { price: Number(data.price) }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  })
  return NextResponse.json(updated)
}
