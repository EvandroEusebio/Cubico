import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  imovelDetail: null,
}

export const infoImovelSlice = createSlice({
  name: 'infoImovel',
  initialState,
  reducers: {
    setDataImovel: (state, action) => {
      state.imovelDetail = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataImovel } = infoImovelSlice.actions

export default infoImovelSlice.reducer