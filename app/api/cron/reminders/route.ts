export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendAppointmentReminder } from '@/lib/reminders'

export async function GET() {
  const now = new Date()
  const in3h = new Date(now.getTime() + 3 * 60 * 60 * 1000)

  const pending = await prisma.appointment.findMany({
    where: {
      startsAt: { gte: now, lte: in3h },
      reminderSent: false,
      status: 'confirmed',
    },
  })

  for (const appt of pending) {
    await sendAppointmentReminder(appt.id)
  }

  return NextResponse.json({ processed: pending.length })
}
