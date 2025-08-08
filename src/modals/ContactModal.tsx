import React, { FC, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { FaPhone, FaInstagram, FaEnvelope, FaTelegramPlane, FaWhatsapp, FaShare } from 'react-icons/fa'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal: FC<Props> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const [{ y }, api] = useSpring(() => ({ y: 0 }))

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen && isMobile) {
      api.start({ y: 0, config: { tension: 210, friction: 23 } })
    }
  }, [isOpen, isMobile, api])

  const bind = useDrag(
    ({
      last,
      movement: [, my],
    }: {
      last: boolean
      movement: [number, number]
      cancel?: () => void
    }) => {
      if (!isMobile) return
      if (my < 0) return

      if (last) {
        if (my > 100) {
          api.start({ y: 250, onResolve: () => onClose() })
        } else {
          api.start({ y: 0 })
        }
      } else {
        api.start({ y: my })
      }
    },
    { from: () => [0, y.get()], filterTaps: true },
  )

  const createVisitCard = async (): Promise<Blob> => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get canvas context')

    // Set canvas size
    canvas.width = 1200
    canvas.height = 800

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.5, '#e0f7fa')
    gradient.addColorStop(1, '#b2ebf2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add decorative elements
    ctx.fillStyle = 'rgba(0, 188, 212, 0.1)'
    ctx.beginPath()
    ctx.arc(100, 100, 80, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(canvas.width - 100, canvas.height - 100, 120, 0, 2 * Math.PI)
    ctx.fill()

    // Add title
    ctx.fillStyle = '#006064'
    ctx.font = 'bold 48px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Вахан Варданян', canvas.width / 2, 120)
    
    // Add subtitle
    ctx.fillStyle = '#00838f'
    ctx.font = '24px Arial, sans-serif'
    ctx.fillText('Стоматолог-ортодонт', canvas.width / 2, 160)

    // Add contact information
    ctx.fillStyle = '#424242'
    ctx.font = '20px Arial, sans-serif'
    ctx.textAlign = 'left'
    
    const contacts = [
      { icon: '📧', text: 'vahan.vardanyan.97@bk.ru' },
      { icon: '📱', text: '+7 (910) 166-01-02' },
      { icon: '💬', text: 'Telegram: @Vahan970' },
      { icon: '📸', text: 'Instagram: @vahan_2906' },
      { icon: '📞', text: 'WhatsApp: +37494541615' }
    ]

    let yPos = 250
    contacts.forEach((contact, index) => {
      ctx.fillStyle = '#006064'
      ctx.font = '24px Arial, sans-serif'
      ctx.fillText(contact.icon, 200, yPos)
      
      ctx.fillStyle = '#424242'
      ctx.font = '20px Arial, sans-serif'
      ctx.fillText(contact.text, 250, yPos)
      
      yPos += 50
    })

    // Add decorative line
    ctx.strokeStyle = '#00bcd4'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(150, 600)
    ctx.lineTo(canvas.width - 150, 600)
    ctx.stroke()

    // Add footer text
    ctx.fillStyle = '#757575'
    ctx.font = '18px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Запишитесь на консультацию и начните путь к красивой улыбке!', canvas.width / 2, 680)

    // Add website or additional info
    ctx.fillStyle = '#00bcd4'
    ctx.font = 'bold 22px Arial, sans-serif'
    ctx.fillText('Профессиональная стоматология', canvas.width / 2, 720)

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
      }, 'image/png')
    })
  }

  const handleShare = async () => {
    try {
      const visitCardBlob = await createVisitCard()
      const file = new File([visitCardBlob], 'visit-card.png', { type: 'image/png' })

      if (navigator.share) {
        await navigator.share({
          title: 'Вахан Варданян - Стоматолог-ортодонт',
          text: 'Контактная информация стоматолога-ортодонта Вахана Варданяна',
          files: [file]
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        const url = URL.createObjectURL(visitCardBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'visit-card.png'
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Fallback: just download the file
      try {
        const visitCardBlob = await createVisitCard()
        const url = URL.createObjectURL(visitCardBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'visit-card.png'
        link.click()
        URL.revokeObjectURL(url)
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError)
      }
    }
  }

  const ContactContent = () => (
    <div>
      <h2 className="text-xl font-bold mb-6 font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text ">
        Контактная информация
      </h2>
      <ul className="space-y-4 text-base md:text-lg text-gray-800">
        <li className="flex items-center gap-3 py-1">
          <FaEnvelope className="text-black text-xl" />
          <a href="mailto:vahan.vardanyan.97@bk.ru" className="hover:underline">
            vahan.vardanyan.97@bk.ru
          </a>
        </li>
        <li className="flex items-center gap-3 py-1">
          <FaPhone className="text-black text-xl" />
          <a href="tel:+79101660102" className="hover:underline">
            +7 (910) 166-01-02
          </a>
        </li>
        <li className="flex items-center gap-3 py-1">
          <FaTelegramPlane className="text-black text-xl" />
          <a
            href="https://t.me/Vahan970"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Telegram
          </a>
        </li>
        <li className="flex items-center gap-3 py-1">
          <FaInstagram className="text-black text-xl" />
          <a
            href="https://www.instagram.com/vahan_2906"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
        </li>
        <li className="flex items-center gap-3 py-1">
          <FaWhatsapp className="text-black text-xl" />
          <a
            href="https://wa.me/37494541615"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            WhatsApp
          </a>
        </li>
      </ul>
      <button
        className="cursor-pointer mt-8 w-full bg-cyan-600 hover:bg-cyan-700 text-base md:text-lg py-3 text-white font-semibold bg-gradient-to-r from-cyan-200 to-cyan-500 rounded shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        onClick={handleShare}
      >
        <FaShare className="text-lg" />
        Поделиться визиткой
      </button>
    </div>
  )

  if (!isOpen) return null

  return ReactDOM.createPortal(
    isMobile ? (
      <div>
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
        <animated.div
          {...bind()}
          className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg z-50 touch-none"
          style={{
            transform: y.to((v: number) => `translateY(${v}px)`),
            touchAction: 'none',
            borderRadius: '20px 20px 0 0',
            maxHeight: '80vh',
            backgroundImage: `url(https://img.freepik.com/premium-photo/teeth-dental-care-medical-background_147644-52.jpg)`,
            backgroundSize: 'cover',
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <div className="relative p-6 ">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-400 rounded-full " />
            <div className="mt-4">
              <ContactContent />
            </div>
          </div>
        </animated.div>
      </div>
    ) : (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3"
        onClick={handleOverlayClick}
      >
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 animate-fade-in "
          style={{
            backgroundImage: `url(https://img.freepik.com/premium-photo/teeth-dental-care-medical-background_147644-52.jpg)`,
            backgroundSize: 'cover',
          }}
        >
          <ContactContent />
        </div>
      </div>
    ),
    document.body,
  )
}
