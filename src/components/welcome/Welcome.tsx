import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

const Welcome = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      className="relative h-screen w-full bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 flex flex-col items-center justify-center px-6 text-white text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        backgroundImage: `url(https://i.pinimg.com/1200x/f4/af/35/f4af3577e597f6bd89ac19d04e9cfd6d.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <motion.div className="flex items-center gap-3 mb-4" variants={textVariants}>
        <img
          src="https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754223427/vahan/download_v2dtpq.svg"
          alt="Dr. Vardanyan Logo"
          width={50}
          height={50}
          className={clsx('transition-transform duration-300 group-hover:rotate-6')}
        />
        <span
          style={{ fontFamily: '"Parisienne", cursive' }}
          className="text-2xl font-bold bg-gradient-to-r from-[#2af1f4] via-[#0284e4] to-[#2af1f4] text-transparent bg-clip-text transition-all duration-300"
        >
          Dr. Vardanyan
        </span>
      </motion.div>

      <motion.p
        className="uppercase tracking-widest mb-4 text-cyan-200 text-sm md:text-base font-semibold"
        variants={textVariants}
      >
        Ваша улыбка — наша забота
      </motion.p>

      <motion.h1
        className="text-5xl mb-60 md:text-7xl font-extrabold drop-shadow-lg"
        variants={textVariants}
      >
        Добро пожаловать
      </motion.h1>
    </motion.div>
  )
}

export default Welcome
