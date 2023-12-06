import { CafeData } from "../types";
import { createSlice } from "@reduxjs/toolkit";

interface cafeCacheSlice {
  caches: {[id: number]: CafeData};
}

const initialState: cafeCacheSlice = {
  caches: {},
};

export const cafeCacheSlice = createSlice({
  name: 'cafeCache',
  initialState,
  reducers: {
    setCafeCache: (state, action) => {
      state.caches = action.payload;
    },
    clearCafeCaches: state => {
      state.caches = [];
    },
    appendCafeCache: (state, action) => {
      state.caches = {
        ...state.caches,
        [action.payload['id']]: action.payload,
      };
    },
  },
});

export const {setCafeCache, clearCafeCaches, appendCafeCache} = cafeCacheSlice.actions;

export default cafeCacheSlice.reducer;
