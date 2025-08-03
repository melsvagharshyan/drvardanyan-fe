import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-950 text-cyan-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-cyan-400 drop-shadow-lg animate-pulse">404</h1>
        <p className="mt-4 text-2xl font-semibold text-cyan-200">Страница не найдена</p>
        <p className="mt-2 text-cyan-300">Извините, страница, которую вы ищете, не существует.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 cursor-pointer text-white font-medium transition-all duration-300 shadow-md hover:shadow-cyan-400/50"
        >
          На главную
        </button>
      </div>
    </div>
  )
}
