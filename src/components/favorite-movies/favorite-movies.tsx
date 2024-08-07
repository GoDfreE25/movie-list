import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Chip, IconButton, Typography } from "@mui/material";
import "./favorite-movies.scss";
import { Movie } from "services/movie.model";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
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
            return selectedMovie as Movie;
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
                <div className="footer">
                  <Chip color="primary" size="small" label={movie.rating} />
                  <Typography sx={{ color: "white", fontSize: "18px" }}>
                    Date: {movie.release_date}
                  </Typography>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FavoriteMovies;
