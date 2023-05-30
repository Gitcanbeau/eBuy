import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: true,
  shippingAddress: null,
  orderInfo: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    createOrderByUser: (state, { payload })=>{
      state.loading = false;
      state.error = payload;
      state.orderInfo = payload;
    },
    shippingAddressAdd: (state, { payload }) => {
      state.loading = false;
      state.shippingAddress = payload;
    },
    clearOrder: (state) => {
      state = initialState;
    },
  },
});

export const { setLoading, setError, createOrderByUser, shippingAddressAdd, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = (state) => state.order;
