import { Link } from 'react-router-dom'
import VideoGallery from '~/components/video-gallery/VideoGallery'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const VideoPortfolioSection = () => {
  const mode = useSelector((state: any) => state.theme.mode)

  return (
    <section
      className={clsx(
        'w-full py-8 transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-linear-to-r from-white to-cyan-200 text-black',
      )}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <VideoGallery
          heading="Видеопортфолио нашей практики"
          description="Короткие профессиональные ролики с примерами процедур и результатами."
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
        <div className="text-center mt-6">
          <Link
            to="/videos"
            className={clsx(
              'inline-block relative cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 py-3 px-8 rounded-full font-semibold group transform hover:scale-105',
              mode === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gradient-to-r from-cyan-200 to-cyan-500 text-white',
            )}
          >
            <span className="relative z-10">Показать больше</span>
            {mode !== 'dark' && (
              <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            )}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default VideoPortfolioSection
