import { useEffect, useState, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'

import ArrowTop from './components/arrow-top/ArrowTop'
import Footer from './components/footer/Footer'
import Welcome from './components/welcome/Welcome'

import { appRoutes } from '~/routes/routes'
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext'
import { ContactModal } from './modals/ContactModal'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import Loader from './components/loader/Loader'

const AppRoutes = () => useRoutes(appRoutes)

const AppContent = () => {
  const { isContactModalOpen, closeContactModal } = useContactModal()

  const [hasVisited, setHasVisited] = useState(
    () => sessionStorage.getItem('hasVisited') === 'true',
  )
  const [showWelcome, setShowWelcome] = useState(!hasVisited)

  useEffect(() => {
    if (!hasVisited) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => {
        sessionStorage.setItem('hasVisited', 'true')
        setHasVisited(true)
        setShowWelcome(false)
        document.body.style.overflow = 'auto'
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [hasVisited])

  return (
    <div className="w-full h-screen bg-black">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <Welcome key="welcome" />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
            <ArrowTop />
            <Footer />
            <ToastContainer />
            <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
          </motion.div>
        )}
      </AnimatePresence>
      <SpeedInsights />
      <Analytics />
    </div>
  )
}

const App = () => {
  return (
    <ContactModalProvider>
      <AppContent />
    </ContactModalProvider>
  )
}

export default App
