import { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'
import Slider from 'react-slick'
import { projects } from './utils/constants'
import { Link } from 'react-router-dom'

const Projects = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1140px)' })

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: isMobile ? 1 : 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
    }),
    [isMobile],
  )

  const getProjectText = (key: string) => {
    const projectTexts: { [key: string]: string } = {
      'builderpad_short.title': 'Builderpad',
      'builderpad_short.description':
        'Современный и адаптивный футер для Builderpad, разработанный для улучшения пользовательского опыта и отражения идентичности бренда. Построен с применением передовых принципов дизайна для чистой эстетики и плавной функциональности.',
      'poker_short.title': 'Платформа покерного клуба',
      'poker_short.description':
        'Все-в-одном система управления покерным клубом, включающая отслеживание фишек, статистику игроков, операции кассира и многое другое. Обеспечивает интеграцию и интуитивно понятный интерфейс для эффективного управления клубом.',
      'lottery_short.title': 'Web3 Лотерейная игра',
      'lottery_short.description':
        'Децентрализованная лотерейная платформа, построенная на технологии Web3, обеспечивающая прозрачность и справедливость. Включает смарт-контракты для розыгрышей, блокчейн-генерируемую случайность и безопасные взаимодействия с игроками.',
      'health_short.title': 'Приложение для здоровья',
      'health_short.description':
        'Платформа с удобным интерфейсом, ориентированная на здоровье и благополучие. Приложение предоставляет персонализированный мониторинг физической активности, питания и здоровья, с интуитивно понятными формами и мощной валидацией.',
    }
    return projectTexts[key] || key
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full bg-gradient-to-r from-white to-cyan-200 flex flex-col items-center py-16 px-4 sm:px-6"
    >
      <h2
        id="projects-heading"
        className={`${
          isMobile ? 'text-2xl' : 'text-4xl'
        } sm:text-4xl font-bold mb-12 text-center uppercase font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text`}
      >
        Мои проекты
      </h2>

      <div className="w-full max-w-screen-xl">
        <Slider {...sliderSettings}>
          {projects.map((project) => (
            <article key={project.id} className="px-2" aria-label={getProjectText(project.title)}>
              <Link
                to={`/project/${project.id}`}
                role="link"
                aria-label={`${getProjectText(project.title)} - Показать больше`}
              >
                <div className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 group">
                  <figure className="relative">
                    <img
                      src={project.image}
                      alt={getProjectText(project.title)}
                      className="w-full h-48 object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-105 group-hover:object-center"
                    />
                    <figcaption
                      className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      aria-hidden="true"
                    >
                      Показать больше
                    </figcaption>
                  </figure>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {getProjectText(project.title)}
                    </h3>
                    <p className="text-gray-600 text-sm">{getProjectText(project.description)}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Projects
