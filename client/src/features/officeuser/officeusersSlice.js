import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

  export const getDoctors = createAsyncThunk(
    '/officeusers/getDoctors',
    async () => {
        const res = await fetch('/api/office_users').then(
        (data) => data.json()
    )
    return res
  })

  const docsAdapter = createEntityAdapter({
    selectId: (doc) => doc.id,
  })

  export const officeusersSlice = createSlice({
    name: "officeusers",
    initialState: docsAdapter.getInitialState({ loading: false }),
    reducer: {},
    extraReducers: {
        [getDoctors.pending]: (state) => {
          state.loading = true
        },
        [getDoctors.fulfilled]: (state, { payload }) => {
          state.loading = false
          docsAdapter.setAll(state, payload)
        },
        [getDoctors.rejected]: (state, { error }) => {
          state.loading = false
          state.error = error
        },
      },
})

export const docsSlectors = docsAdapter.getSelectors(state=>state.officeuser)

export default officeusersSlice.reducer