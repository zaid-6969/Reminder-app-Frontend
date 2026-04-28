import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import toast from 'react-hot-toast';

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchReminders = createAsyncThunk(
  'reminders/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get('/reminders', { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch reminders');
    }
  }
);

export const createReminder = createAsyncThunk(
  'reminders/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/reminders', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create reminder');
    }
  }
);

export const updateReminder = createAsyncThunk(
  'reminders/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/reminders/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update reminder');
    }
  }
);

export const deleteReminder = createAsyncThunk(
  'reminders/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/reminders/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete reminder');
    }
  }
);

export const markComplete = createAsyncThunk(
  'reminders/markComplete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/reminders/${id}/complete`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update reminder');
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const reminderSlice = createSlice({
  name: 'reminders',
  initialState: {
    items: [],
    pagination: null,
    loading: false,
    submitting: false,
    filter: 'all', // 'all' | 'pending' | 'completed'
  },
  reducers: {
    setFilter: (s, a) => { s.filter = a.payload; },
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchReminders.pending,  (s) => { s.loading = true; })
      .addCase(fetchReminders.fulfilled, (s, a) => {
        s.loading    = false;
        s.items      = a.payload.reminders;
        s.pagination = a.payload.pagination;
      })
      .addCase(fetchReminders.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload);
      });

    // Create
    builder
      .addCase(createReminder.pending,  (s) => { s.submitting = true; })
      .addCase(createReminder.fulfilled, (s, a) => {
        s.submitting = false;
        s.items.unshift(a.payload.reminder);
        toast.success('Reminder created! ⏰');
      })
      .addCase(createReminder.rejected, (s, a) => {
        s.submitting = false;
        toast.error(a.payload);
      });

    // Update
    builder
      .addCase(updateReminder.pending,  (s) => { s.submitting = true; })
      .addCase(updateReminder.fulfilled, (s, a) => {
        s.submitting = false;
        const idx = s.items.findIndex((r) => r._id === a.payload.reminder._id);
        if (idx !== -1) s.items[idx] = a.payload.reminder;
        toast.success('Reminder updated!');
      })
      .addCase(updateReminder.rejected, (s, a) => {
        s.submitting = false;
        toast.error(a.payload);
      });

    // Delete
    builder
      .addCase(deleteReminder.fulfilled, (s, a) => {
        s.items = s.items.filter((r) => r._id !== a.payload);
        toast.success('Reminder deleted');
      })
      .addCase(deleteReminder.rejected, (_, a) => toast.error(a.payload));

    // Mark complete
    builder
      .addCase(markComplete.fulfilled, (s, a) => {
        const idx = s.items.findIndex((r) => r._id === a.payload.reminder._id);
        if (idx !== -1) s.items[idx] = a.payload.reminder;
        toast.success('Marked as complete ✓');
      })
      .addCase(markComplete.rejected, (_, a) => toast.error(a.payload));
  },
});

export const { setFilter } = reminderSlice.actions;
export default reminderSlice.reducer;
