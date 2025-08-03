import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { projects } from './utils/constants'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from 'react-responsive'
import NotFoundPage from '../404/Page404'
import { GlassButton } from '~/components/glass-button/GlassButton'

const SingleProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isMobile = useMediaQuery({ query: '(max-width: 1140px)' })

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: isMobile ? 1 : 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      arrows: false,
      appendDots: (dots: React.ReactNode) => (
        <div className="mt-6">
          <ul className="flex justify-center gap-2" aria-label="Gallery navigation dots">
            {dots}
          </ul>
        </div>
      ),
    }),
    [isMobile],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const project = projects.find((p) => p.id === id)

  if (!project) {
    return <NotFoundPage />
  }

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const getProjectText = (key: string) => {
    const projectTexts: { [key: string]: string } = {
      'builderpad_long.title': 'Builderpad',
      'builderpad_long.description':
        'BuilderPad — это современное программное обеспечение для управления строительством, разработанное специально для застройщиков и подрядчиков, работающих с жилыми объектами. Оно упрощает процесс строительства благодаря интуитивно понятным инструментам для планирования, выбора материалов, коммуникации и документооборота, обеспечивая завершение проектов в срок и в рамках бюджета. С BuilderPad пользователи могут уверенно управлять каждой фазой строительства с помощью списков, календарей и диаграмм Ганта, которые придают структуру и ясность их графикам. Платформа упрощает управление выбором, предлагая новый подход к организации вариантов и получению одобрений от клиентов. Коммуникация централизована через ленту активности, где собираются обновления и обсуждения между командами и клиентами. Все важные проектные файлы — такие как контракты, сметы, планы, выборки и разрешения — можно безопасно хранить и получать к ним доступ в «файловом шкафу». BuilderPad также позволяет детально документировать процесс на стройплощадке, фиксируя фото и видео с автоматическими временными метками и геолокацией, что обеспечивает проверяемое подтверждение прогресса. Кроме того, мобильное приложение для iOS и Android позволяет командам на местах легко публиковать обновления, загружать медиафайлы и оставаться на связи в режиме реального времени.',
      'poker_long.title': 'Платформа для покер-клуба',
      'poker_long.description':
        'Универсальная система управления, разработанная специально для покерных клубов. Обеспечивает отслеживание фишек в реальном времени, аналитику эффективности игроков, сверку кассового баланса и безопасную регистрацию перемещений участников. Построена с упором на скорость, отзывчивость и удобство администрирования с использованием продвинутого управления состоянием и модульной архитектуры.',
      'lottery_long.title': 'Игра в лотерею Web3',
      'lottery_long.description':
        'Лотерея на основе блокчейна, использующая смарт-контракты Ethereum для автоматических и честных розыгрышей. Возможности включают подключение кошелька через MetaMask, динамическую покупку билетов, обратную связь при взаимодействии со смарт-контрактами и отображение результатов в реальном времени с соблюдением принципов децентрализации.',
      'health_long.title': 'Приложение для здоровья и благополучия',
      'health_long.description':
        'Приложение, ориентированное на здоровье, способствует благополучию пользователей с помощью ведения дневника, отслеживания настроения и персонализированных рекомендаций. Дизайн с приоритетом доступности, полностью адаптивный интерфейс, строгая логика валидации и переиспользуемые компоненты форм делают его надежным и масштабируемым решением.',
    }
    return projectTexts[key] || key
  }

  return (
    <main className="w-full bg-gradient-to-br from-white to-cyan-100 py-10 sm:py-14 min-h-screen font-light">
      <section className="max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="project-title">
        <GlassButton onClick={handleBack} label="Назад" direction="left" />
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <header className="relative">
            <img
              src={project.image}
              alt={getProjectText(project.title)}
              className="w-full max-h-[280px] sm:max-h-[400px] lg:max-h-[500px] object-cover brightness-95 hover:brightness-100 transition duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 sm:px-6 py-3 sm:py-5 text-white">
              <h1 id="project-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {getProjectText(project.title)}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg mt-1">
                {project.year} • {project.role}
              </p>
            </div>
          </header>

          <section className="p-4 sm:p-6 lg:p-10 mb-10" aria-label="Детали проекта">
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-light">
              {getProjectText(project.description)}
            </p>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg">
              <section aria-labelledby="tech-used">
                <h2 id="tech-used" className="font-semibold text-cyan-800 mb-2">
                  Используемые технологии:
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 bg-cyan-50 py-1.5 text-xs sm:text-sm font-medium text-gray-800 border-1 border-cyan-100 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section aria-labelledby="role">
                <h2 id="role" className="font-semibold text-cyan-800 mb-1">
                  Роль:
                </h2>
                <p className="text-gray-600">{project.role}</p>
              </section>

              <section aria-labelledby="year">
                <h2 id="year" className="font-semibold text-cyan-800 mb-1">
                  Год:
                </h2>
                <p className="text-gray-600">{project.year}</p>
              </section>
            </div>

            {project.gallery.length > 0 && (
              <section className="mt-8 sm:mt-10" aria-labelledby="gallery">
                <h2
                  id="gallery"
                  className="font-semibold text-cyan-800 mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl"
                >
                  Галерея:
                </h2>
                <Slider {...sliderSettings}>
                  {project.gallery.map((img, index) => (
                    <div key={index} className="px-2 sm:px-3 outline-none">
                      <motion.img
                        src={img}
                        alt={`${getProjectText(project.title)} - screenshot ${index + 1}`}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl shadow-md object-cover w-full h-44 sm:h-64 md:h-52 lg:h-[300px] transition duration-300 select-none"
                      />
                    </div>
                  ))}
                </Slider>
              </section>
            )}
          </section>
        </motion.article>
      </section>
    </main>
  )
}

export default SingleProjectPage
