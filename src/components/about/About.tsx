import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { useContactModal } from '~/contexts/ContactModalContext'
import { Download } from 'lucide-react'
import cvUrl from '~/assets/docs/Mels-Web-CV.pdf'

const About = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1140px)' })
  const { openContactModal } = useContactModal()

  const VahanImage =
    'https://t3.ftcdn.net/jpg/11/97/74/70/360_F_1197747043_TZl9Tw6tjWTGmSbJq1Z6Fd4GUCdNS8DX.jpg'

  const shareCV = async () => {
    try {
      const response = await fetch(cvUrl)
      const blob = await response.blob()
      const file = new File([blob], 'Mels-Web-CV.pdf', { type: 'application/pdf' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] })
      } else {
        alert('Sharing is not supported on this device or browser.')
      }
    } catch (error) {
      console.error('Error sharing CV:', error)
    }
  }

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full flex justify-center bg-gradient-to-r from-white to-cyan-200 py-20"
    >
      <div className="flex flex-col md:flex-row items-center py-16 px-6 md:px-12 max-w-7xl w-full">
        {!isMobile ? (
          <motion.figure
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-cover bg-center w-60 h-60 rounded-full hidden sm:block"
            role="img"
            aria-label="Фотография врача"
            style={{ backgroundImage: `url(${VahanImage})` }}
          />
        ) : (
          <figure
            className="bg-cover bg-center w-36 h-36 rounded-full sm:hidden mb-6"
            role="img"
            aria-label="Фотография врача"
            style={{ backgroundImage: `url(${VahanImage})` }}
          />
        )}

        <div className={`md:ml-8 ${isMobile ? 'text-center' : 'text-left motion-safe'}`}>
          {!isMobile ? (
            <motion.article
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
              className="md:ml-8"
            >
              <h2
                id="about-heading"
                className="text-4xl font-bold mb-8 font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text"
              >
                Старший врач-стоматолог
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
                Опытный стоматолог с глубокими знаниями и практическими навыками в диагностике,
                лечении и профилактике стоматологических заболеваний. Имею обширный опыт работы с
                пациентами всех возрастов, предоставляя качественное и индивидуальное обслуживание
                на каждом этапе лечения.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mt-4">
                Специализируюсь на создании эффективных планов лечения, внимателен к деталям, владею
                современными методиками и оборудованием. Моя цель — не только лечение, но и
                обеспечение комфорта и доверия каждого пациента.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mt-4">
                Навыки и направления работы:{' '}
                <span className="font-semibold">
                  терапевтическая и эстетическая стоматология, профилактика, протезирование,
                  реставрация зубов, диагностика с использованием 3D-сканеров, ведение документации,
                  индивидуальный подход.
                </span>
              </p>
              <div className="flex flex-wrap  gap-4 mt-12 w-full">
                <motion.button
                  type="button"
                  onClick={openContactModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer px-8 py-4 text-lg font-semibold text-gray-800 border-1 border-cyan-300 rounded-full shadow-xl hover:border-white hover:from-cyan-200 hover:to-white hover:text-white hover:bg-cyan-200 w-full max-w-3xs"
                >
                  СВЯЗАТЬСЯ СО МНОЙ
                </motion.button>
                <motion.a
                  href={cvUrl}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer px-8 py-4 text-lg font-semibold text-gray-800 border-1 border-cyan-300 rounded-full shadow-xl flex items-center justify-center gap-2 hover:border-white hover:from-cyan-200 hover:to-white hover:text-white hover:bg-cyan-200 w-full max-w-3xs"
                >
                  <Download className="w-5 h-5" />
                  Скачать резюме
                </motion.a>
              </div>
            </motion.article>
          ) : (
            <article>
              <h2
                id="about-heading"
                className="text-2xl font-bold mb-6 font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text"
              >
                Старший врач-стоматолог
              </h2>
              <p className="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto font-light">
                Опытный стоматолог с глубокими знаниями и практическими навыками в диагностике,
                лечении и профилактике стоматологических заболеваний. Имею обширный опыт работы с
                пациентами всех возрастов, предоставляя качественное и индивидуальное обслуживание
                на каждом этапе лечения.
              </p>
              <p className="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto mt-4 font-light">
                Специализируюсь на создании эффективных планов лечения, внимателен к деталям, владею
                современными методиками и оборудованием. Моя цель — не только лечение, но и
                обеспечение комфорта и доверия каждого пациента.
              </p>
              <p className="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto mt-4 font-light">
                Навыки и направления работы:{' '}
                <span className="font-semibold">
                  терапевтическая и эстетическая стоматология, профилактика, протезирование,
                  реставрация зубов, диагностика с использованием 3D-сканеров, ведение документации,
                  индивидуальный подход.
                </span>
              </p>
              <div className="flex flex-col items-center gap-4 mt-8 w-full justify-center">
                <motion.button
                  type="button"
                  onClick={openContactModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 cursor-pointer text-lg font-semibold text-gray-800 border-1 border-cyan-300 rounded-full shadow-xl hover:border-white hover:from-cyan-200 hover:to-white hover:text-white hover:bg-cyan-200 w-full max-w-3xs"
                >
                  СВЯЗАТЬСЯ СО МНОЙ
                </motion.button>
                <motion.a
                  onClick={shareCV}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 cursor-pointer text-lg font-semibold text-gray-800 border-1 border-cyan-300 rounded-full shadow-xl flex items-center justify-center gap-2 hover:border-white hover:from-cyan-200 hover:to-white hover:text-white hover:bg-cyan-200 w-full max-w-3xs"
                >
                  <Download className="w-5 h-5" />
                  Скачать резюме
                </motion.a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
