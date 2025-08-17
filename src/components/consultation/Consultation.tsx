import React, { useEffect, useMemo } from 'react'
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
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
  // Local "today" string matching the user's timezone (not UTC)
  const todayStr = useMemo(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }, [])

  const selectedService = useWatch({ control, name: 'service' })
  const selectedDate = useWatch({ control, name: 'date' })

  // Get availability for selected date and service
  const {
    data: availability,
    isLoading: isLoadingAvailability,
    error: availabilityError,
    refetch,
  } = useGetAvailabilityQuery(
    { date: selectedDate, service: selectedService },
    { skip: !selectedDate || !selectedService },
  )

  // Debug logging
  console.log('Selected date:', selectedDate)
  console.log('Selected service:', selectedService)
  console.log('Skip condition:', !selectedDate || !selectedService)
  console.log('Availability data:', availability)
  console.log('Loading:', isLoadingAvailability)
  console.log('Error:', availabilityError)
  console.log(
    'Error details:',
    availabilityError
      ? {
          error: availabilityError,
          type: 'error' in availabilityError ? 'FetchBaseQueryError' : 'SerializedError',
        }
      : 'No error',
  )

  // Generate time options based on availability from backend
  const timeOptions = useMemo(() => {
    if (!availability || !selectedDate) {
      return []
    }

    const { availableSlots = [] } = availability

    // Convert ISO strings to time options
    const slots = availableSlots
      .filter((iso) => {
        // Filter by local date of the slot
        const slotLocal = new Date(iso)
        const y = slotLocal.getFullYear()
        const m = String(slotLocal.getMonth() + 1).padStart(2, '0')
        const d = String(slotLocal.getDate()).padStart(2, '0')
        const slotDateStr = `${y}-${m}-${d}`
        return slotDateStr === selectedDate
      })
      .map((iso) => {
        const slotLocal = new Date(iso)
        const label = slotLocal.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })

        // Check if time is in the past for today
        const isToday = selectedDate === todayStr
        const nowLocal = new Date()
        const isPast = isToday && slotLocal.getTime() <= nowLocal.getTime()

        return {
          label,
          value: label,
          disabled: isPast,
          time: slotLocal,
          iso: iso,
        }
      })
      .filter((slot) => !slot.disabled) // Remove past times
      .sort((a, b) => a.time.getTime() - b.time.getTime())

    return slots
  }, [availability, selectedDate, todayStr])

  useEffect(() => {
    // Reset time when date or service changes
    if (selectedDate || selectedService) {
      setValue('time', '')
    }
  }, [selectedDate, selectedService, setValue])

  const onSubmit = async (data: TFormValues) => {
    try {
      // Find the selected time slot to get the ISO time
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
        // pass client's tz offset for precise server validation
        tzOffset: Number(new Date().getTimezoneOffset()),
      }).unwrap()
      // Refresh availability immediately so the just-booked slot disappears
      await refetch()
      // Reset only user-entered fields, keep selected service/date
      reset({
        name: '',
        phoneNumber: '',
        service: selectedService,
        date: selectedDate,
        time: '',
      })
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
              Запись
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

          {/* Service */}
          <Controller
            name="service"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-left text-gray-600 text-sm mb-2">Услуга</label>
                <select
                  {...field}
                  className="w-full text-sm md:text-base text-gray-500 pl-5 pr-8 py-3 md:pl-6 md:pr-8 md:py-4 bg-white/60 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-cyan-400 shadow-sm"
                >
                  <option value="consultation">Консультация (бесплатно)</option>
                  <option value="treatment">Лечение</option>
                  <option value="extraction">Удаление</option>
                  <option value="prosthetics">Протезирование</option>
                </select>
                {fieldState.error && (
                  <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* Date */}
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <div className="relative">
                <label className="block text-left text-gray-600 text-sm mb-2">Дата</label>
                <input
                  {...field}
                  type="date"
                  min={todayStr}
                  className="cursor-pointer w-full appearance-none text-sm md:text-base text-gray-500 px-5 py-3 md:px-6 md:py-4 bg-white/60 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-cyan-400 shadow-sm placeholder-gray-400"
                  placeholder="Выберите дату"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* Time */}
          <Controller
            name="time"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-left text-gray-600 text-sm mb-2">
                  Время {isLoadingAvailability && selectedDate && '(загрузка...)'}
                  {availabilityError && selectedDate && ' (используются базовые часы работы)'}
                </label>
                <select
                  {...field}
                  disabled={!selectedDate || isLoadingAvailability}
                  className="w-full text-sm md:text-base text-gray-500 pl-5 pr-8 py-3 md:pl-6 md:pr-8 md:py-4 bg-white/60 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-cyan-400 shadow-sm disabled:opacity-50"
                >
                  <option value="" disabled>
                    {!selectedDate
                      ? 'Сначала выберите дату'
                      : isLoadingAvailability
                        ? 'Загрузка доступного времени...'
                        : timeOptions.length === 0
                          ? 'Нет доступного времени на эту дату'
                          : 'Выберите время'}
                  </option>
                  {timeOptions.map(
                    (opt: {
                      label: string
                      value: string
                      disabled: boolean
                      time: Date
                      iso: string
                    }) => (
                      <option
                        key={opt.label}
                        value={opt.value}
                        disabled={opt.disabled}
                        className={opt.disabled ? 'text-gray-400' : ''}
                      >
                        {opt.label} {opt.disabled ? '(недоступно)' : ''}
                      </option>
                    ),
                  )}
                </select>
                {availabilityError && (
                  <p className="text-red-500 text-sm mt-1">
                    Ошибка загрузки доступного времени. Попробуйте выбрать другую дату.
                    {import.meta.env.DEV && (
                      <span className="block text-xs mt-1">
                        Детали: {JSON.stringify(availabilityError)}
                      </span>
                    )}
                  </p>
                )}
                {fieldState.error && (
                  <p className="text-red-500 text-sm">{fieldState.error.message}</p>
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
