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
  paymentInfo: {
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    isNumberTrue: false,
    totalPrice: '',
  },
  myTickets: {},
  userInfo: {},
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
    changePaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
    addMyTickets: (state, action) => {
      state.myTickets = action.payload;
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
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
  changePaymentInfo,
  addMyTickets,
  addUserInfo,
} = Slice.actions;
export default Slice.reducer;
