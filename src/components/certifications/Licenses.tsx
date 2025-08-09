import { useEffect, useMemo, useState } from 'react'
import { certificationsLarge } from './utils/constants'
import Slider from 'react-slick'
import { useMediaQuery } from 'react-responsive'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Licenses = () => {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    if (active) {
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
  }, [active])

  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: isMobile ? 1 : isTablet ? 2 : 2,
      slidesToScroll: 1,
      arrows: false,
      appendDots: (dots: React.ReactNode) => (
        <div className="mt-3">
          <ul className="flex justify-center gap-2" aria-label="Licenses navigation dots">{dots}</ul>
        </div>
      ),
    }),
    [isMobile, isTablet],
  )

  return (
    <section className="w-full bg-gradient-to-r from-white to-cyan-200 py-10" aria-labelledby="licenses-title">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h2
            id="licenses-title"
            className="text-2xl sm:text-3xl font-bold uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text"
          >
            Лицензии и разрешительные документы
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Подтверждение квалификации и права на осуществление стоматологической деятельности.
          </p>
        </header>

        <Slider {...sliderSettings}>
          {certificationsLarge.map(({ id, image }) => (
            <div key={id} className="px-2">
              <button
                onClick={() => setActive(image)}
                className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={image}
                  alt={`Лицензия ${id}`}
                  className="w-full h-[380px] sm:h-[420px] object-contain p-4 bg-white"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          ))}
        </Slider>

        {active && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <img src={active} alt="Лицензия" className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" />
          </div>
        )}
      </div>
    </section>
  )
}

export default Licenses


