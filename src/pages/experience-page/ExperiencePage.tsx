import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { GlassButton } from '~/components/glass-button/GlassButton'

const ExperiencePage = () => {
  const { companyId } = useParams()
  const navigate = useNavigate()

  const experiences = [
    {
      companyId: 'creatixtechnologies',
      jobTitle: 'Старший фронтенд‑разработчик',
      company: 'Creatix Technologies',
      duration: '2023 – 2025',
      intro:
        'Руководил архитектурой и поставкой фронтенда в кросс‑функциональных командах, внедряя лучшие практики современного React, управления состоянием и дизайн‑систем. Специализировался на масштабируемых корпоративных приложениях и интерактивных платформах в реальном времени.',
      logo: 'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1746819487/creatix_technologies_logo_n4lijw.jpg',
      projects: [
        {
          title: '📈 Платформа взаимодействия с продажами и управления лидами',
          descriptions: [
            'Разрабатывал сложные UI‑дашборды с React 18, TypeScript, Zustand и Ant Design.',
            'Интегрировал RTK Query для получения данных с продвинутым кэшированием и автоматической повторной валидацией.',
            'Реализовал рабочие процессы с большим количеством форм через React Hook Form и Zod с типобезопасной валидацией.',
            'Вносил вклад в backend на NestJS с GraphQL‑резолверами и интеграцией фронтенда через Apollo Client.',
          ],
        },
        {
          title: '🚧 Платформа управления проектами для строителей',
          descriptions: [
            'Создал collaborative tool для управления задачами, счетами и документами.',
            'Использовал Material UI (MUI v5), React Query и Redux Toolkit для масштабируемого взаимодействия с данными и кеширования.',
            'Добавил offline‑first возможности через синхронизацию localStorage и service workers (Workbox).',
            'Применил модульную монорепозиторную структуру с Nx для совместного использования компонентов.',
          ],
        },
        {
          title: '🏥 Health Engagement Network',
          descriptions: [
            'Разработал пациентские дашборды с метриками здоровья в реальном времени, отслеживанием состояний и планированием приёмов.',
            'Реализовал ленивую загрузку больших данных через React Suspense и разделение кода через React.lazy.',
            'Оптимизировал backend-вызовы с batch-запросами и серверным кешированием через RTK Query и Apollo Federation.',
            'Использовал Ant Design Pro для админ‑панелей и создавал повторно используемые дизайн‑токены с Less‑переменными.',
          ],
        },
      ],
    },
    {
      companyId: 'digitainarmenia',
      jobTitle: 'React.js‑разработчик',
      company: 'Digitain Armenia',
      duration: '2021 – 2023',
      intro:
        'Специализировался на разработке децентрализованных игровых платформ с поддержкой реального времени: WebSocket, блокчейн‑кошельки и frontend‑микросервисы.',
      logo: 'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1749407645/images_rniggp.png',
      projects: [
        {
          title: '🃏 Club Poker',
          descriptions: [
            'Создавал переиспользуемые настраиваемые компоненты с Tailwind CSS и Headless UI.',
            'Реализовал синхронизацию в реальном времени через WebSocket с пользовательскими хуками для событий и анимаций.',
            'Обеспечил безопасную аутентификацию игроков через Wagmi, WalletConnect v2 и разрешение ENS‑имён.',
            'Использовал React Performance Profiler и технику мемоизации для снижения затрат рендеринга в сложных игровых комнатах.',
          ],
        },
        {
          title: '🎲 Децентрализованная лотерейная платформа',
          descriptions: [
            'Интегрировал Ethers.js для взаимодействия с Ethereum–смарт‑контрактами для покупки билетов и проверки победителей.',
            'Разработал интерфейс транзакций blockchain с обратной связью в реальном времени и поддержкой MetaMask‑onboarding.',
            'Использовал Jotai для глобального состояния между модулями кошелька и транзакций.',
            'Настроил end‑to‑end тестирование через Cypress с замокированными данными блокчейна.',
          ],
        },
      ],
    },
    {
      companyId: 'beeweb',
      jobTitle: 'Инженер Front‑End',
      company: 'BeeWeb',
      duration: '2018 – 2023',
      intro:
        'Вносил вклад в проекты в сфере wellness и аналитики с акцентом на производительность, доступность и визуализацию данных в реальном времени.',
      logo: 'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1749407645/images_1_qo8syg.png',
      projects: [
        {
          title: '🧘 Wellnest (приложение для здоровья и ментального благополучия)',
          descriptions: [
            'Разрабатывал пользовательские wellness‑функции с React.js, MobX и семантическим HTML.',
            'Создавал доступные формы и оценки психического здоровья через react‑hook‑form, Zod и ARIA‑практики.',
            'Применял SWR для отслеживания настроения в реальном времени и оптимистичных UI‑обновлений.',
            'Интегрировал Storybook и Chromatic для компонентного развития и визуального регрессионного тестирования.',
          ],
        },
        {
          title: '📊 PixelPilot (платформа аналитики игрового процесса в реальном времени)',
          descriptions: [
            'Создавал адаптивные realtime‑дашборды с Ant Design Pro, React Virtualized и ECharts.',
            'Передавал телеметрию через Recoil и Socket.IO для точных и быстрых обновлений.',
            'Проектировал frontend‑модули для визуализации A/B‑тестов и анализа сессий.',
            'Применял мониторинг Web Vitals с Lighthouse CI и логированием пользовательского поведения.',
          ],
        },
      ],
    },
  ]

  const experience = experiences.find(
    (exp) => exp.companyId.toLowerCase() === companyId?.toLowerCase(),
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  if (!experience) {
    return (
      <main className="p-8 text-center">
        <p className="text-lg font-semibold text-red-600">Опыт не найден</p>
        <GlassButton onClick={handleBack} label="Назад" direction="left" />
      </main>
    )
  }

  return (
    <main className="w-full bg-gradient-to-r from-white to-cyan-200 py-6 sm:py-10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <nav aria-label="Back navigation">
          <GlassButton onClick={handleBack} label="Назад" direction="left" />
        </nav>

        <section
          aria-labelledby="experience-heading"
          className="mt-6 sm:mt-10 bg-white rounded-2xl font-light sm:rounded-3xl shadow-xl px-4 py-6 sm:p-10"
        >
          <header className="flex flex-col items-center text-center">
            <img
              src={experience.logo || 'defaultLogo.png'}
              alt={`${experience.company} Logo`}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-contain mb-4"
            />
            <h1 id="experience-heading" className="text-2xl sm:text-3xl font-bold text-gray-800">
              {experience.jobTitle}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">{experience.company}</p>
            <p className="text-sm sm:text-md text-gray-500 mt-1">{experience.duration}</p>
          </header>

          <article className="mt-6 sm:mt-10 text-gray-700 space-y-6 text-sm sm:text-base">
            <p>{experience.intro}</p>

            {experience.projects?.map((project, i) => (
              <section key={i} aria-labelledby={`project-${i}-title`}>
                <h2 id={`project-${i}-title`} className="text-lg sm:text-xl font-semibold mb-2">
                  {project.title}
                </h2>
                {project.descriptions.map((desc, j) => (
                  <p key={j} className={j > 0 ? 'mt-2' : ''}>
                    {desc}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </section>
      </div>
    </main>
  )
}

export default ExperiencePage
