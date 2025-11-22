import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { detailedClientResults } from '~/components/routine/utils/constants'
import Layout from '~/components/layout/Layout'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const ClientResultsPage = () => {
  const navigate = useNavigate()
  const mode = useSelector((state: any) => state.theme.mode)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBack = () => {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/')
  }

  const handleConsultationClick = () => {
    navigate('/')
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const consultationSection = document.getElementById('consultation')
      if (consultationSection) {
        consultationSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 100)
  }

  return (
    <Layout>
      <div
        className={clsx(
          'min-h-screen pt-30 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300',
          mode === 'dark'
            ? 'bg-linear-to-r from-black to-gray-900 text-white'
            : 'bg-gradient-to-br from-white via-cyan-50 to-cyan-100',
        )}
      >
        <div className="max-w-screen-xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className={clsx(
                'flex cursor-pointer items-center gap-2 transition-colors duration-200',
                mode === 'dark'
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : 'text-cyan-600 hover:text-cyan-800',
              )}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Назад</span>
            </button>
          </div>

          {/* Page Title */}
          <header className="text-center mb-12">
            <h1
              className={clsx(
                'text-3xl sm:text-5xl font-bold uppercase font-sans bg-clip-text mb-4',
                mode === 'dark'
                  ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
                  : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
              )}
            >
              Результаты наших пациентов
            </h1>
            <p
              className={clsx(
                'text-lg sm:text-xl max-w-3xl mx-auto',
                mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
              )}
            >
              Галерея успешных лечений. Каждый случай демонстрирует профессиональный подход и
              высокое качество наших услуг.
            </p>
          </header>

          {/* Videos moved to dedicated /videos page */}

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {detailedClientResults.map((item) => (
              <div
                key={item.id}
                className={clsx(
                  'group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300',
                  mode === 'dark' ? 'bg-gray-800' : 'bg-white',
                )}
              >
                {/* Before/After Images Container */}
                <div className="relative h-80 sm:h-96">
                  {/* Before Image */}
                  <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
                    <img
                      src={item.before}
                      alt={`До лечения - ${item.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-black/40 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ДО
                    </div>
                  </div>
                  {/* After Image */}
                  <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
                    <img
                      src={item.after}
                      alt={`После лечения - ${item.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-black/40 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ПОСЛЕ
                    </div>
                  </div>
                  {/* Divider Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-white transform -translate-y-1/2 z-10 shadow-md"></div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className={clsx(
                      'text-xl font-bold mb-3 transition-colors duration-200',
                      mode === 'dark'
                        ? 'text-white group-hover:text-cyan-400'
                        : 'text-gray-800 group-hover:text-cyan-700',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={clsx(
                      'text-sm leading-relaxed mb-4',
                      mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
                    )}
                  >
                    {item.description}
                  </p>

                  {/* Patient Info */}
                  <div
                    className={clsx(
                      'flex justify-between items-center pt-3 border-t',
                      mode === 'dark' ? 'border-gray-700' : 'border-gray-100',
                    )}
                  >
                    <div
                      className={clsx(
                        'text-xs',
                        mode === 'dark' ? 'text-gray-400' : 'text-gray-500',
                      )}
                    >
                      <span className="font-semibold">Возраст:</span> {item.patientAge}
                    </div>
                    <div
                      className={clsx(
                        'text-xs',
                        mode === 'dark' ? 'text-gray-400' : 'text-gray-500',
                      )}
                    >
                      <span className="font-semibold">Срок:</span> {item.treatmentDuration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div
              className={clsx(
                'backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto',
                mode === 'dark' ? 'bg-gray-800/80' : 'bg-white/80',
              )}
            >
              <h3
                className={clsx(
                  'text-2xl font-bold mb-4',
                  mode === 'dark' ? 'text-white' : 'text-gray-800',
                )}
              >
                Хотите такой же результат?
              </h3>
              <p
                className={clsx('mb-6', mode === 'dark' ? 'text-gray-300' : 'text-gray-600')}
              >
                Запишитесь и начните путь к здоровой и красивой улыбке уже сегодня
              </p>
              <button
                onClick={handleConsultationClick}
                className={clsx(
                  'relative cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 py-3 px-8 rounded-full font-semibold group transform hover:scale-105',
                  mode === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gradient-to-r from-cyan-200 to-cyan-500 text-white',
                )}
              >
                <span className="relative z-10">Записаться</span>
                {mode !== 'dark' && (
                  <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ClientResultsPage
