'use client'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', phone: '', shopName: '' })
  const [slug, setSlug] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(data => {
      setForm({ name: data.name || '', phone: data.phone || '', shopName: data.shopName || '' })
      setSlug(data.slug || '')
    }).catch(() => {})
  }, [])

  async function save() {
    setSaving(true)
    setError('')
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      const d = await res.json()
      setError(d.error || 'Error al guardar.')
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 560 }}>
      <span className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>ADMINISTRACIÓN</span>
      <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 32px' }}>Mi perfil</h1>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="label">Nombre</label>
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="label">Nombre del local</label>
            <input className="input" value={form.shopName} onChange={e => setForm(f => ({ ...f, shopName: e.target.value }))} />
          </div>
          <div>
            <label className="label">Teléfono</label>
            <input className="input" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+54 9 11 1234-5678" />
          </div>

          <div>
            <label className="label">Tu link público</label>
            <div style={{ background: 'var(--c-bg)', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', padding: '12px 14px', fontFamily: 'var(--f-mono)', fontSize: 13.5, color: 'var(--c-ink)' }}>
              turnos.gemm-apps.com/<em style={{ color: 'var(--c-gold-deep)', fontStyle: 'normal', fontWeight: 500 }}>{slug}</em>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--c-muted)', marginTop: 8 }}>El link público no se puede cambiar para no romper reservas existentes.</p>
          </div>

          {error && (
            <div style={{ background: 'var(--c-danger-bg)', color: 'var(--c-danger)', padding: '10px 14px', borderRadius: 'var(--r-2)', fontSize: 13.5 }}>{error}</div>
          )}

          <button className="btn btn-primary" onClick={save} disabled={saving} style={{ alignSelf: 'flex-start' }}>
            {saved ? '¡Guardado!' : saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
