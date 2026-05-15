import Link from 'next/link'

export function Hero() {
  return (
    <header style={{ background: 'var(--c-ink)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 85% 30%, rgba(201,168,76,0.10), transparent 70%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(201,168,76,0.06), transparent 70%)', pointerEvents: 'none' }} />
      {/* barber-pole stripe */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 6, background: 'repeating-linear-gradient(135deg, #1A1A1A 0 10px, #fff 10px 16px, #C9A84C 16px 26px, #fff 26px 32px)', opacity: 0.7 }} />

      <div className="container">
        <div style={{ position: 'relative', padding: '96px 0 120px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 80, alignItems: 'center' }} className="hero-inner-grid">
          {/* Copy */}
          <div>
            <div style={{ color: 'var(--c-gold)', marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 28, height: 1, background: 'var(--c-gold)', display: 'inline-block' }} />
              <span className="eyebrow" style={{ color: 'var(--c-gold)' }}>Software para peluquerías &amp; barberías</span>
            </div>
            <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 76, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 26px', textWrap: 'balance' } as React.CSSProperties}>
              Tu peluquería,<br/><em style={{ fontStyle: 'italic', color: 'var(--c-gold)', fontWeight: 400 }}>online en minutos.</em>
            </h1>
            <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5, maxWidth: '46ch', marginBottom: 36 }}>
              Una agenda simple, una página propia para que tus clientes reserven solos, y vos atendés tranquilo. Sin comisiones, sin contratos, sin apps que bajar.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn btn-gold btn-lg btn-arrow">
                Crear mi cuenta gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a href="#how" className="btn btn-outline-light btn-lg">Ver cómo funciona</a>
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
              {[
                { num: '14 días', lbl: 'PRUEBA GRATIS' },
                { num: '2 min', lbl: 'DE SETUP' },
                { num: '0%', lbl: 'COMISIÓN POR TURNO' },
              ].map(({ num, lbl }) => (
                <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500, color: 'var(--c-gold)', letterSpacing: '-0.01em' }}>{num}</span>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)' }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device mockup */}
          <div style={{ position: 'relative', height: 560, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', inset: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--r-3)' }}>
              <span style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>turnos.gemm-apps.com/carlos</span>
            </div>

            {/* Float top */}
            <div style={{ position: 'absolute', top: 30, left: -10, background: '#fff', color: 'var(--c-ink)', padding: '12px 14px', borderRadius: 'var(--r-2)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, zIndex: 3 }}>
              <span style={{ width: 28, height: 28, background: 'var(--c-bg-2)', borderRadius: 'var(--r-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <div>
                <strong style={{ display: 'block', fontWeight: 600, fontSize: 13 }}>Nuevo turno reservado</strong>
                <span style={{ fontSize: 11, color: 'var(--c-muted)', fontFamily: 'var(--f-mono)', letterSpacing: '0.02em' }}>15:15 · Mariana L.</span>
              </div>
            </div>

            {/* Phone */}
            <div style={{ width: 320, background: '#fff', color: 'var(--c-ink)', borderRadius: 28, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
              <div style={{ height: 28, background: 'var(--c-ink)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: 9, transform: 'translateX(-50%)', width: 80, height: 18, background: '#000', borderRadius: 999 }} />
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>Barbería <em style={{ fontStyle: 'italic', color: 'var(--c-gold-deep)' }}>Ruiz</em></span>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Palermo</span>
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', margin: '18px 0 10px' }}>Elegí tu servicio</div>
                {[
                  { nm: 'Corte', du: '30 min', pr: '$3.500', sel: false },
                  { nm: 'Corte + Barba', du: '45 min', pr: '$5.000', sel: true },
                ].map(({ nm, du, pr, sel }) => (
                  <div key={nm} style={{ border: `1px solid ${sel ? 'var(--c-gold)' : 'var(--c-line)'}`, boxShadow: sel ? '0 0 0 1px var(--c-gold) inset' : 'none', background: sel ? '#FFFBF0' : '#fff', borderRadius: 'var(--r-2)', padding: '12px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{nm}</div>
                      <div style={{ fontSize: 11, color: 'var(--c-muted)' }}>{du}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: 16 }}>{pr}</div>
                  </div>
                ))}
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', margin: '18px 0 10px' }}>Sábado 16 · Mayo</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {[
                    { t: '09:00', s: '' }, { t: '09:45', s: '' }, { t: '10:30', s: 'off' }, { t: '11:15', s: '' },
                    { t: '12:00', s: '' }, { t: '14:30', s: 'off' }, { t: '15:15', s: 'sel' }, { t: '16:00', s: '' },
                  ].map(({ t, s }) => (
                    <div key={t} style={{ fontFamily: 'var(--f-mono)', fontSize: 11, border: '1px solid var(--c-line)', padding: '7px 0', textAlign: 'center', borderRadius: 'var(--r-2)', background: s === 'sel' ? 'var(--c-ink)' : '#fff', color: s === 'sel' ? '#fff' : s === 'off' ? 'var(--c-muted-30)' : 'var(--c-ink)', textDecoration: s === 'off' ? 'line-through' : 'none', borderColor: s === 'sel' ? 'var(--c-ink)' : 'var(--c-line)' }}>{t}</div>
                  ))}
                </div>
                <div style={{ background: 'var(--c-ink)', color: '#fff', borderRadius: 'var(--r-2)', padding: 13, textAlign: 'center', fontWeight: 500, marginTop: 14, fontSize: 14 }}>Reservar 15:15</div>
              </div>
            </div>

            {/* Float bottom */}
            <div style={{ position: 'absolute', bottom: 60, right: -10, background: '#fff', color: 'var(--c-ink)', padding: '12px 14px', borderRadius: 'var(--r-2)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, zIndex: 3 }}>
              <span style={{ width: 28, height: 28, background: 'var(--c-gold)', borderRadius: 'var(--r-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ink)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18"/></svg>
              </span>
              <div>
                <strong style={{ display: 'block', fontWeight: 600, fontSize: 13 }}>3 turnos hoy</strong>
                <span style={{ fontSize: 11, color: 'var(--c-muted)', fontFamily: 'var(--f-mono)', letterSpacing: '0.02em' }}>2 confirmados · 1 listo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .hero-inner-grid { grid-template-columns: 1fr !important; gap: 64px !important; padding: 72px 0 96px !important; } h1 { font-size: 56px !important; } }
        @media (max-width: 600px) { h1 { font-size: 40px !important; } }
      `}</style>
    </header>
  )
}
