import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { detailedRoutineImages } from '~/components/routine/utils/constants'
import Layout from '~/components/layout/Layout'
import { useEffect } from 'react'

const RoutinePage = () => {
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
      <div className="min-h-screen pt-30 bg-gradient-to-br from-white via-cyan-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className="flex cursor-pointer items-center gap-2 text-cyan-600 hover:text-cyan-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Назад</span>
            </button>
          </div>

          {/* Page Title */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text mb-4">
              Наш рабочий процесс
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              Детальный обзор профессиональных стандартов и методик современной стоматологии. Каждый
              этап работы соответствует международным протоколам для обеспечения высочайшего
              качества лечения.
            </p>
          </header>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {detailedRoutineImages.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-cyan-700 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default RoutinePage
