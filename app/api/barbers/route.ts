export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, shopName } = await req.json()

    if (!name || !email || !password || !shopName) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres.' }, { status: 400 })
    }

    const existing = await prisma.barber.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Ya existe una cuenta con ese email.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

    let baseSlug = slugify(shopName)
    if (!baseSlug) baseSlug = slugify(name)
    let slug = baseSlug
    let counter = 2
    while (await prisma.barber.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`
    }

    const barber = await prisma.$transaction(async (tx) => {
      const b = await tx.barber.create({
        data: {
          name,
          email,
          password: hashedPassword,
          slug,
          shopName,
          phone: phone || null,
          trialEndsAt,
          services: {
            create: [
              { name: 'Corte', durationMins: 30, price: 3500 },
              { name: 'Corte + Barba', durationMins: 45, price: 5000 },
              { name: 'Puntas', durationMins: 30, price: 2500 },
              { name: 'Full Color', durationMins: 45, price: 7500 },
            ],
          },
          availability: {
            create: [1, 2, 3, 4, 5, 6].map((day) => ({
              dayOfWeek: day,
              startTime: '09:00',
              endTime: '19:00',
              isActive: true,
            })),
          },
        },
      })
      return b
    })

    return NextResponse.json({ id: barber.id, slug: barber.slug }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 })
  }
}
