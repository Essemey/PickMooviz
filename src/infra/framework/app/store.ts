import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import movieReducer from "../features/slices/movieSlice"
import { storeExtraArg } from "./dependencies";

export const store = configureStore({
    reducer: movieReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: { extraArgument: storeExtraArg }
    })
});

export type AppStore = ReturnType<typeof configureStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;