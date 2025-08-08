// Our Routine images - you can replace these URLs with your actual clinic images
export const routineImages = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661285/vahan/2025-08-08_06.49.13_n8zgny.jpg',
    title: 'Утренняя подготовка',
    description: 'Подготовка рабочего места',
  },
  {
    id: 2,
    image:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661285/vahan/2025-08-08_06.49.24_keseuy.jpg',
    title: 'Консультация пациента',
    description: 'Детальный осмотр и консультация',
  },
  {
    id: 3,
    image:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661287/vahan/2025-08-08_06.49.57_azze6v.jpg',
    title: 'Современное оборудование',
    description: 'Использование передовых технологий',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop&crop=center',
    title: 'Лечебные процедуры',
    description: 'Профессиональное лечение',
  },
]

// Extended images for the detailed routine page
export const detailedRoutineImages = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661285/vahan/2025-08-08_06.49.24_keseuy.jpg',
    title: 'Первичная консультация',
    description: 'Детальный осмотр  и планирование лечения',
  },
  {
    id: 2,
    image:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754661286/vahan/2025-08-08_06.49.35_xoke3p.jpg',
    title: 'Диагностика',
    description: 'Использование современного диагностического оборудования',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop&crop=center',
    title: 'Лечебные процедуры',
    description: 'Выполнение терапевтических и хирургических процедур',
  },
  {
    id: 4,
    image:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754665214/vahan/istockphoto-1284827806-612x612_jxyufk.jpg',
    title: 'Завершение дня',
    description: 'Обработка и стерилизация оборудования после приема',
  },
]

// Client Before/After Results
export const clientResults = [
  {
    id: 1,
    before:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754667969/vahan/2025-08-08_08.45.48_tjuevw.jpg',
    after:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754667969/vahan/2025-08-08_08.45.37_oeyrnh.jpg',
    title: 'Коррекция прикуса',
    description: 'Результат 12-месячного лечения',
    patientAge: '28 лет',
    treatmentDuration: '12 месяцев',
  },
  {
    id: 2,
    before:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754668373/vahan/2025-08-08_08.52.08_uuihxy.jpg',
    after:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754668379/vahan/2025-08-08_08.52.12_uvjt1h.jpg',
    title: 'Отбеливание зубов',
    description: 'Профессиональное отбеливание ZOOM',
    patientAge: '32 года',
    treatmentDuration: '1 процедура',
  },
  {
    id: 3,
    before:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754670811/vahan/2025-08-08_09.32.38_lr1muq.jpg',
    after:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754670819/vahan/2025-08-08_09.32.45_kouq1y.jpg',
    title: 'Установка виниров',
    description: 'Керамические виниры E-max',
    patientAge: '35 лет',
    treatmentDuration: '3 недели',
  },
  {
    id: 4,
    before:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754670917/vahan/2025-08-08_09.32.50_vaqjbl.jpg',
    after:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754670925/vahan/2025-08-08_09.32.54_dfofsf.jpg',
    title: 'Имплантация зубов',
    description: 'Восстановление зубного ряда',
    patientAge: '45 лет',
    treatmentDuration: '6 месяцев',
  },
  {
    id: 5,
    before:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754670963/vahan/2025-08-08_09.32.58_lmtsqd.jpg',
    after:
      'https://res.cloudinary.com/dxfqf6fgv/image/upload/v1754670967/vahan/2025-08-08_09.33.02_ln7jly.jpg',
    title: 'Реставрация зубов',
    description: 'Композитная реставрация',
    patientAge: '29 лет',
    treatmentDuration: '2 месяца',
  },
]

// Extended client results for detailed page
export const detailedClientResults = [
  ...clientResults,
  {
    id: 7,
    before:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
    after:
      'https://images.unsplash.com/photo-1594824275771-b79160c0a3e8?w=400&h=400&fit=crop&crop=center',
    title: 'Комплексное лечение',
    description: 'Полная реабилитация полости рта',
    patientAge: '52 года',
    treatmentDuration: '18 месяцев',
  },
  {
    id: 8,
    before:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop&crop=center',
    after:
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop&crop=center',
    title: 'Ортодонтическое лечение',
    description: 'Исправление сложных аномалий',
    patientAge: '24 года',
    treatmentDuration: '24 месяца',
  },
  {
    id: 9,
    before:
      'https://images.unsplash.com/photo-1606811941689-748b84e0ad99?w=400&h=400&fit=crop&crop=center',
    after:
      'https://images.unsplash.com/photo-1594824275771-b79160c0a3e8?w=400&h=400&fit=crop&crop=center',
    title: 'Протезирование',
    description: 'Съемные и несъемные протезы',
    patientAge: '60 лет',
    treatmentDuration: '10 недель',
  },
]
