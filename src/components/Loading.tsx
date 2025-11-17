import { useEffect, useState, useRef } from 'react'
import './Loading.css'

const Loading = () => {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')
  const [glitchActive, setGlitchActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Progress animation with easing
    let startTime: number | null = null
    const duration = 2500

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progressValue = Math.min((elapsed / duration) * 100, 100)
      
      // Easing function for smooth progress
      const eased = 1 - Math.pow(1 - progressValue / 100, 3)
      setProgress(eased * 100)

      if (progressValue < 100) {
        requestAnimationFrame(animateProgress)
      }
    }

    requestAnimationFrame(animateProgress)

    // Dots animation
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 150)
    }, 2000)

    // Particle canvas animation
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Array<{
          x: number
          y: number
          vx: number
          vy: number
          size: number
          opacity: number
        }> = []

        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
          })
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          particles.forEach((particle) => {
            particle.x += particle.vx
            particle.y += particle.vy

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`
            ctx.fill()
          })

          requestAnimationFrame(animate)
        }

        animate()
      }
    }

    return () => {
      clearInterval(dotsInterval)
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div className="loading-screen">
      <canvas ref={canvasRef} className="loading-canvas" />
      
      <div className="loading-background">
        <div className="loading-blob blob-1" />
        <div className="loading-blob blob-2" />
        <div className="loading-blob blob-3" />
        <div className="loading-blob blob-4" />
      </div>

      <div className="loading-content">
        <div className="loading-brand">
          <div className="loading-logo-wrapper">
            <div className="logo-glow" />
            <img src="/logocl.png" alt="VectorX402 Logo" className="loading-logo" />
          </div>
          <h1 className={`loading-title ${glitchActive ? 'glitch' : ''}`}>
            <span className="loading-title-line">
              <span className="char" data-char="V">V</span>
              <span className="char" data-char="e">e</span>
              <span className="char" data-char="c">c</span>
              <span className="char" data-char="t">t</span>
              <span className="char" data-char="o">o</span>
              <span className="char" data-char="r">r</span>
            </span>
            <span className="loading-title-line loading-title-accent">
              <span className="char" data-char="X">X</span>
              <span className="char" data-char="4">4</span>
              <span className="char" data-char="0">0</span>
              <span className="char" data-char="2">2</span>
            </span>
          </h1>
        </div>

        <div className="loading-subtitle">
          <span className="subtitle-word">The</span>
          <span className="subtitle-word">Shared</span>
          <span className="subtitle-word">Brain</span>
        </div>

        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div 
              className="loading-progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="progress-glow" />
            </div>
          </div>
          <div className="loading-progress-text">
            <span className="progress-number">{Math.min(Math.round(progress), 100)}</span>
            <span className="progress-percent">%</span>
          </div>
        </div>

        <div className="loading-status">
          <span className="status-text">Initializing</span>
          <span className="status-dots">{dots}</span>
        </div>

        <div className="loading-geometric">
          <div className="geometric-shape shape-1" />
          <div className="geometric-shape shape-2" />
          <div className="geometric-shape shape-3" />
          <div className="geometric-line line-1" />
          <div className="geometric-line line-2" />
          <div className="geometric-line line-3" />
        </div>
      </div>

      <div className="loading-overlay" />
    </div>
  )
}

export default Loading

