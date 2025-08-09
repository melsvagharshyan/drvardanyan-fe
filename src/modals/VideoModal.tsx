import React, { FC, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { IoClose } from 'react-icons/io5'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
  title?: string
}

export const VideoModal: FC<VideoModalProps> = ({ isOpen, onClose, src, title }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Видео'}
    >
      <div
        ref={modalRef}
        className="relative bg-black rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fade-in"
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 cursor-pointer shadow"
        >
          <IoClose size={20} />
        </button>

        {title && (
          <div className="px-4 py-3 text-white bg-gradient-to-r from-cyan-600/60 to-transparent absolute top-0 left-0 right-0 pointer-events-none">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold drop-shadow">{title}</h3>
          </div>
        )}

        <div className="bg-black">
          <video
            src={src}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full max-h-[80vh] bg-black"
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default VideoModal


