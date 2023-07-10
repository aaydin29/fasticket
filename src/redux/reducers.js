import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  homeSelections: {
    departureCity: '',
    arrivalCity: '',
    peopleNumber: '',
    whenDate: '',
  },
  buttonLoading: false,
  availableBusTickets: [],
  selectedBusTicket: {},
  selectedSeats: [],
  selectedTicketPrice: 0,
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
    changeAvailableBusTickets: (state, action) => {
      state.availableBusTickets = action.payload;
    },
    addSelectedBusTicket: (state, action) => {
      state.selectedBusTicket = action.payload;
    },
    addSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    addSelectedTicketPrice: (state, action) => {
      state.selectedTicketPrice = action.payload;
    },
  },
});

export const {
  changeHomeSelections,
  changeButtonLoading,
  changeAvailableBusTickets,
  addSelectedBusTicket,
  addSelectedSeats,
  addSelectedTicketPrice,
} = Slice.actions;
export default Slice.reducer;
