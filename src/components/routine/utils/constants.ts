// Our Working Process images
import img1 from '~/assets/vahan-images/2025-08-08_06.49.24_keseuy.jpg'
import img2 from '~/assets/vahan-images/2025-08-08_06.49.35_xoke3p.jpg'
import img3 from '~/assets/vahan-images/2025-08-08_06.49.13_n8zgny.jpg'
import img4 from '~/assets/vahan-images/istockphoto-1284827806-612x612_jxyufk.jpg'
import beforeImg1 from '~/assets/vahan-images/2025-08-08_08.52.08_uuihxy.jpg'
import afterImg1 from '~/assets/vahan-images/2025-08-08_08.52.12_uvjt1h.jpg'
import beforeImg2 from '~/assets/vahan-images/2025-08-08_09.32.38_lr1muq.jpg'
import afterImg2 from '~/assets/vahan-images/2025-08-08_09.32.45_kouq1y.jpg'
import beforeImg3 from '~/assets/vahan-images/2025-08-08_09.32.58_lmtsqd.jpg'
import afterImg3 from '~/assets/vahan-images/2025-08-08_09.33.02_ln7jly.jpg'
import beforeImg4 from '~/assets/vahan-images/2025-08-09_01.11.41_naozoz.jpg'
import afterImg4 from '~/assets/vahan-images/2025-08-09_01.11.32_cm0bsh.jpg'

export const routineImages = [
  {
    id: 1,
    image: img1,
    title: 'Первичная консультация',
    description: 'Детальный осмотр  и планирование лечения',
  },
  {
    id: 2,
    image: img2,
    title: 'Диагностика',
    description: 'Использование современного диагностического оборудования',
  },
  {
    id: 3,
    image: img3,
    title: 'Лечебные процедуры',
    description: 'Профессиональное лечение',
  },
  {
    id: 4,
    image: img4,
    title: 'Завершение дня',
    description: 'Обработка и стерилизация оборудования после приема',
  },
]

// Extended images for the detailed working process page
export const detailedRoutineImages = [...routineImages]

// Client Before/After Results (без имплантации и ортодонтии)
export const clientResults = [
  {
    id: 1,
    before: beforeImg1,
    after: afterImg1,
    title: 'Протезирование',
    description: 'Профессиональная установка мостовидного протеза',
    patientAge: '32 года',
    treatmentDuration: '1 процедура',
  },
  {
    id: 2,
    before: beforeImg2,
    after: afterImg2,
    title: 'Установка виниров',
    description: 'Керамические виниры E-max',
    patientAge: '35 лет',
    treatmentDuration: '3 недели',
  },
  {
    id: 3,
    before: beforeImg3,
    after: afterImg3,
    title: 'Реставрация зубов',
    description: 'Композитная реставрация',
    patientAge: '29 лет',
    treatmentDuration: '2 месяца',
  },
  {
    id: 4,
    before: beforeImg4,
    after: afterImg4,
    title: 'Отбеливание зубов',
    description: 'Композитная реставрация',
    patientAge: '25 лет',
    treatmentDuration: '1 процедура',
  },
]

// Extended client results for detailed page
export const detailedClientResults = [...clientResults]
