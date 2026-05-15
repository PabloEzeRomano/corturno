'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { BrandMark, Wordmark } from '@/components/Brand'

const navItems = [
  { href: '/admin/agenda', label: 'Agenda', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>
  ) },
  { href: '/admin/services', label: 'Servicios', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
  ) },
  { href: '/admin/availability', label: 'Disponibilidad', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ) },
  { href: '/admin/profile', label: 'Perfil', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ) },
]

export function Sidebar({ barberName }: { barberName: string }) {
  const pathname = usePathname()

  return (
    <aside style={{ width: 240, background: 'var(--c-surface)', borderRight: '1px solid var(--c-line)', display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh', position: 'sticky', top: 0, height: '100vh' }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--c-line)' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <BrandMark size={28} />
          <Wordmark size={18} />
        </Link>
      </div>

      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--r-2)', fontSize: 14, fontWeight: active ? 500 : 400, color: active ? 'var(--c-ink)' : 'var(--c-muted)', background: active ? 'var(--c-bg-2)' : 'transparent', transition: 'all .15s', textDecoration: 'none' }}
              onMouseOver={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--c-bg)' }}
              onMouseOut={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {icon}
              {label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--c-line)' }}>
        <div style={{ fontSize: 13, color: 'var(--c-ink)', fontWeight: 500, marginBottom: 2 }}>{barberName}</div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          style={{ fontSize: 12.5, color: 'var(--c-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--f-body)' }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
