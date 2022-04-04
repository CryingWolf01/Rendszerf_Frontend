import application from "../shared/reducers/application";
import thunk, { ThunkAction } from "redux-thunk";
import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import authentication from "../shared/reducers/authentication";

const rootReducer = combineReducers({
  authentication,
  application,
});

const store = configureStore({
  reducer: rootReducer,
});

export function setupTestStore(initialState?: RootState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [thunk],
  });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;