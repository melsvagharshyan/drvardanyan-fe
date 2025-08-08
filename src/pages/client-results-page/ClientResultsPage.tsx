import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { detailedClientResults } from '~/components/routine/utils/constants'
import Layout from '~/components/layout/Layout'
import { useEffect } from 'react'

const ClientResultsPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBack = () => {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/')
  }

  return (
    <Layout>
      <div className="min-h-screen pt-30 bg-gradient-to-br from-white via-green-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className="flex cursor-pointer items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Назад</span>
            </button>
          </div>

          {/* Page Title */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold uppercase font-sans bg-gradient-to-r from-green-500 via-green-800 to-green-500 text-transparent bg-clip-text mb-4">
              Результаты наших пациентов
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              Галерея успешных лечений в клинике Варданян. Каждый случай демонстрирует 
              профессиональный подход и высокое качество наших услуг.
            </p>
          </header>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {detailedClientResults.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
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
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                  
                  {/* Patient Info */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold">Возраст:</span> {item.patientAge}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold">Срок:</span> {item.treatmentDuration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics Section */}
          <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Статистика успешных лечений
              </h3>
              <p className="text-gray-600">
                Наши достижения говорят сами за себя
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Успешных случаев</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Довольных пациентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Видов лечения</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Хотите такой же результат?
              </h3>
              <p className="text-gray-600 mb-6">
                Запишитесь на консультацию и начните путь к здоровой и красивой улыбке уже сегодня
              </p>
              <button
                onClick={handleBack}
                className="relative cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-green-200 to-green-500 text-white py-3 px-8 rounded-full font-semibold group transform hover:scale-105"
              >
                <span className="relative z-10">Записаться на консультацию</span>
                <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ClientResultsPage
