import { educationList } from './utils/constants'
import Certifications from '../certifications/Certifications'

const Education = () => {
  const getEducationText = (key: string) => {
    const educationTexts: { [key: string]: string } = {
      'education.title': 'Образование',
      'education.university_1':
        'Ереванский государственный медицинский университет им. Мхитара Гераци',
      'education.faculty_1': 'Бакалавриат, Стоматологический факультет',
      'education.startYear_1': '2019',
      'education.endYear_1': '2023',
      'education.university_2':
        'Ереванский государственный медицинский университет им. Мхитара Гераци',
      'education.faculty_2': 'Бакалавриат, Факультет информационных технологий',
      'education.startYear_2': '2024',
      'education.endYear_2': 'Настоящее время',
    }
    return educationTexts[key] || key
  }

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="w-full bg-gradient-to-r from-white to-cyan-200 py-20 px-4 sm:px-6 flex flex-col items-center"
    >
      <h2
        id="education-heading"
        className="text-center text-2xl sm:text-4xl font-extrabold uppercase font-sans mb-12 sm:mb-16 bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text"
      >
        Образование
      </h2>

      <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
        {educationList.map(({ id, logo, university, faculty, startYear, endYear }) => (
          <article
            key={id}
            className="bg-white shadow-md rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-transform hover:shadow-lg"
          >
            <img
              src={logo}
              alt={`${getEducationText(university)} logo`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 object-contain"
            />
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800">
              {getEducationText(university)}
            </h3>
            {faculty && (
              <p className="text-sm sm:text-base text-cyan-700 font-medium mt-1">
                {getEducationText(faculty)}
              </p>
            )}
            <time className="text-xs sm:text-sm text-gray-500 mt-2">
              {getEducationText(startYear)} – {getEducationText(endYear)}
            </time>
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
