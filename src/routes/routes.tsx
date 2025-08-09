// routes.tsx
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import Header from '~/components/header/Header'
import About from '~/components/about/About'
import Recommendations from '~/components/recommendations/Recommendations'
import Education from '~/components/Education/Education'
import Appointment from '~/components/consultation/Consultation'
import Routine from '~/components/routine/Routine'
import DentistBusinessCard from '~/components/visit-card/DentistBusinessCard'
import VideoGallery from '~/components/video-gallery/VideoGallery'
import { Link } from 'react-router-dom'
import Licenses from '~/components/certifications/Licenses'
import AddressMap from '~/components/address-map/AddressMap'

// Lazy load pages

// const ProjectPage = lazy(() => import('~/pages/project-page/ProjectPage'))
const ExperiencePage = lazy(() => import('~/pages/experience-page/ExperiencePage'))
const RoutinePage = lazy(() => import('~/pages/routine-page/RoutinePage'))
const ClientResultsPage = lazy(() => import('~/pages/client-results-page/ClientResultsPage'))
const VideosPage = lazy(() => import('~/pages/videos-page/VideosPage'))
const NotFoundPage = lazy(() => import('~/pages/404/Page404'))

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <About />
        <Education />
        <Licenses />
        <section className="w-full bg-gradient-to-r from-white to-cyan-200 py-8">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <VideoGallery
              heading="Видеопортфолио нашей практики"
              description="Короткие профессиональные ролики с примерами процедур и результатами."
              videos={[
                {
                  id: 'v1',
                  url: 'https://res.cloudinary.com/dxfqf6fgv/video/upload/v1754727983/vahan/AQM1Abu-BQ8DnTzEDvsPODuVsBcveFddqj0FVfpXge4Ad7EX-uJWIXhvhpUbCRkRiGAc_qikCCE-t-0oAs0uO3pgjPiKqDzE_2_lhzbt7.mp4',
                  title: 'Профессиональная работа — Видео 1',
                  thumbnail:
                    'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661287/vahan/2025-08-08_06.49.57_azze6v.jpg',
                },
                {
                  id: 'v2',
                  url: 'https://res.cloudinary.com/dxfqf6fgv/video/upload/v1754727977/vahan/AQMT9rElo-QHDaQ2pElU1Pc5wMMeRA-9KAaTUB3aYIeSxGXTPl81JAyVluF-9RpeLJP0QVKT_LjJorRHmoEDvjUXgNcsx62d_arqdaq.mp4',
                  title: 'Профессиональная работа — Видео 2',
                  thumbnail:
                    'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661287/vahan/2025-08-08_06.49.57_azze6v.jpg',
                },
              ]}
            />
            <div className="text-center mt-6">
              <Link
                to="/videos"
                className="inline-block relative cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-cyan-200 to-cyan-500 text-white py-3 px-8 rounded-full font-semibold group transform hover:scale-105"
              >
                <span className="relative z-10">Показать больше</span>
                <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              </Link>
            </div>
          </div>
        </section>
        <Routine />
        <Recommendations />
        <Appointment />
        <AddressMap />
      </>
    ),
  },
  {
    path: '/videos',
    element: <VideosPage />,
  },
  // {
  //   path: '/project/:id',
  //   element: <ProjectPage />,
  // },
  {
    path: '/experience/:companyId',
    element: <ExperiencePage />,
  },
  {
    path: '/routine',
    element: <RoutinePage />,
  },
  {
    path: '/client-results',
    element: <ClientResultsPage />,
  },
  {
    path: '/visit-card',
    element: <DentistBusinessCard />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
