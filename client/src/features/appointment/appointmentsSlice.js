import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

export const addAppointments = createAsyncThunk(
    '/appointments/addAppointments',
    async (apt) => {
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

export const deleteAppointments = createAsyncThunk(
  '/appointments/deleteAppointments',
  async (id) => {
      await fetch(`/api/appointments/${id}`,{
        method: "DELETE",
      })
  return id
})

export const updateAppointments = createAsyncThunk(
  '/appointments/updateAppointments',
  async ({id,obj}) => {
      await fetch(`/api/appointments/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      })
  return {id, changes: obj}
})

export const getAppointments = createAsyncThunk(
  '/appointments/getAppointments',
  async () => {
      const res = await fetch('/api/appointments').then(
      (data) => data.json()
  )
  return res
})

const apptsAdapter = createEntityAdapter({
  selectId: (appointment) => appointment.id,
})

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState: apptsAdapter.getInitialState({ loading: false }),
    reducer: {},
    extraReducers: {
        [getAppointments.pending]: (state) => {
          state.loading = true
        },
        [getAppointments.fulfilled]: (state, { payload }) => {
          state.loading = false
          apptsAdapter.setAll(state, payload)
        },
        [getAppointments.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
        [addAppointments.pending]: (state) => {
          state.loading = true
        },
        [addAppointments.fulfilled]: (state, { payload }) => {
          state.loading = false
          apptsAdapter.addOne(state, payload)
        },
        [addAppointments.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
        [deleteAppointments.pending]: (state) => {
          state.loading = true
        },
        [deleteAppointments.fulfilled]: (state, { payload: id }) => {
          state.loading = false
          apptsAdapter.removeOne(state, id)
        },
        [deleteAppointments.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
        [updateAppointments.pending]: (state) => {
          state.loading = true
        },
        [updateAppointments.fulfilled]: (state, { payload }) => {
          state.loading = false
          apptsAdapter.updateOne(state,{
            id: payload.id,
            changes: payload.changes,
          })
        },
        [updateAppointments.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
      },
})

export const apptsSlectors = apptsAdapter.getSelectors(state=>state.appointment)

export default appointmentsSlice.reducer
