import { useEffect, useState } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

const Toast = ({ message, onClose, duration = 4000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast ${isVisible ? 'visible' : ''}`}>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
      </div>
    </div>
  )
}

export default Toast

