import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import Slider from 'react-slick'
import { useMediaQuery } from 'react-responsive'
import { useMemo, useState } from 'react'
import { RecommendationModal } from '~/modals/RecommendationModal'
import { useGetRecommendationsQuery } from '~/app/recommendations/recommendations.api'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const defaultAvatar =
  'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1746967371/orig_sxg7yl.svg'

const Recommendations = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const { data: recommendations } = useGetRecommendationsQuery()
  const mode = useSelector((state: any) => state.theme.mode)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const sliderSettings = useMemo(
    () => ({
      infinite: true,
      speed: 500,
      slidesToShow: isMobile ? 1 : 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      arrows: false,
    }),
    [isMobile],
  )

  return (
    <section
      id="recommendations"
      className={clsx(
        'w-full py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-linear-to-r from-white to-cyan-200 text-black',
      )}
    >
      <header className="max-w-screen-xl mx-auto text-center mb-10 sm:mb-12">
        <h2
          className={clsx(
            'text-2xl sm:text-4xl font-bold uppercase font-sans bg-clip-text',
            mode === 'dark'
              ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
              : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
          )}
        >
          Отзывы пациентов
        </h2>
      </header>

      <div className="max-w-screen-xl mx-auto">
        <Slider {...sliderSettings}>
          {recommendations?.map((rec) => (
            <motion.article
              key={rec._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="rounded-3xl px-6 py-8 sm:px-8 sm:py-10 mx-auto flex flex-col justify-center items-center text-center max-w-sm sm:max-w-md"
            >
              <figure className="flex flex-col items-center">
                <img
                  src={rec.image?.url ? rec.image?.url : defaultAvatar}
                  alt={`Portrait of ${rec.fullName}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4"
                />
                <figcaption className="text-center">
                  <h3
                    className={clsx(
                      'text-base sm:text-lg font-bold',
                      mode === 'dark' ? 'text-white' : 'text-gray-800',
                    )}
                  >
                    {rec.fullName}
                  </h3>
                </figcaption>
              </figure>
              <blockquote
                className={clsx(
                  'text-sm sm:text-base mb-4 leading-relaxed italic',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
                )}
              >
                "{rec.recommendation}"
              </blockquote>
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < rec?.stars ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.article>
          ))}
        </Slider>
      </div>

      <div className="mt-10 sm:mt-16 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className={clsx(
            'relative overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer py-3 px-6 rounded-full font-semibold group',
            mode === 'dark'
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gradient-to-r from-cyan-200 to-cyan-500 text-white',
          )}
        >
          <span className="relative z-10">Оставить отзыв</span>
          <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
        </button>
      </div>

      {isModalOpen && (
        <RecommendationModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      )}
    </section>
  )
}

export default Recommendations
