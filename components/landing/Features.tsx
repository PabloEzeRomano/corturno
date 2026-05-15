export function Features() {
  return (
    <section id="features" style={{ padding: '120px 0', background: 'var(--c-surface)', borderTop: '1px solid var(--c-line)', borderBottom: '1px solid var(--c-line)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 64 }}>
          <div>
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>FUNCIONES</span>
            <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 56, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
              Lo necesario,<br/><em style={{ fontStyle: 'italic', color: 'var(--c-gold-deep)', fontWeight: 400 }}>nada que sobre.</em>
            </h2>
          </div>
          <p style={{ color: 'var(--c-muted)', fontSize: 17, lineHeight: 1.55, maxWidth: '42ch', margin: 0 }}>
            Construido a partir de lo que te falta cuando tomás turnos por WhatsApp: una sola agenda viva, tu propia página, recordatorios que no se olvidan, y total control de tu calendario.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--c-line)', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
          {/* Agenda online */}
          <div style={{ background: '#fff', padding: '44px 40px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, background: 'var(--c-bg-2)', borderRadius: 'var(--r-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ink)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>
              </div>
              <span className="badge badge-stat">24/7</span>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.015em' }}>Agenda online</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: '42ch' }}>Tus clientes reservan desde el celular mientras vos cortás. Slots calculados según la duración del servicio y los turnos ya tomados.</p>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--c-line)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(3, 1fr)', gap: 1, background: 'var(--c-line)', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', overflow: 'hidden', marginTop: 8 }}>
                {['', 'VIE', 'SÁB', 'DOM'].map(d => <div key={d} style={{ background: 'var(--c-bg)', fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', padding: '8px 10px' }}>{d}</div>)}
                <div style={{ background: 'var(--c-bg)', fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-muted)', textAlign: 'right', padding: '8px 10px', paddingTop: 8 }}>09</div>
                <div style={{ background: '#FAF3DD', borderLeft: '3px solid var(--c-gold)', padding: '6px 8px', fontSize: 11, fontWeight: 500 }}>Tomás · Corte + Barba</div>
                <div style={{ background: 'var(--c-bg-2)', borderLeft: '3px solid var(--c-ink)', padding: '6px 8px', fontSize: 11, fontWeight: 500 }}>Mariana · Puntas</div>
                <div style={{ background: '#fff', padding: '8px 10px' }} />
                <div style={{ background: 'var(--c-bg)', fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-muted)', textAlign: 'right', padding: '8px 10px', paddingTop: 8 }}>10</div>
                <div style={{ background: '#fff', padding: '8px 10px' }} />
                <div style={{ background: '#EAF1E3', borderLeft: '3px solid #4F7A3A', padding: '6px 8px', fontSize: 11, fontWeight: 500, color: '#2f4d24' }}>F. Méndez · ✓</div>
                <div style={{ background: 'var(--c-bg-2)', borderLeft: '3px solid var(--c-ink)', padding: '6px 8px', fontSize: 11, fontWeight: 500 }}>Julián · Corte</div>
              </div>
            </div>
          </div>

          {/* Gestión de turnos — gold */}
          <div style={{ background: '#fff', padding: '44px 40px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, background: 'var(--c-gold)', borderRadius: 'var(--r-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ink)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>
              </div>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.015em' }}>Gestión de turnos</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: '42ch' }}>Vista semanal y diaria, drawer de cliente con un click. Completá, cancelá o creá turnos manuales. Filtro por estado y rango de fechas.</p>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--c-line)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--f-mono)', fontSize: 11.5, fontWeight: 500, padding: '4px 10px', borderRadius: 'var(--r-pill)', background: '#FAF3DD', color: 'var(--c-ink)' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-ink)' }} />Confirmado</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--f-mono)', fontSize: 11.5, fontWeight: 500, padding: '4px 10px', borderRadius: 'var(--r-pill)', background: '#EAF1E3', color: '#4F7A3A' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F7A3A' }} />Completado</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--f-mono)', fontSize: 11.5, fontWeight: 500, padding: '4px 10px', borderRadius: 'var(--r-pill)', background: '#FBEAE7', color: 'var(--c-danger)' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-danger)' }} />Cancelado</span>
              <span className="badge badge-stat">+ Nuevo turno manual</span>
            </div>
          </div>

          {/* Recordatorios */}
          <div style={{ background: '#fff', padding: '44px 40px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, background: 'var(--c-bg-2)', borderRadius: 'var(--r-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ink)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></svg>
              </div>
              <span className="badge badge-soon">PRÓXIMAMENTE</span>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.015em' }}>Recordatorios automáticos</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: '42ch' }}>Email al cliente 3 horas antes del turno. Botones para cancelar o reprogramar sin pasar por vos. Menos ausencias, menos llamadas.</p>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--c-line)' }}>
              <div style={{ background: 'var(--c-ink)', color: '#fff', padding: 20, borderRadius: 'var(--r-2)' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>DE · CORTURNO &lt;recordatorios@corturno.com&gt;</div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, margin: '6px 0 4px' }}>Te recordamos tu turno hoy</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>Mariana, hoy a las <em style={{ color: 'var(--c-gold)', fontStyle: 'italic' }}>15:15</em> tenés Corte + Barba en Barbería Ruiz.</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <a href="#" style={{ fontSize: 11, color: 'var(--c-gold)', borderBottom: '1px solid var(--c-gold)', paddingBottom: 2 }}>Reprogramar</a>
                  <a href="#" style={{ fontSize: 11, color: 'var(--c-gold)', borderBottom: '1px solid var(--c-gold)', paddingBottom: 2 }}>Cancelar</a>
                </div>
              </div>
            </div>
          </div>

          {/* Tu página propia */}
          <div style={{ background: '#fff', padding: '44px 40px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, background: 'var(--c-bg-2)', borderRadius: 'var(--r-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ink)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M2 12h20"/><path d="M12 2a14 14 0 0 1 0 20"/><path d="M12 2a14 14 0 0 0 0 20"/></svg>
              </div>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.015em' }}>Tu página propia</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: '42ch' }}>Una URL única, simple, fácil de dictar. Sin logos de terceros, sin distracciones. Sólo el nombre de tu local y los servicios que ofrecés.</p>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--c-line)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
              <div style={{ background: 'var(--c-bg)', borderRadius: 'var(--r-2)', padding: '18px 20px', border: '1px solid var(--c-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 11.5, color: 'var(--c-muted)', marginBottom: 12 }}>
                  <span style={{ width: 8, height: 8, background: 'var(--c-gold)', borderRadius: '50%' }} />conexión segura · publicada
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13.5, color: 'var(--c-ink)' }}>turnos.gemm-apps.com/<em style={{ color: 'var(--c-gold-deep)', fontStyle: 'normal', fontWeight: 500 }}>carlos</em></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 11.5, color: 'var(--c-muted)' }}>
                  <span>Tu slug</span><span style={{ fontFamily: 'var(--f-mono)' }}>no se cambia</span>
                </div>
              </div>
              {/* QR mock */}
              <div style={{ width: 90, height: 90, borderRadius: 'var(--r-2)', backgroundImage: 'linear-gradient(45deg, var(--c-ink) 25%, transparent 25%), linear-gradient(-45deg, var(--c-ink) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--c-ink) 75%), linear-gradient(-45deg, transparent 75%, var(--c-ink) 75%)', backgroundSize: '12px 12px', backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px', backgroundColor: '#fff', border: '1px solid var(--c-line)', position: 'relative' as const, flexShrink: 0 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
