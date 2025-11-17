import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="header-brand">
          <span className="brand-name">VectorX402</span>
          <span className="brand-line" />
          <img src="/logocl.png" alt="VectorX402 Logo" className="brand-logo" />
        </Link>
        
        <nav className="header-nav">
          <a 
            href="#" 
            className="nav-link"
            onMouseEnter={() => setActiveMenu('x')}
            onMouseLeave={() => setActiveMenu(null)}
            onClick={(e) => e.preventDefault()}
          >
            <span className="nav-text">x</span>
            <span className="nav-underline" data-active={activeMenu === 'x'} />
          </a>
          <a 
            href="https://docs.vectorx402.space" 
            className="nav-link"
            onMouseEnter={() => setActiveMenu('docs')}
            onMouseLeave={() => setActiveMenu(null)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="nav-text">docs</span>
            <span className="nav-underline" data-active={activeMenu === 'docs'} />
          </a>
          <Link 
            to="/app" 
            className="nav-link"
            onMouseEnter={() => setActiveMenu('app')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="nav-text">app</span>
            <span className="nav-underline" data-active={activeMenu === 'app'} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

