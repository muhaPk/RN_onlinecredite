import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type usersType = {
  _id: string;
  email: string;
  password: number;
  avatar: string;
}
type currentUserType = {
  _id?: string;
  email?: string;
  password?: number;
  // avatar?: string;
}
type isAuthType = {
  isAuth: boolean
}

type InitialState = {
  users: usersType[],
  currentUser: currentUserType,
  isAuth: isAuthType,
}

const initialState: InitialState = {
  users: [],
  currentUser: {},
  isAuth: false,
}

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<any>) {
      state.users = action.payload
    },
    setUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload
      state.isAuth = true
    },
    logout(state) {
      state.currentUser = {}
      state.users = []
      state.isAuth = false
    },
  },
});

export default usersReducer.reducer;
export const {setUser, setUsers, logout} = usersReducer.actions;
