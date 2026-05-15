'use client'
import Link from 'next/link'
import { BrandMark, Wordmark } from '@/components/Brand'

export function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hola@corturno.com'
  const contactWA = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '#'

  return (
    <footer style={{ background: 'var(--c-ink)', color: 'rgba(255,255,255,0.6)', padding: '80px 0 36px', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 4, background: 'repeating-linear-gradient(135deg, #1A1A1A 0 8px, #fff 8px 12px, #C9A84C 12px 20px, #fff 20px 24px)', opacity: 0.5 }} />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 56, paddingBottom: 64, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div style={{ maxWidth: '36ch' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <BrandMark size={30} />
              <Wordmark size={22} light />
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.55 }}>
              Una agenda online simple para peluquerías y barberías que prefieren cortar pelo a contestar WhatsApp.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h5 style={{ fontFamily: 'var(--f-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: '0 0 18px', fontWeight: 500 }}>Producto</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['#how', 'Cómo funciona'], ['#features', 'Funciones'], ['#pricing', 'Precio'], ['#faq', 'Preguntas']].map(([href, label]) => (
                <li key={href}><a href={href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }} onMouseOver={e => (e.currentTarget.style.color = 'var(--c-gold)')} onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Cuenta */}
          <div>
            <h5 style={{ fontFamily: 'var(--f-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: '0 0 18px', fontWeight: 500 }}>Cuenta</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><Link href="/signup" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Crear cuenta</Link></li>
              <li><Link href="/login" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Iniciar sesión</Link></li>
              <li><Link href="/carlos" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Ver un local de ejemplo</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h5 style={{ fontFamily: 'var(--f-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: '0 0 18px', fontWeight: 500 }}>Contacto</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><a href={`mailto:${contactEmail}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{contactEmail}</a></li>
              <li><a href={contactWA} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--f-mono)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', flexWrap: 'wrap', gap: 16 }}>
          <span>© 2026 Corturno · un producto de gemm·apps</span>
          <span style={{ color: 'var(--c-gold)' }}>turnos.gemm-apps.com</span>
        </div>
      </div>
    </footer>
  )
}
