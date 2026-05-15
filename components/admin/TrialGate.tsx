'use client'
import Link from 'next/link'
import { BrandMark, Wordmark } from '@/components/Brand'

export function TrialGate() {
  const contactWA = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '#'
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hola@corturno.com'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <BrandMark size={36} />
            <Wordmark size={24} light />
          </Link>
        </div>

        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--c-gold)' }}>PERÍODO DE PRUEBA FINALIZADO</span>

        <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 500, color: '#fff', margin: '20px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Tu período de prueba<br/><em style={{ fontStyle: 'italic', color: 'var(--c-gold)' }}>venció.</em>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.6, margin: '0 0 36px' }}>
          Tu link público sigue activo y tus clientes pueden seguir reservando. Para acceder a la agenda y gestionar tus turnos, contactanos para activar tu cuenta.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={contactWA} className="btn btn-gold btn-lg">Activar por WhatsApp</a>
          <a href={`mailto:${contactEmail}`} className="btn btn-outline-light btn-lg">Escribir por email</a>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 32, fontFamily: 'var(--f-mono)' }}>
          Tu agenda y datos están seguros. No se eliminó nada.
        </p>
      </div>
    </div>
  )
}
