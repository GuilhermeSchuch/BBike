import { createSlice } from "@reduxjs/toolkit";

interface PedalState {
  localDefined: boolean | undefined;
  currentTrack: Object[];
}

const initialState: PedalState = {
  localDefined: undefined,
  currentTrack: [],
};

export const pedalSlice = createSlice({
  name: "pedal",
  initialState,
  reducers: {
    setLocalDefined: (state, actions) => {
      const { isLocalDefined } = actions.payload;
      state.localDefined = isLocalDefined;
    },

    setCurrentTrack: (state, actions) => {
      const { currentTrack } = actions.payload;
      state.currentTrack.push([...state.currentTrack, currentTrack]);
    }
  }
});

export const { setLocalDefined } = pedalSlice.actions;

export default pedalSlice.reducer;