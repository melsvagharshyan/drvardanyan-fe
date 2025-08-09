import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import VideoModal from '~/modals/VideoModal'

interface VideoItem {
  id: string
  url: string
  title: string
  thumbnail?: string
}

interface VideoGalleryProps {
  videos: VideoItem[]
  heading?: string
  description?: string
}

const VideoGallery = ({ videos, heading, description }: VideoGalleryProps) => {
  const [openVideo, setOpenVideo] = useState<VideoItem | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  return (
    <section>
      {(heading || description) && (
        <header className="text-center mb-8">
          {heading && (
            <h2 className="text-2xl sm:text-3xl font-bold uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text">
              {heading}
            </h2>
          )}
          {description && <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{description}</p>}
        </header>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((v) => (
          <button
            key={v.id}
            onClick={async () => {
              const isMobile = window.matchMedia('(max-width: 768px)').matches
              if (isMobile) {
                const el = videoRefs.current[v.id] as any
                try {
                  if (el) {
                    // Ensure audio is on when user explicitly clicks
                    try {
                      el.muted = false
                      el.volume = 1
                      el.currentTime = 0
                      await el.play()
                    } catch {}
                    if (typeof el.webkitEnterFullscreen === 'function') {
                      el.webkitEnterFullscreen()
                      try {
                        await el.play()
                      } catch {}
                      return
                    }
                    if (typeof el.requestFullscreen === 'function') {
                      await el.requestFullscreen()
                      try {
                        await el.play()
                      } catch {}
                      return
                    }
                    if (
                      typeof (document as any).webkitFullscreenElement !== 'undefined' &&
                      typeof el.webkitRequestFullscreen === 'function'
                    ) {
                      el.webkitRequestFullscreen()
                      try {
                        await el.play()
                      } catch {}
                      return
                    }
                  }
                } catch {
                  // fallback to modal below
                }
              }
              setOpenVideo(v)
            }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Always-on video preview */}
            <div className="relative h-60 w-full bg-black">
              <video
                ref={(el: HTMLVideoElement | null) => {
                  videoRefs.current[v.id] = el
                }}
                src={v.url}
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-gray-800 font-semibold shadow-md group-hover:scale-105 transition-transform">
                  <Play size={18} /> Смотреть
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <VideoModal
        isOpen={!!openVideo}
        onClose={() => setOpenVideo(null)}
        src={openVideo?.url || ''}
        title={openVideo?.title}
      />
    </section>
  )
}

export default VideoGallery
