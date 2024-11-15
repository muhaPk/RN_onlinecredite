import {combineReducers, configureStore} from '@reduxjs/toolkit';
import usersReducer from '../../entities/user/model/redux/usersReducer';
// import groupReducer from './groupReducer';
// import fileReducer from './fileReducer';
// import groupMessageReducer from './groupMessgeReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  // groups: groupReducer,
  // groupMessages: groupMessageReducer,
  // files: fileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
