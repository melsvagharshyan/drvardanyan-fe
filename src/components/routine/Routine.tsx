import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useMemo } from 'react'
import Slider from 'react-slick'
import { routineImages } from './utils/constants'
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
        {
          breakpoint: 768,
          settings: { slidesToShow: 1 },
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2 },
        },
      ],
    }),
    [isMobile, isTablet],
  )

  const handleShowMore = () => {
    navigate('/routine')
  }

  return (
    <section
      id="routine"
      className="w-full bg-gradient-to-r from-white to-cyan-200 py-16 px-4 sm:px-6 lg:px-8"
    >
      <header className="max-w-screen-xl mx-auto text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-bold uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text">
          Наша рутина
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Заглянем за кулисы работы клиники Варданян
        </p>
      </header>

      <div className="max-w-screen-xl mx-auto">
        <Slider {...sliderSettings}>
          {routineImages.map((item) => (
            <div key={item.id} className="px-2">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="mt-10 sm:mt-16 flex justify-center">
        <button
          onClick={handleShowMore}
          className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-200 to-cyan-500 text-white py-3 px-8 rounded-full font-semibold group transform hover:scale-105"
        >
          <span className="relative z-10">Показать больше</span>
          <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
        </button>
      </div>
    </section>
  )
}

export default Routine
