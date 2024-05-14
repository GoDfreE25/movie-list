import { configureStore } from "@reduxjs/toolkit";
import { reducer as MovieDetailsReducer } from "../components/movie-details/movie-details.controller";

const store = configureStore({
  reducer: {
    movie_details: MovieDetailsReducer,
  },

  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type GetStateFunction = () => AppState;

export default store;
