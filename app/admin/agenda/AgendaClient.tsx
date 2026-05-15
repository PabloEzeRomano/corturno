'use client'
import { useState, useEffect, useCallback } from 'react'

type Appointment = {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string | null
  startsAt: string
  endsAt: string
  status: string
  service: { name: string; durationMins: number; price: number }
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmado',
  completed: 'Completado',
  cancelled: 'Cancelado',
}
const STATUS_COLORS: Record<string, string> = {
  confirmed: 'var(--c-gold)',
  completed: 'var(--c-success)',
  cancelled: 'var(--c-danger)',
}
const STATUS_BG: Record<string, string> = {
  confirmed: '#FAF3DD',
  completed: 'var(--c-success-bg)',
  cancelled: 'var(--c-danger-bg)',
}

function getWeekDates(base: Date): Date[] {
  const start = new Date(base)
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    return d
  })
}

function fmt(d: Date) {
  return d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
}
function fmtTime(s: string) {
  return new Date(s).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function AgendaClient({ barberId, slug, shopName }: { barberId: string; slug: string; shopName: string }) {
  const [view, setView] = useState<'week' | 'day'>('week')
  const [base, setBase] = useState(new Date())
  const [statusFilter, setStatusFilter] = useState('all')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const weekDates = getWeekDates(base)

  const load = useCallback(async () => {
    const from = view === 'week' ? weekDates[0].toISOString() : new Date(base.setHours(0, 0, 0, 0)).toISOString()
    const to = view === 'week' ? weekDates[6].toISOString() : new Date(base.setHours(23, 59, 59, 999)).toISOString()
    const params = new URLSearchParams({ from, to, ...(statusFilter !== 'all' && { status: statusFilter }) })
    const res = await fetch(`/api/appointments?${params}`)
    if (res.ok) setAppointments(await res.json())
  }, [view, base, statusFilter])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setDrawerOpen(false)
    setSelected(null)
    load()
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://turnos.gemm-apps.com/${slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayDates = view === 'week' ? weekDates : [base]

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <span className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>AGENDA</span>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>{shopName}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm" onClick={copyLink}>{copied ? '¡Copiado!' : 'Copiar link'}</button>
          <div style={{ display: 'flex', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
            {(['week', 'day'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '8px 14px', fontSize: 13, fontWeight: v === view ? 500 : 400, background: v === view ? 'var(--c-ink)' : '#fff', color: v === view ? '#fff' : 'var(--c-muted)', border: 'none', cursor: 'pointer', fontFamily: 'var(--f-body)' }}>
                {v === 'week' ? 'Semana' : 'Día'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status filter */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
        {[['all', 'Todos'], ['confirmed', 'Confirmados'], ['completed', 'Completados'], ['cancelled', 'Cancelados']].map(([val, label]) => (
          <button key={val} onClick={() => setStatusFilter(val)} style={{ padding: '6px 14px', fontSize: 13, fontWeight: statusFilter === val ? 500 : 400, background: statusFilter === val ? 'var(--c-ink)' : 'var(--c-surface)', color: statusFilter === val ? '#fff' : 'var(--c-muted)', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', cursor: 'pointer', fontFamily: 'var(--f-body)', transition: 'all .15s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Date nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => { const d = new Date(base); d.setDate(d.getDate() - (view === 'week' ? 7 : 1)); setBase(d) }}>
          ← {view === 'week' ? 'Semana anterior' : 'Día anterior'}
        </button>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--c-muted)' }}>
          {view === 'week' ? `${fmt(weekDates[0])} — ${fmt(weekDates[6])}` : base.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={() => { const d = new Date(base); d.setDate(d.getDate() + (view === 'week' ? 7 : 1)); setBase(d) }}>
          {view === 'week' ? 'Semana siguiente' : 'Día siguiente'} →
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => setBase(new Date())}>Hoy</button>
      </div>

      {/* Calendar grid */}
      {appointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--c-muted)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--c-muted-30)', marginBottom: 20 }}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>
          <p style={{ fontFamily: 'var(--f-display)', fontSize: 22, color: 'var(--c-ink)', marginBottom: 8 }}>Sin turnos en este período</p>
          <p style={{ fontSize: 14, marginBottom: 20 }}>Compartí tu link para que los clientes reserven.</p>
          <button className="btn btn-outline btn-sm" onClick={copyLink}>{copied ? '¡Copiado!' : 'Copiar link público'}</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: view === 'week' ? 'repeat(7, 1fr)' : '1fr', gap: 1, background: 'var(--c-line)', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
          {displayDates.map(date => {
            const dayAppts = appointments.filter(a => isSameDay(new Date(a.startsAt), date))
            const isToday = isSameDay(date, new Date())
            return (
              <div key={date.toISOString()} style={{ background: 'var(--c-surface)', minHeight: 120 }}>
                <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--c-line)', background: isToday ? 'var(--c-gold-soft)' : 'var(--c-bg)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: isToday ? 'var(--c-gold-deep)' : 'var(--c-muted)' }}>
                    {date.toLocaleDateString('es-AR', { weekday: 'short' }).toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 500, color: isToday ? 'var(--c-gold-deep)' : 'var(--c-ink)' }}>{date.getDate()}</span>
                </div>
                <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {dayAppts.map(appt => (
                    <button key={appt.id} onClick={() => { setSelected(appt); setDrawerOpen(true) }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', background: STATUS_BG[appt.status] || 'var(--c-bg-2)', borderLeft: `3px solid ${STATUS_COLORS[appt.status] || 'var(--c-muted)'}`, borderRadius: 'var(--r-1)', padding: '6px 8px', fontSize: 11, cursor: 'pointer', border: `1px solid transparent`, borderLeftWidth: 3, borderLeftColor: STATUS_COLORS[appt.status] || 'var(--c-muted)', fontFamily: 'var(--f-body)', lineHeight: 1.4 }}>
                      <div style={{ fontWeight: 500, color: 'var(--c-ink)' }}>{appt.clientName}</div>
                      <div style={{ color: 'var(--c-muted)', fontFamily: 'var(--f-mono)', fontSize: 10 }}>{fmtTime(appt.startsAt)} · {appt.service.name}</div>
                      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[appt.status], marginTop: 2 }} />
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Drawer */}
      {drawerOpen && selected && (
        <>
          <div onClick={() => { setDrawerOpen(false); setSelected(null) }} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.4)', zIndex: 40 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 380, background: 'var(--c-surface)', boxShadow: 'var(--sh-2)', zIndex: 50, padding: 28, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: 8 }}>TURNO</span>
                <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: 0 }}>{selected.clientName}</h2>
              </div>
              <button onClick={() => { setDrawerOpen(false); setSelected(null) }} className="btn btn-ghost btn-sm">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Row label="Servicio" value={selected.service.name} />
              <Row label="Hora" value={`${fmtTime(selected.startsAt)} — ${fmtTime(selected.endsAt)}`} mono />
              <Row label="Precio" value={`$${selected.service.price.toLocaleString('es-AR')}`} mono />
              <Row label="Teléfono" value={selected.clientPhone} mono />
              {selected.clientEmail && <Row label="Email" value={selected.clientEmail} />}
              <div>
                <span className="label">Estado</span>
                <span className={`badge badge-${selected.status}`}>{STATUS_LABELS[selected.status]}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
              {selected.status !== 'completed' && (
                <button className="btn btn-primary" onClick={() => updateStatus(selected.id, 'completed')}>Marcar como completado</button>
              )}
              {selected.status !== 'cancelled' && (
                <button className="btn btn-outline" style={{ borderColor: 'var(--c-danger)', color: 'var(--c-danger)' }} onClick={() => updateStatus(selected.id, 'cancelled')}>Cancelar turno</button>
              )}
              {selected.status !== 'confirmed' && (
                <button className="btn btn-ghost" onClick={() => updateStatus(selected.id, 'confirmed')}>Reconfirmar</button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span className="label">{label}</span>
      <span style={{ fontSize: 14.5, fontFamily: mono ? 'var(--f-mono)' : 'var(--f-body)', color: 'var(--c-ink)' }}>{value}</span>
    </div>
  )
}
