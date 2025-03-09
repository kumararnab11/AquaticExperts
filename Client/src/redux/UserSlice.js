import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    address: [],
    email: '',
    cart: [],
    _id: ''
  },
  reducers: {
    update: (state, action) => {
      return { ...action.payload };  
    },
    clearUser: (state) => {
      state.name = '';
      state._id = '';
      state.email = '';
      state.cart = [];
      state.address = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
