import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import Toast from '../components/Toast'
import './AppPage.css'

const AppPage = () => {
  const { connected, publicKey, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null)

  const handleConnectWallet = () => {
    setVisible(true)
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const { subscribeEmail } = await import('../utils/api')
      const response = await subscribeEmail(email)
      
      // Always show success message
      setIsSubmitted(true)
      setEmail('')
      
      // Show toast message
      const toastId = Date.now()
      setToast({ message: 'Use the SDK from GitHub', id: toastId })
    } catch (err) {
      // Silently handle - still show success
      setIsSubmitted(true)
      setEmail('')
      
      // Show toast message
      const toastId = Date.now()
      setToast({ message: 'Use the SDK from GitHub', id: toastId })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-page">
      <div className="app-page-background">
        <div className="app-blob blob-1" />
        <div className="app-blob blob-2" />
      </div>

      <div className="app-page-container">
        <div className="app-page-header">
          {!connected ? (
            <button 
              className="connect-wallet-button"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <div className="wallet-connected">
              <div className="wallet-status-indicator" />
              <span>
                {publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 'Connected'}
              </span>
              <button 
                className="disconnect-button"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        <div className="app-page-content">
          {!connected ? (
            <div className="connect-prompt">
              <div className="prompt-card">
                <h2>Connect Your Wallet</h2>
                <p>Connect a wallet to access VectorX402 marketplace</p>
                <div className="wallet-options">
                  <button className="wallet-option" onClick={handleConnectWallet}>
                    Phantom
                  </button>
                  <button className="wallet-option" onClick={handleConnectWallet}>
                    Solflare
                  </button>
                  <button className="wallet-option" onClick={handleConnectWallet}>
                    Other Wallets
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="sdk-notification-section">
              <div className="sdk-card">
                <div className="sdk-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h2>SDK Coming Soon</h2>
                <p className="sdk-description">
                  Install the VectorX402 SDK from GitHub. Get notified when updates are available.
                </p>
                <p className="sdk-install-hint">
                  <code>npm install github:vectorx402/vectorx402</code>
                </p>

                {!isSubmitted ? (
                  <form className="email-form" onSubmit={handleSubmit}>
                    <div className="email-input-wrapper">
                      <input
                        type="email"
                        className="email-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setError('')
                        }}
                        required
                        disabled={isLoading}
                      />
                      <button 
                        type="submit"
                        className="submit-button"
                        disabled={isLoading || !email}
                      >
                        {isLoading ? 'Submitting...' : 'Notify Me'}
                      </button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                  </form>
                ) : (
                  <div className="success-message">
                    <div className="success-icon">✓</div>
                    <p>You will be notified when SDK updates are available.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default AppPage

