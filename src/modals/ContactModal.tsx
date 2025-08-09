import React, { FC, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import {
  FaPhone,
  FaInstagram,
  FaEnvelope,
  FaTelegramPlane,
  FaWhatsapp,
  FaShare,
  FaTimes,
} from 'react-icons/fa'
import QRImage from '~/assets/images/Vahan.png'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal: FC<Props> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [isShareModalOpen, setShareModalOpen] = useState(false)

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

  const handleShare = async () => {
    try {
      const response = await fetch(QRImage)
      const blob = await response.blob()
      const file = new File([blob], 'Vahan.png', { type: 'image/png' })

      if (navigator.share && (navigator as any).canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'QR-код визитки',
          text: 'Этот QR-код ведёт на сайт стоматолога Вагана Варданяна: www.drvardanyan.life',
          files: [file],
        })
        return
      }

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Vahan.png'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error sharing QR image:', error)
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
        onClick={() => setShareModalOpen(true)}
      >
        <FaShare className="text-lg" />
        Поделиться QR-кодом сайта
      </button>
    </div>
  )

  if (!isOpen) return null

  return ReactDOM.createPortal(
    isMobile ? (
      <div>
        {!isShareModalOpen && (
          <>
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
          </>
        )}
        {/* Share modal with QR (mobile) */}
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShareModalOpen(false)}
            />
            <div className="relative w-full bg-white rounded-t-2xl shadow-2xl p-6">
              <button
                aria-label="Закрыть"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShareModalOpen(false)
                  onClose()
                }}
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Сканируйте QR-код сайта</h3>
              <p className="text-sm text-gray-500 mb-4">Или поделитесь QR-кодом ниже</p>
              <div className="w-full flex items-center justify-center">
                <img src={QRImage} alt="QR код визитки" className="w-56 h-56 object-contain" />
              </div>
              <button
                onClick={async () => {
                  await handleShare()
                  setShareModalOpen(false)
                }}
                className="cursor-pointer mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-base md:text-lg py-3 text-white font-semibold bg-gradient-to-r from-cyan-200 to-cyan-500 rounded shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaShare className="text-lg" />
                Поделиться QR-кодом
              </button>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div>
        {!isShareModalOpen && (
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
        )}
        {/* Share modal with QR (desktop) */}
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShareModalOpen(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[420px] max-w-[90vw]">
              <button
                aria-label="Закрыть"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShareModalOpen(false)
                  onClose()
                }}
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Сканируйте QR-код сайта</h3>
              <p className="text-sm text-gray-500 mb-4">Или поделитесь QR-кодом ниже</p>
              <div className="w-full flex items-center justify-center">
                <img src={QRImage} alt="QR код визитки" className="w-56 h-56 object-contain" />
              </div>
              <button
                onClick={async () => {
                  await handleShare()
                  setShareModalOpen(false)
                }}
                className="cursor-pointer mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-base md:text-lg py-3 text-white font-semibold bg-gradient-to-r from-cyan-200 to-cyan-500 rounded shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaShare className="text-lg" />
                Поделиться QR-кодом
              </button>
            </div>
          </div>
        )}
      </div>
    ),
    document.body,
  )
}
