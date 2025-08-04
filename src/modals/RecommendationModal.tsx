import React, { FC, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaStar, FaUpload } from 'react-icons/fa'
import { useCreateRecommendationsMutation } from '~/app/recommendations/recommendations.api'
import { Base64 } from '~/hooks/Base64'
import { recommendationFormSchema, RecommendationFormSchema } from './utils/validations'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoClose } from 'react-icons/io5'
import { sendToBot } from '~/app/api'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const RecommendationModal: FC<Props> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [image, setImage] = useState<any>('')
  const [createRecommendation, { isLoading }] = useCreateRecommendationsMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RecommendationFormSchema>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      fullName: '',
      recommendation: '',
      stars: 0,
      image: undefined,
    },
  })

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const base64 = await Base64(file)
    setImage(base64)
  }

  const getErrorText = (message: string) => {
    const errorTexts: { [key: string]: string } = {
      'Full name is required.': 'Полное имя обязательно.',
      'Recommendation text is required.': 'Текст отзыва обязателен.',
      'Please select a rating.': 'Пожалуйста, выберите оценку.',
      'Recommendation cannot be longer than 300 characters.':
        'Отзыв не может быть длиннее 300 символов.',
      'Full name cannot be longer than 40 characters.':
        'Полное имя не может быть длиннее 40 символов.',
    }
    return errorTexts[message] || message
  }

  const onSubmit = (data: RecommendationFormSchema) => {
    createRecommendation({ ...data, image })
      .unwrap()
      .then(async () => {
        await sendToBot(data?.fullName)

        toast.success('Отзыв успешно отправлен!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          style: {
            background: '#00b8db',
          },
        })
        reset()
        onClose()
      })
      .catch((error) => {
        console.error('Error submitting form', error)
        toast.error('Что-то пошло не так. Пожалуйста, попробуйте еще раз.', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      })
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      reset()
      onClose()
    }
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 animate-fade-in"
      >
        <span className="flex justify-center w-full">
          <h2 className="text-2xl inline-block text-center font-bold mb-8 font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text">
            Оставить отзыв
          </h2>
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-gray-700 text-sm md:text-base"
        >
          <div>
            <label className="block mb-1 font-medium">Полное имя</label>
            <input
              {...register('fullName')}
              className="w-full rounded-2xl px-4 py-2 border border-gray-300 shadow-inner focus:outline-none focus:ring-1 focus:ring-cyan-300 transition-all duration-300 placeholder:italic placeholder:text-gray-400"
            />
            {errors.fullName && (
              <p className="text-red-500 mt-1">{getErrorText(errors.fullName.message!)}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Текст отзыва</label>
            <textarea
              {...register('recommendation')}
              className="w-full h-28 resize-none rounded-2xl px-4 py-2 border border-gray-300 shadow-inner focus:outline-none focus:ring-1 focus:ring-cyan-300 transition-all duration-300 placeholder:italic placeholder:text-gray-400"
            />
            {errors.recommendation && (
              <p className="text-red-500 mt-1">{getErrorText(errors.recommendation.message!)}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Оценка</label>
            <Controller
              name="stars"
              control={control}
              render={({ field }) => (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      className={`cursor-pointer text-2xl transition-all drop-shadow ${
                        field.value >= value ? 'text-yellow-400 scale-110' : 'text-gray-300'
                      }`}
                      onClick={() => field.onChange(value)}
                    />
                  ))}
                </div>
              )}
            />
            {errors.stars && (
              <p className="text-red-500 mt-1">{getErrorText(errors.stars.message!)}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Изображение</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 font-semibold rounded-xl cursor-pointer hover:bg-cyan-200 transition">
                <FaUpload className="text-cyan-600" />
                Загрузить
                <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
              </label>
              {image && (
                <div className="relative h-25 w-25">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-25 w-25 rounded-sm object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    aria-label="Remove image"
                    className="p-0 m-0 cursor-pointer"
                  >
                    <div className="bg-white absolute -top-2 -right-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.4)] p-1 flex items-center justify-center">
                      <IoClose size={17} className="text-gray-600" />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="relative overflow-hidden shadow-lg hover:shadow-2xl duration-300 w-full text-center flex justify-center items-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-200 to-cyan-500 text-white py-3 px-4 rounded-4xl font-semibold transition-all group disabled:opacity-50"
            >
              <span className="relative z-10">
                {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Отправить'}
              </span>
              <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="relative overflow-hidden shadow-lg hover:shadow-2xl duration-300 w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-4xl font-semibold transition-all group"
            >
              <span className="relative z-10">Отмена</span>
              <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
