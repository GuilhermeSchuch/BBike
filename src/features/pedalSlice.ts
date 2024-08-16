import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localDefined: undefined
}

export const pedalSlice = createSlice({
  name: "pedal",
  initialState,
  reducers: {
    setLocalDefined: (state, actions) => {
      const { isLocalDefined } = actions.payload;
      state.localDefined = isLocalDefined;
    }
  }
});

export const { setLocalDefined } = pedalSlice.actions;

export default pedalSlice.reducer;