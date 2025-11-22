import { IoIosArrowUp } from 'react-icons/io'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const ArrowTop: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const mode = useSelector((state: any) => state.theme.mode)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: -50, behavior: 'smooth' })
  }

  return (
    <div
      onClick={scrollToTop}
      className={clsx(
        'fixed bottom-32 right-5 z-38 cursor-pointer transition-all duration-500 ease-in-out rounded-full p-3 shadow-lg backdrop-blur-md hover:scale-110',
        mode === 'dark'
          ? 'bg-gray-800/70 text-white hover:bg-gray-700 hover:shadow-gray-600/50'
          : 'bg-cyan-400/20 text-deepskyblue hover:bg-cyan-500/30 hover:shadow-cyan-500/50',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <IoIosArrowUp size={28} />
    </div>
  )
}

export default ArrowTop
