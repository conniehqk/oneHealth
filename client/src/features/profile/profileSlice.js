import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    status: 'idle',
    error: null
  }

export const getProfile = createAsyncThunk(
    '/profile/getProfile',
    async (thunkAPI) => {
        const res = await fetch('/api/patient_me').then(
            (data) => data.json()
    )
    return res
})

export const updateProfile = createAsyncThunk(
  '/profile/updateProfile',
  async (obj, thunkAPI) => {
      const res = await fetch(`/api/patient_me/edit`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      }).then(
      (data) => data.json()
  )
  return res
})

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducer: {},
    extraReducers: {
        [getProfile.pending]: (state) => {
          state.loading = true
        },
        [getProfile.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.data = payload
        },
        [getProfile.rejected]: (state) => {
          state.loading = false
        },
        [updateProfile.pending]: (state) => {
          state.loading = true
        },
        [updateProfile.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.data = payload
        },
        [updateProfile.rejected]: (state) => {
          state.loading = false
        },
      },
})


export default profileSlice.reducer

