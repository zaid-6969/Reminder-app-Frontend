import { createSlice } from '@reduxjs/toolkit';

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = saved || (prefersDark ? 'dark' : 'light');

document.documentElement.classList.add(initial);

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: initial },
  reducers: {
    toggleTheme: (state) => {
      const next = state.mode === 'dark' ? 'light' : 'dark';
      state.mode = next;
      localStorage.setItem('theme', next);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(next);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
