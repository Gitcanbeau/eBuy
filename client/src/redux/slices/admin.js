import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userList: null,
  userRemoval: false,
  orderList: null,
  orderRemoval: false,
  deliveredFlag: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    getUsers: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userList = payload;
    },
    userDelete: (state) => {
      state.loading = false;
      state.error = null;
      state.userRemoval = true;
    },
    getOrders: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.orderList = payload;
    },
    orderDelete: (state) => {
      state.loading = false;
      state.error = null;
      state.orderRemoval = true;
    },
    resetError: (state) => {
      state.loading = false;
      state.error = null;
      state.userRemoval = false;
      state.deliveredFlag = false;
      state.orderRemoval = false;
    },
    setDeliveredFlag: (state) => {
      state.loading = false;
      state.deliveredFlag = true;
    },
  },
});

export const { setLoading, setError, getUsers, userDelete, getOrders, orderDelete, resetError, setDeliveredFlag } =
  adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
