'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Service = { id: string; name: string; durationMins: number; price: number }

const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DAYS_ES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const pad = first.getDay()
  const days: (Date | null)[] = []
  for (let i = 0; i < pad; i++) days.push(null)
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d))
  return days
}

export function BookingFlow({ barberId, slug, services }: { barberId: string; slug: string; services: Service[] }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [calYear, setCalYear] = useState(new Date().getFullYear())
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [slots, setSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('corturno_client')
      if (saved) setForm(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (!selectedDate || !selectedService) return
    setSlotsLoading(true)
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    fetch(`/api/availability/${slug}?date=${dateStr}&serviceId=${selectedService.id}`)
      .then(r => r.json())
      .then(data => { setSlots(data.slots || []); setSlotsLoading(false) })
      .catch(() => setSlotsLoading(false))
  }, [selectedDate, selectedService, slug])

  async function submitBooking() {
    if (!selectedService || !selectedDate || !selectedSlot) return
    setSubmitting(true)
    try {
      localStorage.setItem('corturno_client', JSON.stringify(form))
    } catch {}
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        barberId,
        serviceId: selectedService.id,
        clientName: form.name,
        clientPhone: form.phone,
        clientEmail: form.email || null,
        date: dateStr,
        time: selectedSlot,
      }),
    })
    if (res.ok) {
      const appt = await res.json()
      router.push(`/${slug}/confirm?id=${appt.id}`)
    }
    setSubmitting(false)
  }

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const calDays = getCalendarDays(calYear, calMonth)

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>
      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ flex: 1, height: 3, borderRadius: 99, background: s <= step ? 'var(--c-gold)' : 'var(--c-line)', transition: 'background .2s' }} />
        ))}
      </div>

      {/* Step 1 — Services */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: '0 0 20px', letterSpacing: '-0.01em' }}>Elegí tu servicio</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {services.map(svc => {
              const sel = selectedService?.id === svc.id
              return (
                <button key={svc.id} onClick={() => setSelectedService(svc)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', border: `1px solid ${sel ? 'var(--c-gold)' : 'var(--c-line)'}`, boxShadow: sel ? '0 0 0 1px var(--c-gold) inset' : 'none', borderRadius: 'var(--r-2)', background: sel ? '#FFFBF0' : 'var(--c-surface)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--f-body)', transition: 'all .15s' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 500 }}>{svc.name}</div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--c-muted)', marginTop: 3 }}>{svc.durationMins} min</div>
                  </div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 500 }}>${svc.price.toLocaleString('es-AR')}</div>
                </button>
              )
            })}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }} disabled={!selectedService} onClick={() => setStep(2)}>
            Siguiente →
          </button>
        </div>
      )}

      {/* Step 2 — Date */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: '0 0 20px', letterSpacing: '-0.01em' }}>Elegí la fecha</h2>
          {/* Calendar nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) } else setCalMonth(m => m - 1) }}>←</button>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 500 }}>{MONTHS_ES[calMonth]} {calYear}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) } else setCalMonth(m => m + 1) }}>→</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
            {DAYS_ES.map(d => <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--c-muted)', padding: '4px 0', letterSpacing: '0.06em' }}>{d}</div>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {calDays.map((date, i) => {
              if (!date) return <div key={i} />
              const isPast = date < today
              const isToday = date.getTime() === today.getTime()
              const isSel = selectedDate?.toDateString() === date.toDateString()
              return (
                <button key={i} disabled={isPast} onClick={() => setSelectedDate(date)}
                  style={{ padding: '8px 0', borderRadius: 'var(--r-2)', border: '1px solid transparent', fontFamily: 'var(--f-mono)', fontSize: 13, cursor: isPast ? 'default' : 'pointer', background: isSel ? 'var(--c-gold)' : isToday ? 'var(--c-gold-soft)' : 'transparent', color: isPast ? 'var(--c-muted-30)' : isSel ? 'var(--c-ink)' : 'var(--c-ink)', fontWeight: isSel || isToday ? 600 : 400, transition: 'all .15s' }}>
                  {date.getDate()}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button className="btn btn-ghost" onClick={() => setStep(1)}>← Atrás</button>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={!selectedDate} onClick={() => setStep(3)}>Siguiente →</button>
          </div>
        </div>
      )}

      {/* Step 3 — Time */}
      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.01em' }}>Elegí el horario</h2>
          {selectedDate && <p style={{ color: 'var(--c-muted)', fontSize: 14, margin: '0 0 20px' }}>{selectedDate.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>}
          {slotsLoading ? (
            <p style={{ color: 'var(--c-muted)', fontSize: 14 }}>Cargando horarios…</p>
          ) : slots.length === 0 ? (
            <p style={{ color: 'var(--c-muted)', fontSize: 14 }}>No hay horarios disponibles para este día.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {slots.map(slot => {
                const sel = selectedSlot === slot
                return (
                  <button key={slot} onClick={() => setSelectedSlot(slot)}
                    style={{ padding: '10px 0', fontFamily: 'var(--f-mono)', fontSize: 13, border: `1px solid ${sel ? 'var(--c-ink)' : 'var(--c-line)'}`, borderRadius: 'var(--r-2)', background: sel ? 'var(--c-ink)' : 'var(--c-surface)', color: sel ? '#fff' : 'var(--c-ink)', cursor: 'pointer', transition: 'all .15s' }}>
                    {slot}
                  </button>
                )
              })}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button className="btn btn-ghost" onClick={() => setStep(2)}>← Atrás</button>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={!selectedSlot} onClick={() => setStep(4)}>Siguiente →</button>
          </div>
        </div>
      )}

      {/* Step 4 — Client form */}
      {step === 4 && (
        <div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.01em' }}>Tus datos</h2>
          <p style={{ color: 'var(--c-muted)', fontSize: 14, margin: '0 0 24px' }}>
            {selectedService?.name} · {selectedDate?.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })} a las {selectedSlot}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="label">Nombre *</label>
              <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="label">Teléfono *</label>
              <input className="input" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required placeholder="+54 9 11 1234-5678" />
            </div>
            <div>
              <label className="label">Email <span style={{ color: 'var(--c-muted-30)' }}>(opcional)</span></label>
              <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="tu@email.com" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button className="btn btn-ghost" onClick={() => setStep(3)}>← Atrás</button>
            <button className="btn btn-gold" style={{ flex: 1, justifyContent: 'center' }} disabled={!form.name || !form.phone || submitting} onClick={submitBooking}>
              {submitting ? 'Reservando…' : `Reservar ${selectedSlot}`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
