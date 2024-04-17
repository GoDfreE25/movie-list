import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movies } from "../movie-list/movie-list";
import { Typography } from "@mui/material";
import "./movie-details.scss";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movies | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
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

export default MovieDetails;
