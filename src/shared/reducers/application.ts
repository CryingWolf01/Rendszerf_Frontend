import { RootState } from "../../config/store";
import { PROFILE_TYPE_KEY } from "../../config/constants";
import { PROFILE_TYPE, SliceStatus } from "../common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationState {
  profileType: PROFILE_TYPE;
  error: string | null;
  loading: SliceStatus;
}

const initialState: ApplicationState = {
  profileType: "Provider",
  loading: "idle",
  error: null,
};

const application = createSlice({
  name: "application",
  initialState,
  reducers: {
    setProfileType(state, action: PayloadAction<PROFILE_TYPE>) {
      state.profileType = action.payload;
    },
    toggleProfileType(state) {
      const type = state.profileType === "Customer" ? "Provider" : "Customer";
      state.profileType = type;
      localStorage.setItem(PROFILE_TYPE_KEY, type);
    },
  },
});

export default application.reducer;

const profileTypeSelector = (state: RootState) => state.application.profileType;

const { toggleProfileType, setProfileType } = application.actions;

export { toggleProfileType, setProfileType, profileTypeSelector };