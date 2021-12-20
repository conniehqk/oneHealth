import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appointmentReducer from '../features/appointment/appointmentsSlice'
import profileReducer from '../features/profile/profileSlice';
import officeuserReducer from '../features/officeuser/officeusersSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appointment: appointmentReducer,
    profile: profileReducer,
    officeuser: officeuserReducer
  },
});
