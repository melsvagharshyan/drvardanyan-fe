import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { useContactModal } from '~/contexts/ContactModalContext'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import VahanImage from '~/assets/vahan-images/2025-08-07_10.06.37_mxr8hm.jpg'

const About = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1140px)' })
  const { openContactModal } = useContactModal()
  const mode = useSelector((state: any) => state.theme.mode)

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={clsx(
        'w-full flex justify-center transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-linear-to-r from-white to-cyan-200 text-black',
      )}
    >
      <div className="flex flex-col md:flex-row items-center pt-16  px-6 md:px-12 max-w-7xl w-full">
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
                className={clsx(
                  'text-4xl font-bold mb-8 font-sans bg-clip-text',
                  mode === 'dark'
                    ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
                    : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
                )}
              >
                Семейный врач-стоматолог общей практики
              </h2>
              <p
                className={clsx(
                  'text-lg leading-relaxed max-w-3xl',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700',
                )}
              >
                Опытный стоматолог с глубокими знаниями и практическими навыками в диагностике,
                лечении и профилактике стоматологических заболеваний. Имею обширный опыт работы с
                пациентами всех возрастов, предоставляя качественное и индивидуальное обслуживание
                на каждом этапе лечения.
              </p>
              <p
                className={clsx(
                  'text-lg leading-relaxed max-w-3xl mt-4',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700',
                )}
              >
                Специализируюсь на создании эффективных планов лечения, внимателен к деталям, владею
                современными методиками и оборудованием. Моя цель — не только лечение, но и
                обеспечение комфорта и доверия каждого пациента.
              </p>
              <p
                className={clsx(
                  'text-lg leading-relaxed max-w-3xl mt-4',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700',
                )}
              >
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
                  className={clsx(
                    'cursor-pointer px-8 py-4 text-lg font-semibold rounded-full shadow-xl w-full max-w-3xs transition-all duration-300',
                    mode === 'dark'
                      ? 'text-white border border-gray-600 hover:bg-gray-800 hover:border-gray-500'
                      : 'text-gray-800 border border-cyan-300 hover:border-white hover:from-cyan-200 hover:to-white hover:text-white hover:bg-cyan-200',
                  )}
                >
                  СВЯЗАТЬСЯ СО МНОЙ
                </motion.button>
              </div>
            </motion.article>
          ) : (
            <article>
              <h2
                id="about-heading"
                className={clsx(
                  'text-2xl font-bold mb-6 font-sans bg-clip-text',
                  mode === 'dark'
                    ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
                    : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
                )}
              >
                Семейный врач-стоматолог общей практики
              </h2>
              <p
                className={clsx(
                  'text-base leading-relaxed max-w-3xl mx-auto font-light',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700',
                )}
              >
                Опытный стоматолог с глубокими знаниями и практическими навыками в диагностике,
                лечении и профилактике стоматологических заболеваний. Имею обширный опыт работы с
                пациентами всех возрастов, предоставляя качественное и индивидуальное обслуживание
                на каждом этапе лечения.
              </p>
              <p
                className={clsx(
                  'text-base leading-relaxed max-w-3xl mx-auto mt-4 font-light',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700',
                )}
              >
                Специализируюсь на создании эффективных планов лечения, внимателен к деталям, владею
                современными методиками и оборудованием. Моя цель — не только лечение, но и
                обеспечение комфорта и доверия каждого пациента.
              </p>
              <p
                className={clsx(
                  'text-base leading-relaxed max-w-3xl mx-auto mt-4 font-light',
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-700',
                )}
              >
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
                  className={clsx(
                    'px-6 py-3 cursor-pointer text-lg font-semibold rounded-full shadow-xl w-full max-w-3xs transition-all duration-300',
                    mode === 'dark'
                      ? 'text-white border border-gray-600 hover:bg-gray-800 hover:border-gray-500'
                      : 'text-gray-800 border border-cyan-300 hover:border-white hover:from-cyan-200 hover:to-white hover:text-white hover:bg-cyan-200',
                  )}
                >
                  СВЯЗАТЬСЯ СО МНОЙ
                </motion.button>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
