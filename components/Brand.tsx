export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size, background: 'var(--c-ink)', color: 'var(--c-gold)', borderRadius: 'var(--r-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={Math.round(size * 0.53)} height={Math.round(size * 0.53)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/>
        <line x1="8.5" y1="15.5" x2="20" y2="4"/><line x1="15.5" y1="15.5" x2="4" y2="4"/>
        <line x1="12" y1="11" x2="14" y2="13"/>
      </svg>
    </span>
  )
}

export function Wordmark({ size = 22, light = false }: { size?: number; light?: boolean }) {
  return (
    <span style={{ fontFamily: 'var(--f-display)', fontSize: size, fontWeight: 500, letterSpacing: '-0.01em', color: light ? '#fff' : 'var(--c-ink)' }}>
      Cort<em style={{ fontStyle: 'italic', color: light ? 'var(--c-gold)' : 'var(--c-gold-deep)' }}>urno</em>
    </span>
  )
}
