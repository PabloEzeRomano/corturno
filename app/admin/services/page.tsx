'use client'
import { useState, useEffect } from 'react'

type Service = { id: string; name: string; durationMins: number; price: number; isActive: boolean }

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [newSvc, setNewSvc] = useState({ name: '', durationMins: 30, price: 0 })
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ name: '', durationMins: 30, price: 0 })
  const [loading, setLoading] = useState(false)

  async function load() {
    const res = await fetch('/api/services')
    if (res.ok) setServices(await res.json())
  }
  useEffect(() => { load() }, [])

  async function addService() {
    if (!newSvc.name) return
    setLoading(true)
    await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSvc) })
    setNewSvc({ name: '', durationMins: 30, price: 0 })
    setShowAdd(false)
    setLoading(false)
    load()
  }

  async function saveEdit(id: string) {
    await fetch(`/api/services/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editData) })
    setEditId(null)
    load()
  }

  async function toggleActive(svc: Service) {
    await fetch(`/api/services/${svc.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !svc.isActive }) })
    load()
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <span className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>ADMINISTRACIÓN</span>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>Servicios</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>+ Agregar servicio</button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="panel" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 500, margin: '0 0 20px' }}>Nuevo servicio</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px', gap: 16, marginBottom: 16 }}>
            <div>
              <label className="label">Nombre</label>
              <input className="input" value={newSvc.name} onChange={e => setNewSvc(s => ({ ...s, name: e.target.value }))} placeholder="Corte" />
            </div>
            <div>
              <label className="label">Duración (min)</label>
              <input className="input" type="number" value={newSvc.durationMins} onChange={e => setNewSvc(s => ({ ...s, durationMins: Number(e.target.value) }))} min={5} step={5} />
            </div>
            <div>
              <label className="label">Precio ($)</label>
              <input className="input" type="number" value={newSvc.price} onChange={e => setNewSvc(s => ({ ...s, price: Number(e.target.value) }))} min={0} step={100} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-gold" onClick={addService} disabled={loading}>Guardar</button>
            <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-line)' }}>
              {['Nombre', 'Duración', 'Precio', 'Estado', ''].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontFamily: 'var(--f-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-muted)', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map(svc => (
              <tr key={svc.id} style={{ borderBottom: '1px solid var(--c-line)' }}>
                {editId === svc.id ? (
                  <>
                    <td style={{ padding: '10px 20px' }}>
                      <input className="input" value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} style={{ width: '100%' }} />
                    </td>
                    <td style={{ padding: '10px 20px' }}>
                      <input className="input" type="number" value={editData.durationMins} onChange={e => setEditData(d => ({ ...d, durationMins: Number(e.target.value) }))} style={{ width: 80 }} />
                    </td>
                    <td style={{ padding: '10px 20px' }}>
                      <input className="input" type="number" value={editData.price} onChange={e => setEditData(d => ({ ...d, price: Number(e.target.value) }))} style={{ width: 100 }} />
                    </td>
                    <td style={{ padding: '10px 20px' }} />
                    <td style={{ padding: '10px 20px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-gold btn-sm" onClick={() => saveEdit(svc.id)}>Guardar</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditId(null)}>Cancelar</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '14px 20px', fontWeight: 500, opacity: svc.isActive ? 1 : 0.45 }}>{svc.name}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--c-muted)' }}>{svc.durationMins} min</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--f-mono)', fontSize: 13 }}>${svc.price.toLocaleString('es-AR')}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <label className="toggle">
                        <input type="checkbox" checked={svc.isActive} onChange={() => toggleActive(svc)} />
                        <span className="toggle-track" />
                      </label>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setEditId(svc.id); setEditData({ name: svc.name, durationMins: svc.durationMins, price: svc.price }) }}>Editar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
