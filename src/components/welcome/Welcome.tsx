import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
  exit: { opacity: 0 },
}

const letterVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      damping: 14,
      stiffness: 100,
      duration: 0.3,
    },
  },
}

const Welcome = () => {
  const { pathname } = useLocation()

  const lines = pathname.includes('project')
    ? ['ПРИВЕТСТВУЮ', 'НА МОИХ', 'ПРОЕКТАХ']
    : ['ПРИВЕТСТВУЮ', 'НА МОЕМ', 'ВЕБ-САЙТЕ']

  return (
    <motion.div
      key="intro"
      className="flex flex-col items-center justify-center h-screen bg-black px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col items-center space-y-4">
        {lines.map((line, i) => (
          <div key={i} className="flex space-x-1">
            {line.split('').map((char, j) => (
              <motion.span
                key={j}
                variants={letterVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide"
                style={{
                  textShadow: '20px 20px 20px rgba(255,255,255,0.7)',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Welcome
