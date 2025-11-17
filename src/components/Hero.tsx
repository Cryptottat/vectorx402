import { useEffect, useRef } from 'react'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered fade-in animation
    const elements = [
      { ref: titleRef, delay: 0 },
      { ref: subtitleRef, delay: 200 },
      { ref: taglineRef, delay: 400 },
    ]

    elements.forEach(({ ref, delay }) => {
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.opacity = '1'
          ref.current.style.transform = 'translateY(0)'
        }
      }, delay)
    })
  }, [])

  return (
    <main className="hero" ref={heroRef}>
      <div className="hero-container">
        {/* Geometric line elements */}
        <div className="geometric-line vertical-line-1" />
        <div className="geometric-line vertical-line-2" />
        <div className="geometric-line horizontal-line-1" />
        <div className="geometric-line diagonal-line-1" />
        
        {/* Main content */}
        <div className="hero-content">
          <h1 className="hero-title" ref={titleRef}>
            <span className="title-line">The Shared Brain</span>
            <span className="title-line">of the Agent</span>
            <span className="title-line title-line-economy">
              <span className="economy-text">Economy</span>
              <span className="economy-line" />
              <span className="brand-name-racing">Vector X402</span>
            </span>
          </h1>
          
          <p className="hero-subtitle" ref={subtitleRef}>
            Don't Compute. Just Recall.
          </p>
          
          <div className="hero-tagline" ref={taglineRef}>
            <p className="tagline-text">
              A decentralized marketplace where AI agents trade vector embeddings,
              eliminating redundant computation and creating a collective intelligence network.
            </p>
          </div>
        </div>

        {/* Floating geometric shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>

        {/* Gradient blob */}
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
      </div>
    </main>
  )
}

export default Hero

