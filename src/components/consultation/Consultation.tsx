import React from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FiCalendar } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useSubmitConsultationMutation } from '~/app/messages/messages.api'
import { formSchema, TFormValues } from './utils/validation'

const Consultation: React.FC = () => {
  const methods = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      convenientTime: '',
    },
    mode: 'onSubmit',
  })

  const { handleSubmit, control, reset } = methods
  const [submitConsultation, { isLoading }] = useSubmitConsultationMutation()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const onSubmit = async (data: TFormValues) => {
    try {
      await submitConsultation(data).unwrap()
      reset()
      toast.success('Заявка успешно отправлена!', {
        position: 'top-center',
        autoClose: 1500,
        theme: 'colored',
        style: { background: '#00b8db' },
      })
    } catch (error) {
      console.error('Ошибка при отправке формы', error)
      toast.error('Ошибка при отправке заявки. Попробуйте ещё раз.', {
        position: 'top-center',
        autoClose: 1500,
        theme: 'colored',
      })
    }
  }

  return (
    <div
      className="py-24 px-4 w-full bg-gradient-to-r from-white to-cyan-200 text-center"
      id="consultation"
      style={{
        backgroundImage: `url(https://i.pinimg.com/1200x/92/52/b5/9252b5facbc66db4562305a50e8e1736.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-10 bg-white/80 text-center rounded-2xl max-w-2xl flex flex-col gap-6 mx-auto"
        >
          <div className="flex justify-center items-center gap-2 md:gap-3">
            <h2
              className={`${
                isMobile ? 'text-2xl' : 'text-4xl'
              } font-bold mb-6 font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text`}
            >
              Запись на консультацию
            </h2>
          </div>

          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full text-sm md:text-base text-gray-500 px-5 py-3 md:px-6 md:py-4 bg-white/60 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-cyan-400 shadow-sm placeholder-gray-500"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* Phone Number */}
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <input
                  {...field}
                  type="tel"
                  placeholder="Номер телефона"
                  className="w-full text-sm md:text-base text-gray-500 px-5 py-3 md:px-6 md:py-4 bg-white/60 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-cyan-400 shadow-sm placeholder-gray-500"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* Convenient Time (Date Picker) */}
          <Controller
            name="convenientTime"
            control={control}
            render={({ field, fieldState }) => (
              <div className="relative cursor-pointer">
                <label className="block text-left text-gray-600 text-sm mb-2">
                  Удобное время для звонка стоматолога
                </label>
                <input
                  {...field}
                  type="datetime-local"
                  className="cursor-pointer w-full appearance-none text-sm md:text-base text-gray-500 px-5 py-3 md:px-6 md:py-4 bg-white/60 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-cyan-400 shadow-sm placeholder-gray-400 pr-12"
                  placeholder="Выберите дату и время"
                />
                {isMobile && (
                  <FiCalendar className="absolute right-4 top-[68%] -translate-y-1/2 text-gray-500 pointer-events-none" />
                )}
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer text-sm md:text-lg px-5 py-3 md:px-6 md:py-4 text-white font-semibold bg-gradient-to-r from-cyan-200 to-cyan-500 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 group"
          >
            <span className="relative z-10">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                'Отправить заявку'
              )}
            </span>
            <span className="absolute left-0 top-0 h-full w-full transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Consultation
