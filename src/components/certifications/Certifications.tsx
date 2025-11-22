import { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'
import Slider from 'react-slick'
import { certifications } from './utils/constants'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Certifications = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1140px)' })
  const mode = useSelector((state: any) => state.theme.mode)

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      speed: 500,
      slidesToShow: isMobile ? 1 : 3,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    }),
    [isMobile],
  )

  return (
    <section
      id="certifications"
      className={clsx(
        'w-full flex flex-col items-center px-4 sm:px-6 transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-linear-to-r from-white to-cyan-200 text-black',
      )}
    >
      <div className="w-full max-w-screen-xl">
        <Slider {...sliderSettings}>
          {certifications.map((cert) => (
            <div key={cert.id} className="px-2">
              <img
                src={cert.image}
                alt=""
                className="w-full h-55 sm:h-64 md:h-72 object-cover rounded-lg sm:rounded-xl md:rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Certifications
