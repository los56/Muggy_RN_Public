import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  id: number;
  username: string;
  nickname: string;
  email: string;
  accessToken: string;
}

const initialState: UserState = {
  id: -1,
  username: '',
  nickname: '',
  email: '',
  accessToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const {
  setUser,
  setId,
  setUsername,
  setNickname,
  setEmail,
  setAccessToken,
} = userSlice.actions;

export default userSlice.reducer;
