import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSend: false,
  productUpdate: false,
  reviewRemoval: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.product = payload;
    },
    productReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewSend = true;
    },
    resetError: (state) => {
      state.error = null;
      state.reviewSend = false;
      state.productUpdate = false;
      state.reviewRemoval = false;
    },
    setProductUpdateFlag: (state) => {
      state.loading = false;
      state.productUpdate = true;
    },
    setReviewRemovalFlag: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewRemoval = true;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setProduct,
  productReviewed,
  resetError,
  setProductUpdateFlag,
  setReviewRemovalFlag,
} = productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector = (state) => state.products;
