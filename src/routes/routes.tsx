// routes.tsx
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import Header from '~/components/header/Header'
import About from '~/components/about/About'
import Recommendations from '~/components/recommendations/Recommendations'
import Education from '~/components/Education/Education'
import Appointment from '~/components/consultation/Consultation'
import Routine from '~/components/routine/Routine'

// Lazy load pages

// const ProjectPage = lazy(() => import('~/pages/project-page/ProjectPage'))
const ExperiencePage = lazy(() => import('~/pages/experience-page/ExperiencePage'))
const RoutinePage = lazy(() => import('~/pages/routine-page/RoutinePage'))
const ClientResultsPage = lazy(() => import('~/pages/client-results-page/ClientResultsPage'))
const NotFoundPage = lazy(() => import('~/pages/404/Page404'))

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <About />
        {/* <Projects /> */}
        <Education />
        <Recommendations />
        <Appointment />
        <Routine />
      </>
    ),
  },
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
    path: '*',
    element: <NotFoundPage />,
  },
]
