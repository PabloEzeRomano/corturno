import Link from 'next/link'

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--c-gold)', marginTop: 2 }}>
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

export function Pricing() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hola@corturno.com'
  const contactWA = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '#'

  return (
    <section id="pricing" style={{ padding: '120px 0', background: 'var(--c-bg)' }}>
      <div className="container">
        <div style={{ background: 'var(--c-ink)', color: '#fff', borderRadius: 'var(--r-2)', padding: '64px 56px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -200, top: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%)' }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <span className="eyebrow" style={{ color: 'var(--c-gold)' }}>PRECIO</span>
            <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 56, fontWeight: 500, margin: '16px 0', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              14 días gratis,<br/><em style={{ fontStyle: 'italic', color: 'var(--c-gold)', fontWeight: 400 }}>y después lo acordamos juntos.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.55, maxWidth: '44ch', margin: '0 0 32px' }}>
              Sin tarjeta para empezar, sin contratos largos. Probás dos semanas, y si te sirve, hablamos un precio que tenga sentido para tu local. No te cobramos por turno, ni por cliente, ni por cancelación.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn btn-gold btn-lg btn-arrow">
                Crear mi cuenta gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a href={`mailto:${contactEmail}`} className="btn btn-outline-light btn-lg">Escribinos</a>
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16, position: 'relative', zIndex: 2 }}>
            {[
              { strong: 'Setup en menos de 2 minutos.', rest: ' Te creamos los servicios y horarios típicos al toque.' },
              { strong: '0% de comisión.', rest: ' Lo que cobrás es lo que cobrás. Nosotros no tocamos un peso.' },
              { strong: 'Tu link sigue vivo siempre.', rest: ' Incluso si dejás de pagar — para no perder reservas — vos simplemente no ves la agenda hasta reactivar.' },
              { strong: 'Soporte por WhatsApp.', rest: ' Te respondemos rápido, en castellano, sin formularios.' },
            ].map(({ strong, rest }) => (
              <li key={strong} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                <CheckIcon />
                <span><strong style={{ color: '#fff', fontWeight: 500 }}>{strong}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #pricing .price-inner { grid-template-columns: 1fr !important; padding: 48px 36px !important; } #pricing h2 { font-size: 40px !important; } }
      `}</style>
    </section>
  )
}
