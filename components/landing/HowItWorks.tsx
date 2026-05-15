export function HowItWorks() {
  return (
    <section id="how" style={{ padding: '120px 0', background: 'var(--c-bg)', borderTop: '1px solid var(--c-line)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 64 }}>
          <div>
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>CÓMO FUNCIONA</span>
            <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 56, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0, maxWidth: '18ch', textWrap: 'balance' } as React.CSSProperties}>
              Tres pasos, <em style={{ fontStyle: 'italic', color: 'var(--c-gold-deep)', fontWeight: 400 }}>y empezás a recibir reservas.</em>
            </h2>
          </div>
          <p style={{ color: 'var(--c-muted)', fontSize: 17, lineHeight: 1.55, maxWidth: '42ch', margin: 0 }}>
            Configurar Corturno toma menos que cortar el primer cliente del día. Tu link queda listo y lo compartís donde quieras: Instagram, WhatsApp, o impreso en el local.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {/* Step 1 */}
          <div style={{ background: '#fff', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', padding: '36px 32px 32px' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 48, fontWeight: 500, color: 'var(--c-gold)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              01<sup style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.1em', marginLeft: 6, fontWeight: 500, verticalAlign: 'top', lineHeight: 1 }}>· REGISTRO</sup>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: '24px 0 10px', letterSpacing: '-0.01em' }}>Creá tu cuenta</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>Email, contraseña, nombre del local. Listo. Ni tarjeta de crédito ni planilla larga.</p>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px dashed var(--c-line)' }}>
              {[['Barbería Ruiz', 'SHOP'], ['carlos@corturno.com', '@'], ['•••••••••', 'PWD']].map(([val, tag]) => (
                <div key={tag} style={{ border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', padding: '8px 12px', fontSize: 13, color: 'var(--c-ink)', background: '#fff', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{val}</span>
                  <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--c-muted)', fontSize: 11 }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ background: '#fff', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', padding: '36px 32px 32px' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 48, fontWeight: 500, color: 'var(--c-gold)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              02<sup style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.1em', marginLeft: 6, fontWeight: 500, verticalAlign: 'top', lineHeight: 1 }}>· SETUP</sup>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: '24px 0 10px', letterSpacing: '-0.01em' }}>Configurá tus servicios</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>Cargás precios, duración y horarios. Bloqueás los días que estás de vacaciones. Cambios en vivo, cuando quieras.</p>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px dashed var(--c-line)' }}>
              {['Corte · 30 · $3.500', 'Corte + Barba · 45 · $5.000', 'Puntas · 30 · $2.500', 'Color · 45 · $7.500'].map(t => (
                <span key={t} style={{ display: 'inline-block', fontFamily: 'var(--f-mono)', fontSize: 10.5, background: 'var(--c-bg-2)', color: 'var(--c-ink)', padding: '4px 8px', borderRadius: 'var(--r-2)', margin: '0 4px 4px 0' }}>{t}</span>
              ))}
              <span style={{ display: 'inline-block', fontFamily: 'var(--f-mono)', fontSize: 10.5, background: 'var(--c-gold)', color: 'var(--c-ink)', padding: '4px 8px', borderRadius: 'var(--r-2)', margin: '0 4px 4px 0' }}>+ agregar</span>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ background: '#fff', border: '1px solid var(--c-line)', borderRadius: 'var(--r-2)', padding: '36px 32px 32px' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 48, fontWeight: 500, color: 'var(--c-gold)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              03<sup style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.1em', marginLeft: 6, fontWeight: 500, verticalAlign: 'top', lineHeight: 1 }}>· COMPARTÍ</sup>
            </div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, margin: '24px 0 10px', letterSpacing: '-0.01em' }}>Mandá tu link</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>Tus clientes reservan solos. Vos ves todo desde la agenda. Sin idas y vueltas por WhatsApp.</p>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px dashed var(--c-line)' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, background: 'var(--c-ink)', color: 'var(--c-gold)', padding: '10px 12px', borderRadius: 'var(--r-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>turnos.gemm-apps.com/<span style={{ fontStyle: 'normal' }}>carlos</span></span>
                <span style={{ background: 'var(--c-gold)', color: 'var(--c-ink)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px', borderRadius: 2, fontFamily: 'var(--f-body)', fontWeight: 500 }}>Copiar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #how .sec-grid { grid-template-columns: 1fr !important; }
          #how .steps-grid { grid-template-columns: 1fr !important; }
          #how h2 { font-size: 44px !important; }
        }
      `}</style>
    </section>
  )
}
