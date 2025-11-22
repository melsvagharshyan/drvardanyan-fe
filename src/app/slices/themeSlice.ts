import { createSlice } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
}

// Read initial mode from localStorage (fallback to "light")
const savedMode = (
  typeof window !== 'undefined' ? localStorage.getItem('theme') : null
) as ThemeMode | null

const initialState: ThemeState = {
  mode: savedMode ?? 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.mode) // save to localStorage
    },
    setTheme(state, action: { payload: ThemeMode }) {
      state.mode = action.payload
      localStorage.setItem('theme', action.payload) // save to localStorage
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

