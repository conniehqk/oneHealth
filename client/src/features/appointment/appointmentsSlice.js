import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    status: 'idle',
    error: null
  }

export const addAppointments = createAsyncThunk(
    '/appointments/addAppointments',
    async (apt,thunkAPI) => {
        const res = await fetch('/api/appointments',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apt)
        }).then(
        (data) => data.json()
    )
    return res
})

export const getAppointments = createAsyncThunk(
  '/appointments/getAppointments',
  async (thunkAPI) => {
      const res = await fetch('/api/appointments').then(
      (data) => data.json()
  )
  return res
})

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducer: {},
    extraReducers: {
        [getAppointments.pending]: (state) => {
          state.loading = true
        },
        [getAppointments.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.data = payload
        },
        [getAppointments.rejected]: (state) => {
          state.loading = false
        },
        [addAppointments.pending]: (state) => {
          state.loading = true
        },
        [addAppointments.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.data.push(payload)
        },
        [addAppointments.rejected]: (state) => {
          state.loading = false
        },
      },
})

export const { appointmentAdded, appointmentUpdated, appointmentDeleted } = appointmentsSlice.actions

export default appointmentsSlice.reducer

export const selectAllAppointments = state => state.appointments
