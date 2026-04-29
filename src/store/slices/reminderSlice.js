import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import toast from 'react-hot-toast';

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchReminders = createAsyncThunk(
  'reminders/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get('/reminders', { params });
      return { data: res.data, params };
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
    items: [],       // filtered view shown on dashboard
    allItems: [],    // always all reminders — used for stats on profile/dashboard
    pagination: null,
    loading: false,
    submitting: false,
    filter: 'all',
  },
  reducers: {
    setFilter: (s, a) => { s.filter = a.payload; },
  },
  extraReducers: (builder) => {

    // Fetch
    builder
      .addCase(fetchReminders.pending, (s) => { s.loading = true; })
      .addCase(fetchReminders.fulfilled, (s, a) => {
        s.loading    = false;
        s.items      = a.payload.data.reminders;
        s.pagination = a.payload.data.pagination;
        // If no filter was applied, keep allItems in sync
        if (!a.payload.params?.status) {
          s.allItems = a.payload.data.reminders;
        }
      })
      .addCase(fetchReminders.rejected, (s, a) => {
        s.loading = false;
        toast.error(a.payload || 'Failed to load reminders');
      });

    // Create — add to both lists
    builder
      .addCase(createReminder.pending,  (s) => { s.submitting = true; })
      .addCase(createReminder.fulfilled, (s, a) => {
        s.submitting = false;
        const reminder = a.payload.reminder;
        // Add to items only if showing all or pending
        if (s.filter !== 'completed') s.items.unshift(reminder);
        s.allItems.unshift(reminder);
        toast.success('Reminder created! ⏰');
      })
      .addCase(createReminder.rejected, (s, a) => {
        s.submitting = false;
        toast.error(a.payload);
      });

    // Update — replace in both lists
    builder
      .addCase(updateReminder.pending,  (s) => { s.submitting = true; })
      .addCase(updateReminder.fulfilled, (s, a) => {
        s.submitting = false;
        const updated = a.payload.reminder;
        const replaceIn = (arr) => {
          const idx = arr.findIndex((r) => r._id === updated._id);
          if (idx !== -1) arr[idx] = updated;
        };
        replaceIn(s.items);
        replaceIn(s.allItems);
        toast.success('Reminder updated!');
      })
      .addCase(updateReminder.rejected, (s, a) => {
        s.submitting = false;
        toast.error(a.payload);
      });

    // Delete — remove from both lists
    builder
      .addCase(deleteReminder.fulfilled, (s, a) => {
        s.items    = s.items.filter((r) => r._id !== a.payload);
        s.allItems = s.allItems.filter((r) => r._id !== a.payload);
        toast.success('Reminder deleted');
      })
      .addCase(deleteReminder.rejected, (_, a) => toast.error(a.payload));

    // Mark complete — update in both lists
    builder
      .addCase(markComplete.fulfilled, (s, a) => {
        const updated = a.payload.reminder;
        const replaceIn = (arr) => {
          const idx = arr.findIndex((r) => r._id === updated._id);
          if (idx !== -1) arr[idx] = updated;
        };
        replaceIn(s.items);
        replaceIn(s.allItems);
        // If viewing pending only, remove it from the visible list
        if (s.filter === 'pending') {
          s.items = s.items.filter((r) => r._id !== updated._id);
        }
        toast.success('Marked as complete ✓');
      })
      .addCase(markComplete.rejected, (_, a) => toast.error(a.payload));
  },
});

export const { setFilter } = reminderSlice.actions;
export default reminderSlice.reducer;
