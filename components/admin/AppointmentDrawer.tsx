'use client'
import { useState } from 'react'
import { calcEndTime } from './useAvailableSlots'
import { ServiceSlotPicker } from './ServiceSlotPicker'

type Service = { id: string; name: string; durationMins: number; price: number }
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

function fmtTime(s: string) {
  return new Date(s).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span className="label">{label}</span>
      <span className={mono ? 'row-value row-value--mono' : 'row-value'}>{value}</span>
    </div>
  )
}

export function AppointmentDrawer({
  open,
  appointment,
  services,
  slug,
  onClose,
  onUpdated,
}: {
  open: boolean
  appointment: Appointment
  services: Service[]
  slug: string
  onClose: () => void
  onUpdated: () => void
}) {
  const apptDate = (() => {
    const d = new Date(appointment.startsAt)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })()
  const apptTime = (() => {
    const d = new Date(appointment.startsAt)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  })()
  const apptServiceId = services.find(s => s.name === appointment.service.name)?.id || ''

  const [editMode, setEditMode] = useState(false)
  const [editServiceId, setEditServiceId] = useState(apptServiceId)
  const [editDate, setEditDate] = useState(apptDate)
  const [editSlot, setEditSlot] = useState(apptTime)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const selService = services.find(s => s.id === editServiceId)
  const endTime = editSlot && selService ? calcEndTime(editSlot, selService.durationMins) : ''

  function enterEditMode() {
    setEditServiceId(apptServiceId)
    setEditDate(apptDate)
    setEditSlot(apptTime)
    setSubmitError('')
    setEditMode(true)
  }

  function cancelEdit() {
    setEditMode(false)
    setSubmitError('')
  }

  async function updateStatus(status: string) {
    await fetch(`/api/appointments/${appointment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    onUpdated()
  }

  async function saveChanges() {
    if (!editServiceId || !editDate || !editSlot) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(`/api/appointments/${appointment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: editServiceId,
          date: editDate,
          time: editSlot,
        }),
      })
      if (res.ok) {
        setEditMode(false)
        onUpdated()
      } else {
        const data = await res.json()
        setSubmitError(data.error || 'Error al guardar cambios.')
      }
    } catch {
      setSubmitError('Error al guardar cambios.')
    } finally {
      setSubmitting(false)
    }
  }

  const slotLabel = editDate && editSlot && selService
    ? (() => {
        const d = new Date(editDate + 'T12:00:00')
        const dow = d.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '')
        const day = d.getDate()
        return `${dow} ${day} · ${editSlot} — ${endTime}`
      })()
    : ''
  const canSave = !!(editServiceId && editDate && editSlot && !submitting)

  if (!open) return null

  return (
    <div className="drawer-shell">
      <div className="dim-soft" onClick={() => { onClose(); setEditMode(false) }} />
      <div className="drawer drawer--form">
        <div className="drawer-head">
          <div>
            <span className="eyebrow eyebrow-block">TURNO</span>
            <h2 className="drawer-title">{appointment.clientName}</h2>
          </div>
          <button onClick={() => { onClose(); setEditMode(false) }} className="btn btn-ghost btn-sm">✕</button>
        </div>

        {editMode ? (
          <>
            <div className="drawer-body">
              <div className="form-stack">
                <ServiceSlotPicker
                  services={services}
                  slug={slug}
                  serviceId={editServiceId}
                  date={editDate}
                  slot={editSlot}
                  onServiceChange={setEditServiceId}
                  onDateChange={setEditDate}
                  onSlotChange={setEditSlot}
                  excludeId={appointment.id}
                  enabled={editMode}
                />
              </div>
              {submitError && <div style={{ marginTop: 18 }}><p className="error-msg">{submitError}</p></div>}
            </div>
            <div className="drawer-foot">
              <div className="drawer-summary">
                {slotLabel
                  ? <span className="drawer-when">{slotLabel}</span>
                  : <span className="drawer-hint">Seleccioná servicio, fecha y horario</span>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost" onClick={cancelEdit}>Cancelar</button>
                <button className="btn btn-gold" disabled={!canSave} onClick={saveChanges}>
                  {submitting ? 'Guardando…' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="drawer-body">
              <div className="drawer-rows">
                <Row label="Servicio" value={appointment.service.name} />
                <Row label="Hora" value={`${fmtTime(appointment.startsAt)} — ${fmtTime(appointment.endsAt)}`} mono />
                <Row label="Precio" value={`$${appointment.service.price.toLocaleString('es-AR')}`} mono />
                <Row label="Teléfono" value={appointment.clientPhone} mono />
                {appointment.clientEmail && <Row label="Email" value={appointment.clientEmail} />}
                <div>
                  <span className="label">Estado</span>
                  <span className={`badge badge-${appointment.status}`}>{STATUS_LABELS[appointment.status]}</span>
                </div>
              </div>
            </div>
            <div className="drawer-foot" style={{ justifyContent: 'flex-end', gap: 8 }}>
              {appointment.status !== 'completed' && (
                <button className="btn btn-outline btn-sm" onClick={enterEditMode}>Editar turno</button>
              )}
              {appointment.status !== 'completed' && (
                <button className="btn btn-primary btn-sm" onClick={() => updateStatus('completed')}>Completar</button>
              )}
              {appointment.status !== 'cancelled' && (
                <button className="btn btn-outline btn-sm btn-cancel-appt" onClick={() => updateStatus('cancelled')}>Cancelar</button>
              )}
              {appointment.status !== 'confirmed' && (
                <button className="btn btn-ghost btn-sm" onClick={() => updateStatus('confirmed')}>Reconfirmar</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
