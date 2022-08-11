import { createSlice } from '@reduxjs/toolkit';

import { Feedback } from '../models/model.feedback';
import { Prayer } from '../models/model.prayer';

interface IState {
  events: Event[];
  prayers: Prayer[];
  notifications: Notification[];
  locations: Location[];
  feedbacks: Feedback[];
}

const State = {
  events: [],
  prayers: [],
  notifications: [],
  locations: [],
  feedbacks: []
} as IState;

const frestoreSlice = createSlice({
  name: 'firestore',
  initialState: State,

  reducers: {
    updateEvents: (state, payload) => {
      state.events = payload.payload;
    },
    updatePrayers: (state, payload) => {
      state.prayers = payload.payload;
    },
    updateNotifications: (state, payload) => {
      state.notifications = payload.payload;
    },
    updateLocations: (state, payload) => {
      state.locations = payload.payload;
    },
    updateFeedbacks: (state, payload) => {
      state.feedbacks = payload.payload;
    }
  }
});

export const { updateEvents, updateFeedbacks, updateLocations, updateNotifications, updatePrayers } = frestoreSlice.actions;

export default frestoreSlice.reducer;
