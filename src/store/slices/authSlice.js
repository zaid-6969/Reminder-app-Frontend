import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import toast from 'react-hot-toast';

// 🔧 FIX: safe parsing for user
let parsedUser = null;

try {
  const rawUser = localStorage.getItem('user');
  parsedUser =
    rawUser && rawUser !== 'undefined' ? JSON.parse(rawUser) : null;
} catch (e) {
  console.error('Invalid user in localStorage');
  parsedUser = null;
}

const storedToken = localStorage.getItem('token');

// ── Thunks ────────────────────────────────────────────────────────────────────

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/register', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/login', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await api.post('/auth/logout').catch(() => {});
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

// ── Slice ─────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: parsedUser, // 🔧 FIX: use safe parsed value
    token: storedToken || null,
    loading: false,
    initialized: false,
  },
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending,  (s) => { s.loading = true; })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user    = a.payload.user;
        s.token   = a.payload.token;

        // 🔧 small safety
        if (a.payload.user) {
          localStorage.setItem('user', JSON.stringify(a.payload.user));
        }
        localStorage.setItem('token', a.payload.token);

        toast.success('Account created! Welcome 🎉');
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      });

    // Login
    builder
      .addCase(loginUser.pending,  (s) => { s.loading = true; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user    = a.payload.user;
        s.token   = a.payload.token;

        // 🔧 small safety
        if (a.payload.user) {
          localStorage.setItem('user', JSON.stringify(a.payload.user));
        }
        localStorage.setItem('token', a.payload.token);

        toast.success(`Welcome back, ${a.payload.user.name}! 👋`);
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (s) => {
      s.user  = null;
      s.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
    });

    // Fetch me
    builder
      .addCase(fetchMe.fulfilled, (s, a) => {
        s.user = a.payload.user;
        s.initialized = true;

        if (a.payload.user) {
          localStorage.setItem('user', JSON.stringify(a.payload.user));
        }
      })
      .addCase(fetchMe.rejected, (s) => { s.initialized = true; });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;