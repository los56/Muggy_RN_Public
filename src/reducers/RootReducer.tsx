import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import cafeCacheSlice from './cafeCacheSlice';

const RootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  cafeCache: cafeCacheSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
