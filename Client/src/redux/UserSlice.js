import { createSlice } from '@reduxjs/toolkit';

// Get the initial state from local storage or set it to null
const persistedState = localStorage.getItem('user') 
  ? JSON.parse(localStorage.getItem('user')) 
  : null;

export const UserSlice = createSlice({
  name: 'user',
  initialState: persistedState, // Use persisted state if available
  reducers: {
    update: (state, action) => {
      const newState = { ...action.payload };
      localStorage.setItem('user', JSON.stringify(newState)); // Save to local storage
      return newState;
    },
    clearUser: () => {
      localStorage.removeItem('user'); // Clear from local storage
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
