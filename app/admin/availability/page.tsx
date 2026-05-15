'use client'
import { useState, useEffect } from 'react'

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

type ScheduleItem = { dayOfWeek: number; startTime: string; endTime: string; isActive: boolean }
type BlockedDate = { id: string; date: string; reason: string | null }

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(
    [1, 2, 3, 4, 5, 6, 0].map(d => ({ dayOfWeek: d, startTime: '09:00', endTime: '19:00', isActive: d !== 0 }))
  )
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [newDate, setNewDate] = useState('')
  const [newReason, setNewReason] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/availability').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setSchedule([1, 2, 3, 4, 5, 6, 0].map(d => {
          const found = data.find((a: ScheduleItem) => a.dayOfWeek === d)
          return found || { dayOfWeek: d, startTime: '09:00', endTime: '19:00', isActive: false }
        }))
      }
    })
    loadBlocked()
  }, [])

  async function loadBlocked() {
    const res = await fetch('/api/blocked-dates')
    if (res.ok) setBlockedDates(await res.json())
  }

  function updateDay(dayOfWeek: number, field: string, value: unknown) {
    setSchedule(s => s.map(d => d.dayOfWeek === dayOfWeek ? { ...d, [field]: value } : d))
  }

  async function saveSchedule() {
    setSaving(true)
    await fetch('/api/availability', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ schedule }) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function addBlockedDate() {
    if (!newDate) return
    await fetch('/api/blocked-dates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date: newDate, reason: newReason || null }) })
    setNewDate('')
    setNewReason('')
    loadBlocked()
  }

  async function removeBlocked(id: string) {
    await fetch(`/api/blocked-dates/${id}`, { method: 'DELETE' })
    loadBlocked()
  }

  return (
    <div style={{ padding: 32, maxWidth: 720 }}>
      <span className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>ADMINISTRACIÓN</span>
      <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 32px' }}>Disponibilidad</h1>

      {/* Weekly schedule */}
      <div className="panel" style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 500, margin: '0 0 24px', letterSpacing: '-0.01em' }}>Horario semanal</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {schedule.map(({ dayOfWeek, startTime, endTime, isActive }) => (
            <div key={dayOfWeek} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <label className="toggle" style={{ flexShrink: 0 }}>
                <input type="checkbox" checked={isActive} onChange={e => updateDay(dayOfWeek, 'isActive', e.target.checked)} />
                <span className="toggle-track" />
              </label>
              <span style={{ width: 96, fontSize: 14, fontWeight: isActive ? 500 : 400, color: isActive ? 'var(--c-ink)' : 'var(--c-muted)' }}>{DAYS[dayOfWeek]}</span>
              {isActive && (
                <>
                  <input type="time" value={startTime} onChange={e => updateDay(dayOfWeek, 'startTime', e.target.value)} className="input" style={{ width: 110 }} />
                  <span style={{ color: 'var(--c-muted)', fontSize: 13 }}>hasta</span>
                  <input type="time" value={endTime} onChange={e => updateDay(dayOfWeek, 'endTime', e.target.value)} className="input" style={{ width: 110 }} />
                </>
              )}
              {!isActive && <span style={{ fontSize: 13, color: 'var(--c-muted-30)' }}>Cerrado</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="btn btn-primary" onClick={saveSchedule} disabled={saving}>
            {saved ? '¡Guardado!' : saving ? 'Guardando…' : 'Guardar horario'}
          </button>
        </div>
      </div>

      {/* Blocked dates */}
      <div className="panel">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 500, margin: '0 0 24px', letterSpacing: '-0.01em' }}>Fechas bloqueadas</h2>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label className="label">Fecha</label>
            <input type="date" className="input" value={newDate} onChange={e => setNewDate(e.target.value)} />
          </div>
          <div style={{ flex: 2, minWidth: 200 }}>
            <label className="label">Motivo (opcional)</label>
            <input className="input" value={newReason} onChange={e => setNewReason(e.target.value)} placeholder="Vacaciones, feriado…" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-outline" onClick={addBlockedDate}>Bloquear fecha</button>
          </div>
        </div>

        {blockedDates.length === 0 ? (
          <p style={{ color: 'var(--c-muted)', fontSize: 14 }}>No hay fechas bloqueadas.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {blockedDates.map(bd => (
              <div key={bd.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--c-bg)', borderRadius: 'var(--r-2)', border: '1px solid var(--c-line)' }}>
                <div>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13 }}>{new Date(bd.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  {bd.reason && <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--c-muted)' }}>{bd.reason}</span>}
                </div>
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--c-danger)' }} onClick={() => removeBlocked(bd.id)}>Quitar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
