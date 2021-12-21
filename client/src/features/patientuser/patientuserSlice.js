import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    loading: true,
    error: null
  }

  export const getPatients = createAsyncThunk(
    '/patientusers/getPatients',
    async (thunkAPI) => {
        const res = await fetch('/api/patient_users').then(
        (data) => data.json()
    )
    return res
  })

  export const patientusersSlice = createSlice({
    name: "patientusers",
    initialState,
    reducer: {},
    extraReducers: {
        [getPatients.pending]: (state) => {
          state.loading = true
        },
        [getPatients.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.data = payload
        },
        [getPatients.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
      },
})

export default patientusersSlice.reducer