import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  homeSelections: {
    departureCity: '',
    arrivalCity: '',
    peopleNumber: '',
    whenDate: '',
  },
  buttonLoading: false,
  busTickets: [],
};

const Slice = createSlice({
  name: 'fasticket',
  initialState,
  reducers: {
    changeHomeSelections: (state, action) => {
      state.homeSelections = action.payload;
    },
    changeButtonLoading: (state, action) => {
      state.buttonLoading = action.payload;
    },
    changeBusTickets: (state, action) => {
      state.busTickets = action.payload;
    },
  },
});

export const {changeHomeSelections, changeButtonLoading, changeBusTickets} =
  Slice.actions;
export default Slice.reducer;
