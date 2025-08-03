import { motion } from 'framer-motion'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { FC } from 'react'

interface GlassButtonProps {
  onClick: () => void
  label?: string
  direction?: 'left' | 'right' // default = left (back)
  className?: string
}

export const GlassButton: FC<GlassButtonProps> = ({
  onClick,
  label = 'Back',
  direction = 'left',
  className = '',
}) => {
  const isLeft = direction === 'left'
  const Icon = isLeft ? IoChevronBack : IoChevronForward

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={`px-5 py-3.5 sm:py-2.5 sm:px-6 flex items-center gap-2 
                  rounded-full shadow-md backdrop-blur-md 
                  bg-white/10 border border-white/10 
                  text-cyan-800 hover:text-white 
                  hover:bg-cyan-500/50 hover:shadow-lg cursor-pointer
                  transition-all duration-300 ${className}`}
    >
      {isLeft && (
        <motion.span
          animate={{ x: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-lg sm:text-xl flex items-center"
        >
          <Icon className="mt-0.5" />
        </motion.span>
      )}
      <span className="text-sm sm:text-base font-medium tracking-wide">{label}</span>
      {!isLeft && (
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-lg sm:text-xl flex items-center"
        >
          <Icon className="mt-0.5" />
        </motion.span>
      )}
    </motion.button>
  )
}
