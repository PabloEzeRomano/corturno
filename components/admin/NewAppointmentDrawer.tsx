'use client'
import { useState, useRef } from 'react'
import { useAvailableSlots, calcEndTime } from './useAvailableSlots'
import { ServiceSlotPicker } from './ServiceSlotPicker'

type Service = { id: string; name: string; durationMins: number; price: number }

const DAY_LABELS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

function SectionHead({ num, label }: { num: string; label: string }) {
  return (
    <div className="section-head">
      <span className="section-num">{num}</span>
      <span className="section-lbl">{label}</span>
    </div>
  )
}

export function NewAppointmentDrawer({
  open,
  onClose,
  onCreated,
  barberId,
  slug,
  services,
}: {
  open: boolean
  onClose: () => void
  onCreated: () => void
  barberId: string
  slug: string
  services: Service[]
}) {
  const [clientForm, setClientForm] = useState({ name: '', phone: '', email: '' })
  const [selServiceId, setSelServiceId] = useState('')
  const [selDate, setSelDate] = useState('')
  const [selSlot, setSelSlot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [isRecurring, setIsRecurring] = useState(false)
  const [recurFrequency, setRecurFrequency] = useState<'weekly' | 'biweekly'>('weekly')
  const [recurEndDate, setRecurEndDate] = useState('')

  const selService = services.find(s => s.id === selServiceId)
  const { slots } = useAvailableSlots(slug, selDate, selServiceId, open)
  const endTime = selSlot && selService ? calcEndTime(selSlot, selService.durationMins) : ''

  const prevOpen = useRef(open)
  if (open && !prevOpen.current) {
    setClientForm({ name: '', phone: '', email: '' })
    setSelServiceId('')
    setSelDate(new Date().toISOString().split('T')[0])
    setSelSlot('')
    setIsRecurring(false)
    setRecurFrequency('weekly')
    setRecurEndDate('')
    setSubmitError('')
  }
  prevOpen.current = open

  async function submitAppointment() {
    if (!clientForm.name || !clientForm.phone || !selServiceId || !selDate || !selSlot) return
    setSubmitting(true)
    setSubmitError('')

    try {
      if (isRecurring) {
        const parsedDate = new Date(selDate + 'T12:00:00')
        const dayOfWeek = parsedDate.getDay()
        const res = await fetch('/api/recurring-appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceId: selServiceId,
            clientName: clientForm.name,
            clientPhone: clientForm.phone,
            clientEmail: clientForm.email || null,
            frequency: recurFrequency,
            dayOfWeek,
            time: selSlot,
            startDate: selDate,
            endDate: recurEndDate || null,
          }),
        })
        if (res.ok) {
          onClose()
          onCreated()
        } else {
          setSubmitError('Error al crear el turno recurrente. Intentá de nuevo.')
        }
      } else {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            barberId,
            serviceId: selServiceId,
            clientName: clientForm.name,
            clientPhone: clientForm.phone,
            clientEmail: clientForm.email || null,
            date: selDate,
            time: selSlot,
          }),
        })
        if (res.ok) {
          onClose()
          onCreated()
        } else {
          setSubmitError('Error al crear el turno. Intentá de nuevo.')
        }
      }
    } catch {
      setSubmitError('Error al crear el turno. Intentá de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const canSubmit = !!(clientForm.name && clientForm.phone && selServiceId && selDate && selSlot && !submitting)

  const slotLabel = selDate && selSlot && selService
    ? (() => {
        const d = new Date(selDate + 'T12:00:00')
        const dow = d.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '')
        const day = d.getDate()
        const extra = isRecurring
          ? ` · recurrente ${recurFrequency === 'weekly' ? 'semanal' : 'cada 2 semanas'}`
          : ''
        return `${dow} ${day} · ${selSlot} — ${endTime}${extra}`
      })()
    : ''

  if (!open) return null

  const selDayOfWeek = selDate
    ? new Date(selDate + 'T12:00:00').getDay()
    : -1

  return (
    <div className="drawer-shell">
      <div className="dim-soft" onClick={onClose} />
      <div className="drawer drawer--form">
        <div className="drawer-head">
          <div>
            <span className="eyebrow">Agenda · Nuevo</span>
            <h3 className="drawer-title">Turno <em>manual</em></h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          <div className="form-stack">
            <div>
              <SectionHead num="01" label="Cliente" />
              <div className="field">
                <label className="field-label">Nombre</label>
                <input className="input" value={clientForm.name} onChange={e => setClientForm(f => ({ ...f, name: e.target.value }))} placeholder="Nombre completo" />
              </div>
              <div className="field-row" style={{ marginTop: 10 }}>
                <div className="field">
                  <label className="field-label">Teléfono</label>
                  <input className="input" type="tel" value={clientForm.phone} onChange={e => setClientForm(f => ({ ...f, phone: e.target.value }))} placeholder="+54 9 11 1234-5678" />
                </div>
                <div className="field">
                  <label className="field-label">Email · opcional</label>
                  <input className="input" type="email" value={clientForm.email} onChange={e => setClientForm(f => ({ ...f, email: e.target.value }))} placeholder="tu@email.com" />
                </div>
              </div>
            </div>

            <div className="divider" />

            <div>
              <SectionHead num="02" label="Servicio y horario" />
              <ServiceSlotPicker
                services={services}
                slug={slug}
                serviceId={selServiceId}
                date={selDate}
                slot={selSlot}
                onServiceChange={setSelServiceId}
                onDateChange={setSelDate}
                onSlotChange={setSelSlot}
                enabled={open}
              />
            </div>

            <div className="divider" />

            <div>
              <SectionHead num="03" label="Repetición" />
              <div className="field">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <label className="toggle">
                    <input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} />
                    <span className="toggle-track" />
                  </label>
                  <span style={{ fontSize: 14, color: 'var(--c-ink)' }}>Turno recurrente</span>
                </div>
              </div>

              {isRecurring && (
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="field">
                    <label className="field-label">Frecuencia</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className={`btn btn-sm ${recurFrequency === 'weekly' ? 'btn-gold' : 'btn-outline'}`}
                        onClick={() => setRecurFrequency('weekly')}
                        style={{ flex: 1 }}
                      >
                        Semanal
                      </button>
                      <button
                        className={`btn btn-sm ${recurFrequency === 'biweekly' ? 'btn-gold' : 'btn-outline'}`}
                        onClick={() => setRecurFrequency('biweekly')}
                        style={{ flex: 1 }}
                      >
                        Cada 2 semanas
                      </button>
                    </div>
                  </div>

                  {selDayOfWeek >= 0 && (
                    <div className="field">
                      <span className="field-hint">
                        Se repite los <strong>{DAY_LABELS[selDayOfWeek]}</strong> a las <strong>{selSlot || '—'}</strong>
                      </span>
                    </div>
                  )}

                  <div className="field">
                    <label className="field-label">Finaliza · opcional</label>
                    <input
                      type="date"
                      className="input"
                      value={recurEndDate}
                      onChange={e => setRecurEndDate(e.target.value)}
                      min={selDate || undefined}
                    />
                    <span className="field-hint">Dejá vacío para que no tenga fin</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {submitError && <div style={{ marginTop: 18 }}><p className="error-msg">{submitError}</p></div>}
        </div>

        <div className="drawer-foot">
          <div className="drawer-summary">
            {slotLabel
              ? <span className="drawer-when">{slotLabel}</span>
              : <span>Completá los datos del turno</span>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button className="btn btn-gold" disabled={!canSubmit} onClick={submitAppointment}>
              {submitting ? 'Guardando…' : isRecurring ? 'Crear serie' : 'Guardar turno'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
