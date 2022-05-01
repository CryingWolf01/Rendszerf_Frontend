import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../config/store";
import { SliceStatus } from "../common";
import { User } from "../types";
import { loginUser } from "../network/user.api";
import { removeToken, saveToken, getToken } from "../util/authToken";

export type AuthenticatedUser = {
  user: User;
};

interface AuthenticationState {
  account: AuthenticatedUser;
  status: SliceStatus;
  logoutStatus: SliceStatus;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
}

const initialState: AuthenticationState = {
  account: {} as AuthenticatedUser,
  status: "idle",
  logoutStatus: "idle",
  error: null,
  isAuthenticated: false,
  initialized: false,
};

function loadingStart(state: AuthenticationState) {
  state.status = "pending";
}

function loadingFailure(
  state: AuthenticationState,
  action: PayloadAction<string>
) {
  state.status = "failure";
  state.error = action.payload;
  state.account = {} as AuthenticatedUser;
  state.isAuthenticated = false;
  state.initialized = true;
}

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginStart: loadingStart,
    loginSuccess(state, action: PayloadAction<AuthenticatedUser>) {
      state.status = "success";
      state.account = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.initialized = true;
    },
    loginFailure: loadingFailure,
    logoutStart(state) {
      state.logoutStatus = "pending";
    },
    logoutFailure(state, action) {
      state.logoutStatus = "failure";
      state.error = action.payload;
    },
    finishInitializing(state) {
      state.initialized = true;
    },
    resetState: () => ({
      ...initialState,
      initialized: true,
    }),
  },
});

export default authentication.reducer;

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutFailure,
  finishInitializing,
  resetState,
} = authentication.actions;

export const RESET_ACTION_TYPE = resetState.type;

export const login =
  (username: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      const { data } = await loginUser({ username: username, password: password });
      initialState.isAuthenticated = true;
      //saveToken(data.item);
      dispatch(fetchAccount());
    } catch (error: any) {
      const responseCode = error?.status || (error?.response?.status ?? 0);
      const status = error?.data?.status;
      removeToken();
      if (responseCode === 0) {
        dispatch(loginFailure("hostNotFound"));
        return;
      }
      if (responseCode === 401) {
        if (status === "NOT_ACTIVATED") {
          dispatch(loginFailure("notActivated"));
          return;
        }
        dispatch(loginFailure("invalidCredentials"));
        return;
      }
      dispatch(loginFailure("failure"));
    }
  };

export const fetchAccount = (): AppThunk => async (dispatch) => {
  try {
   // const { data } = await getAccount();
    //dispatch(loginSuccess(data));
  } catch (error: any) {
    const status = error?.status || (error?.response?.status ?? 0);
    removeToken();

    if (status === 0) {
      dispatch(loginFailure("hostNotFound"));
      return;
    }

    dispatch(loginFailure("failure"));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logoutStart());
  const token = getToken();
  if (token) {
    try {
      //await postLogout();
      removeToken();
      dispatch(resetState());
    } catch (error) {
      dispatch(logoutFailure(error));
    }
  } else {
    dispatch(logoutFailure("NO_TOKEN"));
  }
};
