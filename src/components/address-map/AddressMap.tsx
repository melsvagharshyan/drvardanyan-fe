import { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const ADDRESS_TEXT = 'Тульская область, город Новомосковск, Трудовые резервы 25, Вита Дент'
const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_TEXT)}&output=embed`
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_TEXT)}`
const YANDEX_MAPS_LINK = `https://yandex.ru/maps/?text=${encodeURIComponent(ADDRESS_TEXT)}`

const AddressMap = () => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mode = useSelector((state: any) => state.theme.mode)

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

  const ActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={GOOGLE_MAPS_LINK}
        target="_blank"
        rel="noreferrer noopener"
        className={clsx(
          'flex-1 inline-flex items-center justify-center gap-2 cursor-pointer py-2.5 px-4 rounded-lg font-semibold shadow hover:shadow-lg transition',
          mode === 'dark'
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : 'bg-gradient-to-r from-cyan-300 to-cyan-600 text-white',
        )}
      >
        Открыть в Google Maps <FaExternalLinkAlt size={14} />
      </a>
      <a
        href={YANDEX_MAPS_LINK}
        target="_blank"
        rel="noreferrer noopener"
        className={clsx(
          'flex-1 inline-flex items-center justify-center gap-2 cursor-pointer border py-2.5 px-4 rounded-lg font-semibold shadow hover:shadow-md transition',
          mode === 'dark'
            ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
            : 'bg-white text-cyan-700 border-cyan-200',
        )}
      >
        Открыть в Яндекс.Картах <FaExternalLinkAlt size={14} />
      </a>
    </div>
  )

  return (
    <section
      className={clsx(
        'w-full py-10 transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-linear-to-r from-white to-cyan-200 text-black',
      )}
      aria-labelledby="address-title"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h2
            id="address-title"
            className={clsx(
              'text-2xl sm:text-3xl font-bold uppercase font-sans bg-clip-text',
              mode === 'dark'
                ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
                : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
            )}
          >
            Где мы находимся?
          </h2>
          <p
            className={clsx(
              'mt-2 max-w-2xl mx-auto',
              mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
            )}
          >
            Мы находимся по адресу, указанному ниже. Нажмите на карту или используйте ссылки, чтобы
            проложить маршрут.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div
            ref={mapContainerRef}
            className={clsx(
              'relative lg:col-span-3 overflow-hidden rounded-2xl shadow-xl border',
              mode === 'dark' ? 'border-gray-700' : 'border-cyan-100',
            )}
          >
            {!isIframeLoaded && (
              <button
                type="button"
                onClick={() => setShouldLoadIframe(true)}
                className={clsx(
                  'absolute inset-0 z-10 flex flex-col items-center justify-center gap-3',
                  mode === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                    : 'bg-gradient-to-br from-white to-cyan-50',
                )}
                aria-label="Загрузить интерактивную карту"
              >
                <div
                  className={clsx(
                    'inline-flex items-center justify-center w-12 h-12 rounded-full border-2',
                    mode === 'dark' ? 'border-cyan-400' : 'border-cyan-300',
                  )}
                >
                  <FaMapMarkerAlt
                    className={mode === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
                    size={22}
                  />
                </div>
                <div
                  className={clsx(
                    'font-medium',
                    mode === 'dark' ? 'text-white' : 'text-gray-700',
                  )}
                >
                  Показать карту
                </div>
                <div
                  className={clsx(
                    'text-xs',
                    mode === 'dark' ? 'text-gray-400' : 'text-gray-500',
                  )}
                >
                  Нажмите, чтобы загрузить интерактивную карту
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={clsx(
                      'w-full h-full animate-pulse bg-gradient-to-b',
                      mode === 'dark'
                        ? 'from-gray-800/70 to-gray-900/70'
                        : 'from-gray-100/70 to-gray-200/70',
                    )}
                  />
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

            {/* Address + buttons under the map (all breakpoints) */}
            <div
              className={clsx(
                'border-t',
                mode === 'dark'
                  ? 'bg-gray-900 border-gray-700'
                  : 'bg-white border-cyan-100',
              )}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt
                    className={clsx('mt-1', mode === 'dark' ? 'text-cyan-400' : 'text-cyan-600')}
                    size={20}
                  />
                  <p className={clsx(mode === 'dark' ? 'text-gray-300' : 'text-gray-800')}>
                    {ADDRESS_TEXT}
                  </p>
                </div>
                <ActionButtons />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default AddressMap
