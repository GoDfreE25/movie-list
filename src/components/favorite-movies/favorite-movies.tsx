// FavoriteMovies.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // If you're using Axios for API requests
import { Movies } from "../movie-list/movie-list";
import { useNavigate } from "react-router-dom";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IconButton, Typography } from "@mui/material";
import "./favorite-movies.scss";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite movies:", error);
      });
  }, []);

  const handleDislike = (id: number) => {
    const selectedMovie = movies.find((movie) => {
      return movie.id === id;
    });

    delete selectedMovie?.favorite;

    axios
      .put(`http://localhost:3001/movies/${id}`, selectedMovie)
      .then(() => {
        const updatedMovies = movies.map((movie) => {
          if (movie.id === id) {
            return selectedMovie as Movies;
          }
          return movie;
        });
        setMovies(updatedMovies);
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  };

  return (
    <div>
      <header className="header">
        <span className="title">Favorite Movies</span>
        <IconButton onClick={() => navigate("/")}>
          <KeyboardBackspaceIcon sx={{ color: "white" }} />
        </IconButton>
      </header>
      <ul className="movies_container">
        {movies
          .filter((el) => el.favorite)
          .map((movie) => (
            <li key={movie.id} className="movie_container">
              <div className="movie_image">
                <img className="image" src={movie.image} alt={movie.title} />
                <div className="button">
                  <IconButton onClick={() => handleDislike(movie.id)}>
                    <HeartBrokenIcon sx={{ color: "white" }} />
                  </IconButton>
                </div>
              </div>
              <div className="info_container">
                <Typography
                  sx={{ color: "white" }}
                  variant="h5"
                  component="div"
                >
                  {movie.title}
                </Typography>
                <Typography sx={{ color: "white", fontSize: "18px" }}>
                  Rating: {movie.rating}
                </Typography>
                <Typography sx={{ color: "white", fontSize: "18px" }}>
                  Release Date: {movie.release_date}
                </Typography>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FavoriteMovies;
