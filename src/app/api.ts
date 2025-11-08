import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL
console.log('API Base URL:', baseUrl)

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || 'http://localhost:3000', // fallback to localhost if no env var
  }),
  endpoints: () => ({}),
  tagTypes: ['RECOMMENDATIONS'],
})

export const sendToBot = async (fullName: string) => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  const message = `Новая рекомендация! 👤 От: ${fullName}`

  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: message,
  })
}

export const sendToBotRecord = async (fullName: string) => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  const message = `Новый запись! 👤 От: ${fullName}`

  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: message,
  })
}
