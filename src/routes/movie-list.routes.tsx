import React from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "./route-names";
import { SomethingWentWrong } from "../components/errors/something-went-wrong";
import MovieList from "../components/movie-list/movie-list";

export const MovieRoutes = () => {
  return (
    <Routes>
      <Route
        path={Paths.MovieList}
        errorElement={<SomethingWentWrong />}
        element={<MovieList />}
      />
      {/* <Route
        path={Paths.ForgotPassword}
        errorElement={<SomethingWentWrong />}
        element={<ForgotPassword />}
      />
      <Route
        path={Paths.ResetPassword}
        errorElement={<SomethingWentWrong />}
        element={<ResetPassword />}
      /> */}
    </Routes>
  );
};
