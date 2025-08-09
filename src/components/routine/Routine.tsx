import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useMemo } from 'react'
import Slider from 'react-slick'
import { routineImages, clientResults } from './utils/constants'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Routine = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 1 } },
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
      ],
    }),
    [isMobile, isTablet],
  )

  const handleShowMore = () => navigate('/routine')
  const handleShowMoreResults = () => navigate('/client-results')

  return (
    <section
      id="routine"
      className="w-full bg-gradient-to-r from-white to-cyan-200 py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Routine Header */}
      <header className="max-w-screen-xl mx-auto text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-bold uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text">
          Наша рутина
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Заглянем за кулисы работы клиники Варданян
        </p>
      </header>

      {/* Routine Slider */}
      <div className="max-w-screen-xl mx-auto">
        <Slider {...sliderSettings}>
          {routineImages.map((item) => (
            <div key={item.id} className="px-2">
              <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Show More Button */}
      <div className="mt-10 sm:mt-16 flex justify-center">
        <button
          onClick={handleShowMore}
          className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-200 to-cyan-500 text-white py-3 px-8 rounded-full font-semibold group transform hover:scale-105"
        >
          <span className="relative z-10">Показать больше</span>
          <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
        </button>
      </div>

      {/* Client Results Section */}
      <div className="mt-20 pt-16">
        <header className="max-w-screen-xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text">
            Результаты наших пациентов
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Фотографии до и после лечения - наглядное подтверждение качества нашей работы
          </p>
        </header>

        {/* Client Results Slider */}
        <div className="max-w-screen-xl mx-auto">
          <Slider {...sliderSettings}>
            {clientResults.map((item) => (
              <div key={item.id} className="px-2">
                <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 bg-white">
                  {/* Before/After Images */}
                  <div className="relative h-80 sm:h-96 md:h-[28rem]">
                    <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
                      <img
                        src={item.before}
                        alt={`До лечения - ${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/40 text-white px-2 py-1 rounded text-xs font-semibold">
                        ДО
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
                      <img
                        src={item.after}
                        alt={`После лечения - ${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/40 text-white px-2 py-1 rounded text-xs font-semibold">
                        ПОСЛЕ
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-1/2 z-10"></div>
                  </div>

                  {/* Always Visible Text */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Возраст: {item.patientAge}</span>
                      <span>Лечение: {item.treatmentDuration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Results Button */}
        <div className="mt-10 sm:mt-16 flex justify-center">
          <button
            onClick={handleShowMoreResults}
            className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-200 to-cyan-500 text-white py-3 px-8 rounded-full font-semibold group transform hover:scale-105"
          >
            <span className="relative z-10">Смотреть все результаты</span>
            <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Routine
