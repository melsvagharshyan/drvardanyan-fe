import { easeInOut, motion } from 'framer-motion'
import Navbar from '../navbar/Navbar'
import { useMediaQuery } from 'react-responsive'
import { useContactModal } from '~/contexts/ContactModalContext'
import { Link as ScrollLink } from 'react-scroll'
import HedaderImage from '~/assets/vahan-images/header_tm8g0a.jpg'

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeInOut, delay: i * 0.2 },
  }),
}

const individualButtonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeInOut, delay: i * 0.15 },
  }),
  hover: {
    scale: 1.03,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
}

const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const { openContactModal } = useContactModal()

  const handleSocialMedia = () => {
    openContactModal()
  }

  return (
    <header
      id="navbar"
      role="banner"
      aria-label="Site header"
      className="w-full bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: isMobile
          ? `url(https://i.pinimg.com/1200x/71/6c/52/716c52a15d910375bff29750833ee0a1.jpg)`
          : `url(${HedaderImage})`,
      }}
    >
      <Navbar />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className={`flex flex-col gap-6 relative z-10 ${isMobile ? 'px-4 py-20' : 'px-20 py-28'}`}
      >
        <motion.p
          custom={0}
          variants={textVariants}
          className={`text-white font-bold font-serif ${
            isMobile ? 'text-3xl text-center' : 'text-6xl ml-4'
          }`}
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.5)',
          }}
        >
          +7 (910) 166-01-02
        </motion.p>

        <motion.p
          custom={1}
          variants={textVariants}
          className={` font-medium font-sans ${isMobile ? 'text-md text-center' : 'text-xl ml-4'}`}
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.5)',
          }}
        >
          Ваша улыбка — наша забота! <br />
          Ваш комфорт — наш приоритет! <br />
          Начните путь к идеальной улыбке сегодня.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className={`flex gap-6 mt-8 ${isMobile ? 'flex-col items-center' : 'ml-4'}`}
        >
          <ScrollLink
            to="consultation"
            smooth={true}
            duration={500}
            className="cursor-pointer flex items-center gap-2"
          >
            <motion.button
              custom={0}
              variants={individualButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="group relative overflow-visible shadow-md hover:shadow-lg duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-200 to-cyan-400 text-white py-4 px-8 rounded-full font-semibold transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Записать на визит
              </span>

              <span className="absolute inset-0 rounded-full border border-cyan-300 opacity-40 animate-softPing scale-110 translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 w-full h-full"></span>
            </motion.button>
          </ScrollLink>

          <motion.button
            custom={1}
            variants={individualButtonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleSocialMedia}
            className="w-[230px] group relative overflow-hidden shadow-lg hover:shadow-2xl duration-300 flex items-center justify-center gap-2 cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 px-8 rounded-full font-semibold transition-all hover:bg-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
                />
              </svg>
              Мои соцсети
            </span>
            <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
          </motion.button>
        </motion.div>

        <style>
          {`
            @keyframes softPing {
              0% { transform: scale(1); opacity: 0.4; }
              70% { transform: scale(1.25); opacity: 0; }
              100% { transform: scale(1.25); opacity: 0; }
            }
            .animate-softPing {
              animation: softPing 2.5s ease-out infinite;
              position: absolute;
              pointer-events: none;
            }
          `}
        </style>
      </motion.div>
    </header>
  )
}

export default Header
