import React from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "./route-names";
import { SomethingWentWrong } from "../components/errors/something-went-wrong";
import MovieList from "../components/movie-list/movie-list";
import MovieDetails from "../components/movie-details/movie-details";
import FavoriteMovies from "../components/favorite-movies/favorite-movies";

export const MovieRoutes = () => {
  return (
    <Routes>
      <Route
        path={Paths.MovieList}
        errorElement={<SomethingWentWrong />}
        element={<MovieList />}
      />
      <Route
        path={Paths.MovieDetails}
        errorElement={<SomethingWentWrong />}
        element={<MovieDetails />}
      />
      <Route
        path={Paths.FavoriteMovies}
        errorElement={<SomethingWentWrong />}
        element={<FavoriteMovies />}
      />
    </Routes>
  );
};
