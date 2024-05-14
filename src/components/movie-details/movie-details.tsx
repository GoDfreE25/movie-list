import { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Actions as MovieDetailsActions } from "./movie-details.controller";
import { Movies } from "../movie-list/movie-list";
import { Typography } from "@mui/material";
import "./movie-details.scss";
import { AppState } from "../../redux/store";
import { Movie } from "../../services/movie.model";

type StateProps = {
  movie: Movie;
};

type DispatchProps = {
  init: (id: number) => void;
};

type Props = StateProps & DispatchProps;

const MovieDetails: FC<Props> = ({ init, movie }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      init(+id);
    } else {
      console.error("Something went wrong");
    }
  }, [id]);

  return (
    <div>
      {movie ? (
        <div className="detail_container">
          <img className="image" src={movie.image} alt={movie.title} />
          <div>
            <div className="title_container">
              <Typography sx={{ color: "white" }} variant="h5" component="div">
                {movie.title}
              </Typography>
            </div>

            <div className="info_container">
              <span className="description">
                Description: {movie.description}
              </span>
              <span className="title">Actors: {movie.actors.join(", ")}</span>
              <span className="title">Director: {movie.director}</span>
              <span className="title">Genre: {movie.genre.join(", ")}</span>
              <span className="title">Rating: {movie.rating}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  movie: state.movie_details.movie,
});

const mapDispatchToProps: DispatchProps = {
  init: MovieDetailsActions.init,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
