import { createSlice } from '@reduxjs/toolkit';

interface IState {
  openDrawer: boolean;
}

const State = {
  openDrawer: false
} as IState;

const appSlice = createSlice({
  name: 'appSlice',
  initialState: State,

  reducers: {
    toggleDrawer: (state) => {
      state.openDrawer = !state.openDrawer;
    },
    closeDrawer: (state) => {
      state.openDrawer = false;
    },
    openDrawer: (state) => {
      state.openDrawer = true;
    }
  }
});

export const { toggleDrawer, closeDrawer, openDrawer } = appSlice.actions;

export default appSlice.reducer;
