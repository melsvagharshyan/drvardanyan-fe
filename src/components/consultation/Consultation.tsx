import React, { useEffect, useMemo, useRef } from 'react'
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ChevronDownIcon, CalendarIcon } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { useGetAvailabilityQuery, useSubmitConsultationMutation } from '~/app/messages/messages.api'
import { formSchema, TFormValues } from './utils/validation'
import { sendToBotRecord } from '~/app/api'

const Consultation: React.FC = () => {
  const mode = useSelector((state: any) => state.theme.mode)
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
      await sendToBotRecord(data?.name)

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
      className={clsx(
        'py-24 px-4 w-full text-center transition-colors duration-300',
        mode === 'dark'
          ? 'bg-linear-to-r from-black to-gray-900 text-white'
          : 'bg-linear-to-r from-white to-cyan-200 text-black',
      )}
      id="consultation"
      style={{
        backgroundImage:
          mode === 'dark'
            ? undefined
            : `url(https://i.pinimg.com/1200x/92/52/b5/9252b5facbc66db4562305a50e8e1736.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx(
            'p-4 md:p-10 backdrop-blur-sm text-center rounded-2xl max-w-2xl w-full flex flex-col gap-6 mx-auto',
            mode === 'dark' ? 'bg-gray-800/70' : 'bg-white/80',
          )}
        >
          <h2
            className={clsx(
              isMobile ? 'text-2xl' : 'text-4xl',
              'font-bold mb-6 font-sans bg-clip-text',
              mode === 'dark'
                ? 'bg-linear-to-r from-white via-gray-400 to-white text-transparent'
                : 'bg-gradient-to-r from-cyan-500 via-cyan-950 to-cyan-500 text-transparent',
            )}
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
                  className={clsx(
                    'w-full text-sm md:text-base px-3 md:px-5 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 shadow-sm',
                    mode === 'dark'
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'text-gray-700 bg-white/80 border-gray-300',
                  )}
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
                  className={clsx(
                    'w-full text-sm md:text-base px-3 md:px-5 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 shadow-sm',
                    mode === 'dark'
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'text-gray-700 bg-white/80 border-gray-300',
                  )}
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
                <label
                  className={clsx(
                    'block text-left text-sm font-semibold mb-3',
                    mode === 'dark' ? 'text-white' : 'text-gray-700',
                  )}
                >
                  Услуга
                </label>
                <div className="relative">
                  <select
                    {...field}
                    className={clsx(
                      'w-full text-sm md:text-base pl-3 md:pl-5 pr-10 md:pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 appearance-none shadow-sm',
                      mode === 'dark'
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'text-gray-700 bg-white/80 border-gray-300',
                    )}
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
            render={({ field, fieldState }) => {
              const dateInputRef = useRef<HTMLInputElement>(null)

              const formatDisplayDate = (dateStr: string) => {
                if (!dateStr) return 'Выберите дату'
                const date = new Date(dateStr + 'T00:00:00')
                return date.toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }

              return (
                <div>
                  <label
                    className={clsx(
                      'block text-left text-sm font-semibold mb-3',
                      mode === 'dark' ? 'text-white' : 'text-gray-700',
                    )}
                  >
                    Дата
                  </label>
                  <div className="relative">
                    {/* Hidden native date input */}
                    <input
                      {...field}
                      ref={dateInputRef}
                      type="date"
                      min={todayStr}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      style={{ zIndex: 1 }}
                    />
                    {/* Custom button that looks like input */}
                    <div
                      className={clsx(
                        'w-full text-sm md:text-base px-3 md:px-5 py-3 border rounded-lg shadow-sm',
                        'flex items-center justify-between',
                        'pointer-events-none',
                        mode === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white/80 border-gray-300',
                        field.value
                          ? mode === 'dark'
                            ? 'text-white'
                            : 'text-gray-700'
                          : 'text-gray-400',
                      )}
                    >
                      <span>{formatDisplayDate(field.value)}</span>
                      <CalendarIcon className="h-5 w-5 text-gray-500 flex-shrink-0 ml-2" />
                    </div>
                  </div>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-2 text-left">{fieldState.error.message}</p>
                  )}
                </div>
              )
            }}
          />

          {/* Time */}
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  className={clsx(
                    'block text-left text-sm font-semibold mb-3',
                    mode === 'dark' ? 'text-white' : 'text-gray-700',
                  )}
                >
                  Время
                  {isLoadingAvailability && selectedDate && (
                    <span className={clsx('ml-2', mode === 'dark' ? 'text-cyan-400' : 'text-cyan-600')}>
                      (загрузка...)
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    {...field}
                    disabled={!selectedDate || isLoadingAvailability}
                    className={clsx(
                      'w-full text-sm md:text-base pl-3 md:pl-5 pr-10 md:pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 appearance-none shadow-sm',
                      mode === 'dark'
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'text-gray-700 bg-white/80 border-gray-300',
                    )}
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
            className={clsx(
              'w-full font-semibold px-4 md:px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50',
              mode === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'text-white bg-gradient-to-r from-cyan-400 to-cyan-600',
            )}
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
