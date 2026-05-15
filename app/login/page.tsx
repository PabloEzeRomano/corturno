'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BrandMark, Wordmark } from '@/components/Brand'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Email o contraseña incorrectos.')
    } else {
      router.push('/admin/agenda')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--c-bg)' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <BrandMark size={28} />
          <Wordmark size={20} />
        </Link>

        <div className="panel">
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.01em' }}>Iniciá sesión</h1>
          <p style={{ color: 'var(--c-muted)', fontSize: 14, margin: '0 0 28px' }}>Accedé a tu agenda de Corturno.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="vos@ejemplo.com" autoFocus />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>

            {error && (
              <div style={{ background: 'var(--c-danger-bg)', color: 'var(--c-danger)', padding: '10px 14px', borderRadius: 'var(--r-2)', fontSize: 13.5 }}>{error}</div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--c-muted)' }}>
          ¿No tenés cuenta?{' '}<Link href="/signup" style={{ color: 'var(--c-ink)', fontWeight: 500, textDecoration: 'underline' }}>Registrate gratis</Link>
        </p>
      </div>
    </div>
  )
}
