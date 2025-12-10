import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Layout from '~/components/layout/Layout'
import VideoGallery from '~/components/video-gallery/VideoGallery'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const VideosPage = () => {
  const navigate = useNavigate()
  const mode = useSelector((state: any) => state.theme.mode)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBack = () => {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/')
  }

  return (
    <Layout>
      <div
        className={clsx(
          'min-h-screen pt-30 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300',
          mode === 'dark'
            ? 'bg-linear-to-r from-black to-gray-900 text-white'
            : 'bg-gradient-to-br from-white via-cyan-50 to-cyan-100',
        )}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className={clsx(
                'flex cursor-pointer items-center gap-2 transition-colors duration-200',
                mode === 'dark'
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : 'text-cyan-600 hover:text-cyan-800',
              )}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Назад</span>
            </button>
          </div>

          {/* Page Title */}
          <header className="text-center mb-12">
            <h1
              className={clsx(
                'text-3xl sm:text-5xl font-bold uppercase font-sans bg-clip-text mb-4',
                mode === 'dark'
                  ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
                  : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
              )}
            >
              Видеопортфолио нашей практики
            </h1>
            <p
              className={clsx(
                'text-lg sm:text-xl max-w-3xl mx-auto',
                mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
              )}
            >
              Короткие профессиональные ролики с примерами процедур и результатами.
            </p>
          </header>

          <VideoGallery
            videos={[
              {
                id: 'v1',
                url: 'https://melsimages.blob.core.windows.net/images/videos-vke/AQM1Abu-BQ8DnTzEDvsPODuVsBcveFddqj0FVfpXge4Ad7EX-uJWIXhvhpUbCRkRiGAc_qikCCE-t-0oAs0uO3pgjPiKqDzE_2_lhzbt7.mp4',
                title: 'Профессиональная работа — Видео 1',
                thumbnail:
                  'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661287/vahan/2025-08-08_06.49.57_azze6v.jpg',
              },
              {
                id: 'v2',
                url: 'https://melsimages.blob.core.windows.net/images/videos-vke/AQMT9rElo-QHDaQ2pElU1Pc5wMMeRA-9KAaTUB3aYIeSxGXTPl81JAyVluF-9RpeLJP0QVKT_LjJorRHmoEDvjUXgNcsx62d_arqdaq.mp4',
                title: 'Профессиональная работа — Видео 2',
                thumbnail:
                  'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661287/vahan/2025-08-08_06.49.57_azze6v.jpg',
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  )
}

export default VideosPage
