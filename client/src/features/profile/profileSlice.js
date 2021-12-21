import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    loading: true,
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
        [getProfile.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
        [updateProfile.pending]: (state) => {
          state.loading = true
        },
        [updateProfile.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.data = payload
        },
        [updateProfile.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
      },
})


export default profileSlice.reducer

