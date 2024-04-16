import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import "./movie-list.scss";

export type Movies = {
  id: number;
  title: string;
  description: string;
  rating: number;
  release_date?: string;
  genre: Array<string>;
  actors: Array<string>;
  director: string;
  image: string;
};

const MovieList = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  // const handleDelete = (id) => {
  // };

  // const handleFavorite = (id) => {
  // };

  return (
    <div>
      <header className="header">
        <span className="title">Movie List</span>
      </header>
      <ul className="movies_container">
        {movies.map((movie) => (
          <li key={movie.id} className="movie_container">
            <Link className="link" to={`/movies/${movie.id}`}>
              <img className="image" src={movie.image} alt={movie.title} />
            </Link>
            <div className="info_container">
              <Typography sx={{ color: "white" }} variant="h5" component="div">
                {movie.title}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "18px" }}>
                Rating: {movie.rating}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "18px" }}>
                Release Date: {movie.release_date}
              </Typography>
            </div>
            <div>
              <IconButton onClick={() => {}}>
                <FavoriteIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={() => {}}>
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
