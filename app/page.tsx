import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Features } from '@/components/landing/Features'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* Strip */}
        <div style={{ background: 'var(--c-bg)', borderBottom: '1px solid var(--c-line)', padding: '28px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--c-muted)' }}>Pensado para peluquerías de barrio &amp; barberías independientes</span>
            <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', color: 'var(--c-ink-60)', fontSize: 16 }}><em style={{ color: 'var(--c-gold-deep)' }}>«</em> Tomá turnos mientras cortás. <em style={{ color: 'var(--c-gold-deep)' }}>»</em></span>
          </div>
        </div>
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
