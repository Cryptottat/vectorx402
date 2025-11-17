import { useEffect, useRef } from 'react'
import './Features.css'

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered fade-in animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (titleRef.current) {
                titleRef.current.style.opacity = '1'
                titleRef.current.style.transform = 'translateY(0)'
              }
            }, 100)

            setTimeout(() => {
              if (itemsRef.current) {
                const items = itemsRef.current.children
                Array.from(items).forEach((item, index) => {
                  setTimeout(() => {
                    ;(item as HTMLElement).style.opacity = '1'
                    ;(item as HTMLElement).style.transform = 'translateY(0)'
                  }, index * 150)
                })
              }
            }, 300)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const features = [
    {
      title: 'Vector Vault',
      description: 'Decentralized storage for encrypted vector embeddings on IPFS/Arweave, with metadata registered on-chain.',
    },
    {
      title: 'Semantic Search',
      description: 'AI-powered semantic search using cosine similarity to find the most relevant knowledge shards instantly.',
    },
    {
      title: 'X402 Payment',
      description: 'Seamless micro-payments through X402 protocol, enabling instant machine-to-machine transactions.',
    },
    {
      title: 'Quality Staking',
      description: 'Stake $VCTX to ensure data quality, with slashing mechanisms to maintain ecosystem integrity.',
    },
  ]

  return (
    <section className="features" ref={sectionRef}>
      <div className="features-container">
        {/* Asymmetric geometric elements */}
        <div className="features-line vertical-feature-line" />
        <div className="features-line diagonal-feature-line" />
        
        <div className="features-content">
          <h2 className="features-title" ref={titleRef}>
            Architecture
          </h2>
          
          <div className="features-grid" ref={itemsRef}>
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-number">0{index + 1}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Asymmetric blob */}
        <div className="features-blob" />
      </div>
    </section>
  )
}

export default Features

