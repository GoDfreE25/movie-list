import React from "react";
import "./App.scss";
import { MovieRoutes } from "./routes/movie-list.routes";

export const App = () => {
  return (
    <div className="app">
      <MovieRoutes />
    </div>
  );
};
