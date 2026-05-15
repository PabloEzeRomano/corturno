const faqs = [
  { q: '¿Mis clientes tienen que bajarse una app?', a: 'No. Abren tu link y reservan en 30 segundos desde el navegador. Funciona en cualquier celular.' },
  { q: '¿Y si me equivoco con el nombre del local?', a: 'El nombre lo cambiás cuando quieras desde tu perfil. El link público (/tu-slug) queda fijo para no romper las reservas existentes.' },
  { q: '¿Puedo bloquear días de vacaciones?', a: 'Sí. Desde Disponibilidad cargás fechas bloqueadas con un motivo opcional. Esos días no aparecen disponibles para reservar.' },
  { q: '¿Qué pasa si un cliente no aparece?', a: 'Lo marcás como cancelado desde el turno y queda registrado. Cuando habilitemos recordatorios automáticos las ausencias bajan fuerte.' },
  { q: '¿Cómo se cobra después de los 14 días?', a: 'Te escribimos antes de que termine el período de prueba. Acordamos un precio mensual fijo, sin sorpresas, según el tamaño del local.' },
  { q: '¿Y si dejo de pagar?', a: 'Tu agenda se bloquea para vos, pero tu link público sigue activo para no perder reservas. Cuando reactivás, todo vuelve a estar donde lo dejaste.' },
]

export function FAQ() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hola@corturno.com'

  return (
    <section id="faq" style={{ padding: '120px 0', background: 'var(--c-surface)', borderTop: '1px solid var(--c-line)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 64 }}>
          <div>
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>PREGUNTAS FRECUENTES</span>
            <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 56, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
              Lo que <em style={{ fontStyle: 'italic', color: 'var(--c-gold-deep)', fontWeight: 400 }}>siempre nos preguntan.</em>
            </h2>
          </div>
          <p style={{ color: 'var(--c-muted)', fontSize: 17, lineHeight: 1.55, maxWidth: '42ch', margin: 0 }}>
            Si no encontrás lo que buscás, escribinos a <a href={`mailto:${contactEmail}`} style={{ color: 'var(--c-ink)', textDecoration: 'underline' }}>{contactEmail}</a> y te contestamos el mismo día.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 64, rowGap: 0, borderTop: '1px solid var(--c-line)' }}>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ padding: '28px 0', borderBottom: '1px solid var(--c-line)' }}>
              <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{q}</h4>
              <p style={{ color: 'var(--c-muted)', fontSize: 14.5, lineHeight: 1.55, margin: 0, maxWidth: '48ch' }}>{a}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #faq .faq-inner { grid-template-columns: 1fr !important; }
          #faq .faq-grid { grid-template-columns: 1fr !important; }
          #faq h2 { font-size: 44px !important; }
        }
      `}</style>
    </section>
  )
}
