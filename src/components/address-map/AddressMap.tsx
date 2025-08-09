import { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa'

const ADDRESS_TEXT = 'Тульская область, город Новомосковск, Трудовые резервы 25, Вита Дент'
const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_TEXT)}&output=embed`
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_TEXT)}`
const YANDEX_MAPS_LINK = `https://yandex.ru/maps/?text=${encodeURIComponent(ADDRESS_TEXT)}`

const AddressMap = () => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (shouldLoadIframe) return
    if (!mapContainerRef.current) return
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setShouldLoadIframe(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadIframe(true)
          }
        })
      },
      {
        root: null,
        rootMargin: '400px 0px',
        threshold: 0.01,
      },
    )

    observer.observe(mapContainerRef.current)
    return () => observer.disconnect()
  }, [shouldLoadIframe])

  return (
    <section
      className="w-full bg-gradient-to-r from-white to-cyan-200 py-10"
      aria-labelledby="address-title"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h2
            id="address-title"
            className="text-2xl sm:text-3xl font-bold uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text"
          >
            Где мы находимся?
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Мы находимся по адресу, указанному ниже. Нажмите на карту или используйте ссылки, чтобы
            проложить маршрут.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div
            ref={mapContainerRef}
            className="relative lg:col-span-2 overflow-hidden rounded-2xl shadow-xl border border-cyan-100"
          >
            {!isIframeLoaded && (
              <button
                type="button"
                onClick={() => setShouldLoadIframe(true)}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-white to-cyan-50"
                aria-label="Загрузить интерактивную карту"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-cyan-300">
                  <FaMapMarkerAlt className="text-cyan-600" size={22} />
                </div>
                <div className="text-gray-700 font-medium">Показать карту</div>
                <div className="text-xs text-gray-500">Нажмите, чтобы загрузить интерактивную карту</div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full animate-pulse bg-gradient-to-b from-gray-100/70 to-gray-200/70" />
                </div>
              </button>
            )}

            {shouldLoadIframe && (
              <iframe
                title="Адрес на карте"
                src={GOOGLE_MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-0 w-full h-[360px] sm:h-[420px] lg:h-[460px]"
                onLoad={() => setIsIframeLoaded(true)}
              />
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-5 border border-cyan-100 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-cyan-600" size={20} />
              <p className="text-gray-800">{ADDRESS_TEXT}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 inline-flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-300 to-cyan-600 text-white py-2.5 px-4 rounded-lg font-semibold shadow hover:shadow-lg transition"
              >
                Открыть в Google Maps <FaExternalLinkAlt size={14} />
              </a>
              <a
                href={YANDEX_MAPS_LINK}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 inline-flex items-center justify-center gap-2 cursor-pointer bg-white text-cyan-700 border border-cyan-200 py-2.5 px-4 rounded-lg font-semibold shadow hover:shadow-md transition"
              >
                Открыть в Яндекс.Картах <FaExternalLinkAlt size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddressMap
