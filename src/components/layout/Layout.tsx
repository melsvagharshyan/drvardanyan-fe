import { ReactNode } from 'react'
import Navbar from '../navbar/Navbar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
