import React, { useEffect, useMemo } from 'react'
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ChevronDownIcon } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGetAvailabilityQuery, useSubmitConsultationMutation } from '~/app/messages/messages.api'
import { formSchema, TFormValues } from './utils/validation'

const Consultation: React.FC = () => {
  const methods = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      service: 'consultation',
      date: '',
      time: '',
    },
    mode: 'onSubmit',
  })

  const { handleSubmit, control, reset, setValue } = methods
  const [submitConsultation, { isLoading }] = useSubmitConsultationMutation()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const todayStr = useMemo(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }, [])

  const selectedService = useWatch({ control, name: 'service' })
  const selectedDate = useWatch({ control, name: 'date' })

  const {
    data: availability,
    isLoading: isLoadingAvailability,
    refetch,
  } = useGetAvailabilityQuery(
    { date: selectedDate, service: selectedService },
    { skip: !selectedDate || !selectedService },
  )

  const timeOptions = useMemo(() => {
    if (!availability || !selectedDate) return []

    const { availableSlots = [] } = availability

    return availableSlots
      .filter((iso) => {
        const slotLocal = new Date(iso)
        const y = slotLocal.getFullYear()
        const m = String(slotLocal.getMonth() + 1).padStart(2, '0')
        const d = String(slotLocal.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}` === selectedDate
      })
      .map((iso) => {
        const slotLocal = new Date(iso)
        const label = slotLocal.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })

        const isToday = selectedDate === todayStr
        const isPast = isToday && slotLocal.getTime() <= new Date().getTime()

        return { label, value: label, disabled: isPast, time: slotLocal, iso }
      })
      .filter((s) => !s.disabled)
      .sort((a, b) => a.time.getTime() - b.time.getTime())
  }, [availability, selectedDate, todayStr])

  useEffect(() => {
    if (selectedDate || selectedService) {
      setValue('time', '')
    }
  }, [selectedDate, selectedService, setValue])

  const onSubmit = async (data: TFormValues) => {
    try {
      const selectedTimeSlot = timeOptions.find((opt) => opt.value === data.time)
      if (!selectedTimeSlot) {
        toast.error('Пожалуйста, выберите доступное время', {
          position: 'top-center',
          autoClose: 1500,
          theme: 'colored',
        })
        return
      }

      await submitConsultation({
        name: data.name,
        phoneNumber: data.phoneNumber,
        service: data.service,
        start: selectedTimeSlot.iso,
        tzOffset: Number(new Date().getTimezoneOffset()),
      }).unwrap()

      await refetch()
      reset({ name: '', phoneNumber: '', service: selectedService, date: selectedDate, time: '' })

      toast.success('Заявка успешно отправлена!', {
        position: 'top-center',
        autoClose: 1500,
        theme: 'colored',
        style: { background: '#00b8db' },
      })
    } catch (error) {
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
          className="p-6 md:p-10 bg-white/80 backdrop-blur-sm text-center rounded-2xl max-w-2xl flex flex-col gap-6 mx-auto"
        >
          <h2
            className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-6 font-sans bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent bg-clip-text`}
          >
            Запись
          </h2>

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
                  className="w-full text-sm md:text-base text-gray-700 px-5 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 shadow-sm"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-2 text-left">{fieldState.error.message}</p>
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
                  className="w-full text-sm md:text-base text-gray-700 px-5 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 shadow-sm"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-2 text-left">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* Service */}
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-left text-gray-700 text-sm font-semibold mb-3">
                  Услуга
                </label>
                <div className="relative">
                  <select
                    {...field}
                    className="w-full text-sm md:text-base text-gray-700 pl-5 pr-12 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 appearance-none shadow-sm"
                  >
                    <option value="consultation">Консультация (бесплатно)</option>
                    <option value="treatment">Лечение</option>
                    <option value="extraction">Удаление</option>
                    <option value="prosthetics">Протезирование</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
              </div>
            )}
          />
          {/* Date */}
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-left text-gray-700 text-sm font-semibold mb-3">
                  Дата
                </label>
                <div className="relative">
                  <input
                    {...field}
                    type="date"
                    min={todayStr}
                    className="w-full text-sm md:text-base text-gray-700 px-5 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 shadow-sm 
          [appearance:textfield] 
          [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
                  />
                  {/* Our custom calendar icon (shows consistently) */}
                  {/* <AiOutlineCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" /> */}
                </div>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-2 text-left">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* Time */}
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-left text-gray-700 text-sm font-semibold mb-3">
                  Время
                  {isLoadingAvailability && selectedDate && (
                    <span className="text-cyan-600 ml-2">(загрузка...)</span>
                  )}
                </label>
                <div className="relative">
                  <select
                    {...field}
                    disabled={!selectedDate || isLoadingAvailability}
                    className="w-full text-sm md:text-base text-gray-700 pl-5 pr-12 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 appearance-none shadow-sm"
                  >
                    <option value="" disabled>
                      {!selectedDate
                        ? 'Сначала выберите дату'
                        : isLoadingAvailability
                          ? 'Загрузка доступного времени...'
                          : timeOptions.length === 0
                            ? 'Нет доступного времени'
                            : 'Выберите время'}
                    </option>
                    {timeOptions.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {isLoadingAvailability ? (
                    <AiOutlineLoading3Quarters className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-cyan-500" />
                  ) : (
                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  )}
                </div>
              </div>
            )}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="text-white font-semibold bg-gradient-to-r from-cyan-400 to-cyan-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 inline mr-2" />
            ) : null}
            {isLoading ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Consultation
