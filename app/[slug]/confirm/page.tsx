'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BrandMark, Wordmark } from '@/components/Brand'

type Appointment = {
  id: string
  clientName: string
  startsAt: string
  endsAt: string
  service: { name: string }
  barber: { shopName: string; slug: string }
}

function formatICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function ConfirmContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [appt, setAppt] = useState<Appointment | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/appointments/${id}`).then(r => {
      if (!r.ok) { setNotFound(true); return null }
      return r.json()
    }).then(data => { if (data) setAppt(data) })
  }, [id])

  function downloadICS() {
    if (!appt) return
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(new Date(appt.startsAt))}`,
      `DTEND:${formatICSDate(new Date(appt.endsAt))}`,
      `SUMMARY:${appt.service.name} — ${appt.barber.shopName}`,
      `DESCRIPTION:Turno en ${appt.barber.shopName}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'turno.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (notFound) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--c-muted)' }}>Turno no encontrado.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Volver al inicio</Link>
      </div>
    </div>
  )

  if (!appt) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--c-muted)', fontFamily: 'var(--f-mono)', fontSize: 13 }}>Cargando…</p>
    </div>
  )

  const startsAt = new Date(appt.startsAt)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <BrandMark size={28} />
            <Wordmark size={20} />
          </Link>
        </div>

        <div className="panel" style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, background: 'var(--c-success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>TURNO RESERVADO</span>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 24px' }}>
            ¡Todo listo, {appt.clientName.split(' ')[0]}!
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left', background: 'var(--c-bg)', borderRadius: 'var(--r-2)', padding: '20px 24px', marginBottom: 24 }}>
            <Row label="Servicio" value={appt.service.name} />
            <Row label="Local" value={appt.barber.shopName} />
            <Row label="Fecha" value={startsAt.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })} />
            <Row label="Hora" value={startsAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} mono />
          </div>

          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }} onClick={downloadICS}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Agregar al calendario
          </button>

          <Link href={`/${appt.barber.slug}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
            Reservar otro turno
          </Link>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span className="label">{label}</span>
      <span style={{ fontSize: 15, fontFamily: mono ? 'var(--f-mono)' : 'var(--f-body)', color: 'var(--c-ink)' }}>{value}</span>
    </div>
  )
}

export default function ConfirmPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--c-muted)' }}>Cargando…</p></div>}>
      <ConfirmContent slug={params.slug} />
    </Suspense>
  )
}
