import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    status: 'idle',
    error: null
  }

  export const getDoctors = createAsyncThunk(
    '/officeusers/getDoctors',
    async (thunkAPI) => {
        const res = await fetch('/api/office_users').then(
        (data) => data.json()
    )
    return res
  })

  export const officeusersSlice = createSlice({
    name: "officeusers",
    initialState,
    reducer: {},
    extraReducers: {
        [getDoctors.pending]: (state) => {
          state.loading = true
        },
        [getDoctors.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.data = payload
        },
        [getDoctors.rejected]: (state) => {
          state.loading = false
        },
      },
})

export default officeusersSlice.reducer