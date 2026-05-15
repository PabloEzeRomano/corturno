export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { BookingFlow } from './BookingFlow'

export default async function PublicBookingPage({ params }: { params: { slug: string } }) {
  const barber = await prisma.barber.findUnique({
    where: { slug: params.slug },
    include: { services: { where: { isActive: true }, orderBy: { name: 'asc' } } },
  })
  if (!barber) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
      {/* Header */}
      <div style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-line)', padding: '24px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11.5px', textTransform: 'uppercase' as const, letterSpacing: '0.16em', color: 'var(--c-gold-deep)', display: 'block', marginBottom: 6 }}>Reservá tu turno</span>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>{barber.shopName}</h1>
        </div>
      </div>

      <BookingFlow
        barberId={barber.id}
        slug={params.slug}
        services={barber.services.map(s => ({ id: s.id, name: s.name, durationMins: s.durationMins, price: s.price }))}
      />
    </div>
  )
}
