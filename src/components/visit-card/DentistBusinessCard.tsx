import { useRef, useState } from 'react'
import { Mail, Phone, MessageCircle, Instagram, Share2, MapPin, Clock, Award } from 'lucide-react'
import { toBlob } from 'html-to-image'

export default function DentistBusinessCard() {
  const [copied, setCopied] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)

  const handleShare = async () => {
    const contactInfo = `
🦷 Доктор Ваган Варданян - Стоматолог
📧 vahan.vardanyan.97@bk.ru
📞 +7 (910) 166-01-02
💬 Telegram: @Vahan970
📱 Instagram: @vahan_2906
📲 WhatsApp: +374 94 541 615
    `

    try {
      // Prefer sharing a generated image of the card
      if (cardRef.current) {
        const blob = await toBlob(cardRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: '#f8fafc', // light background for transparent zones
        })

        if (blob) {
          const file = new File([blob], 'dentist-business-card.png', { type: 'image/png' })
          if (navigator.share && (navigator as any).canShare?.({ files: [file] })) {
            await navigator.share({
              title: 'Визитка стоматолога',
              text: 'Контакты доктора Вагана Варданяна',
              files: [file],
            })
            return
          }

          // Fallback: download the image if files cannot be shared
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'dentist-business-card.png'
          a.click()
          URL.revokeObjectURL(url)
          return
        }
      }

      // Ultimate fallback: share text or copy
      if (navigator.share) {
        await navigator.share({ title: 'Контакты стоматолога', text: contactInfo })
        return
      }

      await navigator.clipboard.writeText(contactInfo)
      setCopied('Контакты скопированы!')
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      try {
        await navigator.clipboard.writeText(contactInfo)
        setCopied('Контакты скопированы!')
        setTimeout(() => setCopied(''), 2000)
      } catch {
        // ignore
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="relative">
        {/* Main Business Card */}
        <div className="relative transform hover:scale-105 transition-all duration-300">
          <div
            ref={cardRef}
            className="w-full max-w-md bg-gradient-to-br from-white via-cyan-50 to-blue-50 rounded-3xl shadow-2xl border border-cyan-100 overflow-hidden"
          >
            {/* Header with decorative elements (no share button inside image) */}
            <div className="relative bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 h-24 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-6 -translate-x-6" />
              <div className="absolute top-4 right-4">
                <Award className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* Profile Section */}
            <div className="relative px-6 pb-6">
              {/* Profile Photo */}
              <div className="relative -mt-12 mb-4 flex justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600">
                  <img
                    src="https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754586434/vahan/2025-08-07_10.06.37_mxr8hm.jpg"
                    alt="Dr. Ваган Варданян"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const fallback = target.nextSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-white text-2xl">🦷</div>
                </div>
              </div>

              {/* Name and Title */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 text-transparent bg-clip-text mb-1">
                  Dr. Ваган Варданян
                </h1>
                <p className="text-gray-600 font-medium">Стоматолог</p>
                <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Профессиональные услуги</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>24/7 консультации</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="w-full flex items-center gap-3 p-3 rounded-xl border border-cyan-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm text-gray-700 font-medium truncate">vahan.vardanyan.97@bk.ru</p>
                  </div>
                </div>

                <div className="w-full flex items-center gap-3 p-3 rounded-xl border border-cyan-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-gray-500 font-medium">Телефон</p>
                    <p className="text-sm text-gray-700 font-medium">+7 (910) 166-01-02</p>
                  </div>
                </div>

                <div className="w-full flex items-center gap-3 p-3 rounded-xl border border-cyan-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-gray-500 font-medium">Telegram</p>
                    <p className="text-sm text-gray-700 font-medium">@Vahan970</p>
                  </div>
                </div>

                <div className="w-full flex items-center gap-3 p-3 rounded-xl border border-cyan-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-gray-500 font-medium">Instagram</p>
                    <p className="text-sm text-gray-700 font-medium">@vahan_2906</p>
                  </div>
                </div>

                <div className="w-full flex items-center gap-3 p-3 rounded-xl border border-cyan-100/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-gray-500 font-medium">WhatsApp</p>
                    <p className="text-sm text-gray-700 font-medium">+374 94 541 615</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleShare}
            aria-label="Поделиться визиткой"
            className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1 transition"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs font-medium">Поделиться</span>
          </button>
        </div>

        {/* Copied Notification */}
        {copied && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-pulse z-10">
            {copied}
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-200/30 rounded-full animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-200/30 rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  )
}
