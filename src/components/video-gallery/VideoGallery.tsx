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

const shimmer = 'bg-[linear-gradient(110deg,#00000022,45%,#ffffff22,55%,#00000022)] bg-[length:200%_100%] animate-[shimmer_1.2s_infinite]'

const VideoGallery = ({ videos, heading, description }: VideoGalleryProps) => {
  const [openVideo, setOpenVideo] = useState<VideoItem | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const handlePreviewEnter = (id: string) => {
    const el = videoRefs.current[id]
    if (el) {
      try {
        el.currentTime = 0
        // Some browsers require muted to allow programmatic play; we ensure it
        el.muted = true
        el.play().catch(() => {})
      } catch {
        // no-op
      }
    }
  }

  const handlePreviewLeave = (id: string) => {
    const el = videoRefs.current[id]
    if (el) {
      try {
        el.pause()
        el.currentTime = 0
      } catch {
        // no-op
      }
    }
  }

  return (
    <section className="mt-12">
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
            onClick={() => setOpenVideo(v)}
            onMouseEnter={() => handlePreviewEnter(v.id)}
            onMouseLeave={() => handlePreviewLeave(v.id)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Thumbnail or gradient placeholder */}
            <div className={`relative h-60 w-full ${v.thumbnail ? '' : 'bg-gradient-to-br from-cyan-900 via-cyan-700 to-cyan-500'} ${!v.thumbnail ? shimmer : ''}`}>
              {v.thumbnail && (
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
              )}

              {/* Hover video preview */}
              <video
                ref={(el) => (videoRefs.current[v.id] = el)}
                src={v.url}
                muted
                playsInline
                loop
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-gray-800 font-semibold shadow-md group-hover:scale-105 transition-transform">
                  <Play size={18} /> Смотреть
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="bg-white px-4 py-3">
              <p className="text-gray-800 font-medium truncate">{v.title}</p>
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


