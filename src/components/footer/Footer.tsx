import React from 'react'
import { FaInstagram, FaTelegramPlane, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Link as ScrollLink } from 'react-scroll'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const Footer: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isInProjectsPage = location.pathname.includes('project')
  const isHomePage = location.pathname === '/'
  const mode = useSelector((state: any) => state.theme.mode)

  return (
    <footer
      className={clsx(
        'w-full px-6 py-8 md:px-10 md:py-10 transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-[#0e232b] text-white',
      )}
    >
      <section className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10">
        <div className="w-full max-w-md flex flex-col space-y-4 md:space-y-6 order-1 md:order-none">
          {isInProjectsPage ? (
            <Link to="/" aria-label="Homepage">
              <img
                src="https://res.cloudinary.com/dxfqf6fgv/image/upload/v1746817593/script_oyyrxy.png"
                alt="Logo"
                width={80}
                className="cursor-pointer"
              />
            </Link>
          ) : isHomePage ? (
            <ScrollLink
              to="navbar"
              smooth={true}
              duration={500}
              className="cursor-pointer flex items-center gap-2"
            >
              <img
                src="https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754241363/reccomendations/k2s4gzbn76tgozvhjvz2.png"
                alt="Dr. Vardanyan Logo"
                width={50}
                height={50}
                className={clsx('transition-transform duration-300 group-hover:rotate-6')}
              />
              <span
                style={{ fontFamily: '"Parisienne", cursive' }}
                className="text-2xl font-bold bg-gradient-to-r from-[#2af1f4] via-[#0284e4] to-[#2af1f4] text-transparent bg-clip-text transition-all duration-300"
              >
                Dr. Vardanyan
              </span>
            </ScrollLink>
          ) : (
            <button
              onClick={() => {
                navigate('/')
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo(0, 0)
                }, 100)
              }}
              className="cursor-pointer flex items-center gap-2"
              aria-label="Homepage"
            >
              <img
                src="https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754241363/reccomendations/k2s4gzbn76tgozvhjvz2.png"
                alt="Dr. Vardanyan Logo"
                width={50}
                height={50}
                className={clsx('transition-transform duration-300 group-hover:rotate-6')}
              />
              <span
                style={{ fontFamily: '"Parisienne", cursive' }}
                className="text-2xl font-bold bg-gradient-to-r from-[#2af1f4] via-[#0284e4] to-[#2af1f4] text-transparent bg-clip-text transition-all duration-300"
              >
                Dr. Vardanyan
              </span>
            </button>
          )}
          <p className={clsx('text-sm', mode === 'dark' ? 'text-gray-400' : 'text-silver')}>
            Профессиональная платформа для представления стоматологических услуг, связи с пациентами
            и записи на приём.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-center gap-4 order-3 md:order-none w-full md:w-auto mt-4 md:mt-0">
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/vahan_2906"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'p-3 border rounded-lg transition-colors',
                mode === 'dark'
                  ? 'border-gray-600 hover:bg-gray-800'
                  : 'border-gray-600 hover:bg-gray-800',
              )}
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://t.me/Vahan970"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'p-3 border rounded-lg transition-colors',
                mode === 'dark'
                  ? 'border-gray-600 hover:bg-gray-800'
                  : 'border-gray-600 hover:bg-gray-800',
              )}
              aria-label="Telegram"
            >
              <FaTelegramPlane size={20} />
            </a>
            <a
              href="https://wa.me/37433140102"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'p-3 border rounded-lg transition-colors',
                mode === 'dark'
                  ? 'border-gray-600 hover:bg-gray-800'
                  : 'border-gray-600 hover:bg-gray-800',
              )}
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
          {isHomePage ? (
            <ScrollLink
              to="consultation"
              smooth={true}
              duration={500}
              className="cursor-pointer flex items-center gap-2"
            >
              <button
                type="submit"
                className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer text-sm px-5 py-3 md:px-6 text-white font-semibold bg-gradient-to-r from-cyan-300 to-cyan-600 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 group"
              >
                Записаться на приём
                <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              </button>
            </ScrollLink>
          ) : (
            <button
              onClick={() => {
                navigate('/')
                // Use setTimeout to ensure navigation completes before scrolling
                setTimeout(() => {
                  const consultationSection = document.getElementById('consultation')
                  if (consultationSection) {
                    consultationSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }
                }, 100)
              }}
              type="submit"
              className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer text-sm px-5 py-3 md:px-6 text-white font-semibold bg-gradient-to-r from-cyan-300 to-cyan-600 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 group"
            >
              Записаться на приём
              <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            </button>
          )}
        </div>

        <address className="not-italic flex flex-col items-start md:items-end order-2 md:order-none w-full md:w-auto">
          <ul className="flex flex-col items-start md:items-end space-y-1 md:space-y-2 text-sm md:text-base">
            <li
              className={clsx(
                'flex items-center gap-2',
                mode === 'dark' ? 'text-gray-400' : 'text-silver',
              )}
            >
              <FaPhone className="text-cyan-400" />
              <a href="tel:+79101660102" className="hover:underline">
                +7 (910) 166-01-02
              </a>
            </li>
            <li
              className={clsx(
                'flex items-center gap-2',
                mode === 'dark' ? 'text-gray-400' : 'text-silver',
              )}
            >
              <FaPhone className="text-cyan-400" />
              <a href="tel:+37433140102" className="hover:underline">
                + (374) 33-140-102
              </a>
            </li>
            <li
              className={clsx(
                'flex items-center gap-2',
                mode === 'dark' ? 'text-gray-400' : 'text-silver',
              )}
            >
              <FaEnvelope className="text-cyan-400" />
              <a href="mailto:vahan.vardanyan.97@bk.ru" className="hover:underline">
                vahan.vardanyan.97@bk.ru
              </a>
            </li>
          </ul>
        </address>
      </section>

      <div
        className={clsx(
          'w-full mt-6 border-t pt-4 text-center md:text-right text-xs',
          mode === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-600 text-gray-400',
        )}
      >
        © {new Date().getFullYear()} Dr. Vardanyan. Все права защищены.
      </div>
    </footer>
  )
}

export default Footer
