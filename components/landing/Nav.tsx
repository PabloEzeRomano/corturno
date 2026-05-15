'use client'
import Link from 'next/link'
import { BrandMark, Wordmark } from '@/components/Brand'

export function Nav() {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(249,246,241,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--c-line)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <BrandMark size={30} />
          <Wordmark size={22} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links-desktop">
          <a href="#how" style={{ fontSize: 14.5, color: 'var(--c-ink-60)', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--c-ink)')} onMouseOut={e => (e.currentTarget.style.color = 'var(--c-ink-60)')}>Cómo funciona</a>
          <a href="#features" style={{ fontSize: 14.5, color: 'var(--c-ink-60)', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--c-ink)')} onMouseOut={e => (e.currentTarget.style.color = 'var(--c-ink-60)')}>Funciones</a>
          <a href="#pricing" style={{ fontSize: 14.5, color: 'var(--c-ink-60)', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--c-ink)')} onMouseOut={e => (e.currentTarget.style.color = 'var(--c-ink-60)')}>Precio</a>
          <a href="#faq" style={{ fontSize: 14.5, color: 'var(--c-ink-60)', transition: 'color .15s' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--c-ink)')} onMouseOut={e => (e.currentTarget.style.color = 'var(--c-ink-60)')}>Preguntas</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" className="btn btn-ghost">Iniciar sesión</Link>
          <Link href="/signup" className="btn btn-primary">Crear cuenta</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .nav-links-desktop { display: none !important; } }
      `}</style>
    </nav>
  )
}
