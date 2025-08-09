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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarWidth}px`

      // Try to enter fullscreen on mobile sizes
      const isMobileViewport = window.matchMedia('(max-width: 768px)').matches
      const tryEnterFullscreen = async () => {
        if (!isMobileViewport || !videoRef.current) return
        const video = videoRef.current as any
        try {
          // Since user clicked to open modal, try to unmute and play with sound
          try {
            video.muted = false
            video.volume = 1
            video.currentTime = 0
            await video.play()
          } catch {}
          // iOS Safari
          if (typeof video.webkitEnterFullscreen === 'function') {
            video.webkitEnterFullscreen()
            return
          }
          // Standard Fullscreen API
          if (typeof video.requestFullscreen === 'function') {
            await video.requestFullscreen()
            try {
              await video.play()
            } catch {}
            return
          }
          if (typeof (document as any).webkitFullscreenElement !== 'undefined' &&
              typeof video.webkitRequestFullscreen === 'function') {
            video.webkitRequestFullscreen()
            try {
              await video.play()
            } catch {}
          }
        } catch {
          // ignore if browser blocks programmatic fullscreen
        }
      }

      // Give the video a tick to mount before requesting fullscreen
      setTimeout(tryEnterFullscreen, 50)
    } else {
      // Stop video if closing
      try {
        videoRef.current?.pause()
        if (videoRef.current) videoRef.current.currentTime = 0
      } catch {}
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const video = videoRef.current as any
      const isFullscreen = !!(
        document.fullscreenElement ||
        (video && (video.webkitDisplayingFullscreen || video.webkitPresentationMode === 'fullscreen'))
      )
      // If user exited fullscreen (e.g., tapped Done), close modal entirely
      if (!isFullscreen && isOpen) {
        onClose()
      }
    }

    const video = videoRef.current as any
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange as any)
    if (video && typeof video.addEventListener === 'function') {
      video.addEventListener('webkitendfullscreen', handleFullscreenChange)
    }
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange as any)
      if (video && typeof video.removeEventListener === 'function') {
        video.removeEventListener('webkitendfullscreen', handleFullscreenChange)
      }
    }
  }, [isOpen, onClose])

  const exitFullscreenIfAny = async () => {
    const video = videoRef.current as any
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen()
      }
      if (video && typeof video.webkitExitFullscreen === 'function') {
        video.webkitExitFullscreen()
      }
    } catch {
      // ignore
    }
  }

  const handleOverlayClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      await exitFullscreenIfAny()
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
          onClick={async () => {
            await exitFullscreenIfAny()
            onClose()
          }}
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
            ref={videoRef}
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


