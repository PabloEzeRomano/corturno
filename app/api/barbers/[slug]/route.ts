export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const barber = await prisma.barber.findUnique({
    where: { slug: params.slug },
    include: {
      services: { where: { isActive: true }, orderBy: { name: 'asc' } },
    },
  })
  if (!barber) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { password: _, ...safe } = barber
  return NextResponse.json(safe)
}
