import {createSlice} from '@reduxjs/toolkit';

import { MenuData } from "../types";

interface CartSlice {
  cafeId: number;
  inList: {[menuId: number]: {amount: number; menuData: MenuData}};
}

const initialState: CartSlice = {
  cafeId: -1,
  inList: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cafeId = action.payload.cafeId;
      state.inList = action.payload.inList;
    },
    setCafeId: (state, action) => {
      state.cafeId = action.payload;
    },
    setInList: (state, action) => {
      state.inList = action.payload;
    },
    setAmount: (state, action) => {
      state.inList[action.payload.menuId].amount = action.payload.amount;
    },
    clearCart: (state, action) => {
      state.cafeId = initialState.cafeId;
      state.inList = {};
    },
  },
});

export const {setCart, setCafeId, setInList, setAmount, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
