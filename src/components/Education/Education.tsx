import Certifications from '../certifications/Certifications'
import { educationList } from './utils/constants'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const Education = () => {
  const mode = useSelector((state: any) => state.theme.mode)
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className={clsx(
        'w-full py-20 px-4 sm:px-6 flex flex-col items-center transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-linear-to-r from-white to-cyan-200 text-black',
      )}
    >
      <h2
        id="education-heading"
        className={clsx(
          'text-center text-2xl sm:text-4xl font-extrabold uppercase font-sans mb-12 sm:mb-16 bg-clip-text',
          mode === 'dark'
            ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
            : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
        )}
      >
        Образование
      </h2>

      <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
        {educationList.map(({ id, university, faculty, startYear, endYear, logo, wallpaper }) => (
          <article
            key={id}
            className={clsx(
              'shadow-md rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-transform hover:shadow-lg',
              mode === 'dark' ? 'bg-gray-800' : 'bg-white',
            )}
            style={{
              backgroundImage: `url(${wallpaper})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="flex flex-col justify-center items-center bg-white/70 rounded-2xl p-4 sm:p-6 w-full h-full text-center">
              <img
                src={logo}
                alt={`${university} logo`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 object-contain"
              />
              <h3
                className={clsx(
                  'text-lg sm:text-2xl font-semibold',
                  mode === 'dark' ? 'text-white' : 'text-gray-800',
                )}
              >
                {university}
              </h3>
              {faculty && (
                <p
                  className={clsx(
                    'text-sm sm:text-base font-medium mt-1',
                    mode === 'dark' ? 'text-cyan-300' : 'text-cyan-700',
                  )}
                >
                  {faculty}
                </p>
              )}
              <time
                className={clsx(
                  'text-xs sm:text-sm mt-2',
                  mode === 'dark' ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {startYear} – {endYear}
              </time>
            </div>
          </article>
        ))}
      </div>

      <div className="w-full mt-16 sm:mt-20">
        <Certifications />
      </div>
    </section>
  )
}

export default Education
