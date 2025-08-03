import { FC } from 'react'

const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-white to-cyan-200">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4  border-cyan-500" />
    </div>
  )
}

export default Loader
