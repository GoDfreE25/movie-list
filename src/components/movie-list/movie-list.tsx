import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./movie-list.scss";
import AddEditMovie, { Mode } from "../add-edit-movie/add-edit-movie";

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
  favorite?: boolean;
};

const MovieList = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/movies/${id}`)
      .then(() => {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  const handleFavorite = (id: number) => {
    const selectedMovie = movies.find((movie) => {
      return movie.id === id;
    });

    axios
      .put(`http://localhost:3001/movies/${id}`, {
        ...selectedMovie,
        favorite: true,
      })
      .then(() => {
        const updatedMovies = movies.map((movie) => {
          if (movie.id === id) {
            return {
              ...selectedMovie,
              favorite: true,
            } as Movies;
          }
          return movie;
        });
        setMovies(updatedMovies);
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  };

  const handleAdd = () => {
    setSelectedMovie(null);
    setOpen(true);
  };
  const handleEdit = (movie: Movies) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  return (
    <div>
      <header className="header">
        <span className="title">Movie List</span>
        <Button onClick={() => navigate("/favorite")}>Favorite</Button>
        <Button onClick={() => handleAdd()}>Add movie</Button>
      </header>
      <ul className="movies_container">
        {movies.map((movie) => (
          <li key={movie.id} className="movie_container">
            <Link className="link" to={`/movies/${movie.id}`}>
              <img className="image" src={movie.image} alt={movie.title} />
              <div className="buttons">
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavorite(movie.id);
                  }}
                >
                  <FavoriteIcon
                    sx={{ color: movie.favorite ? "red" : "white" }}
                  />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(movie.id);
                  }}
                >
                  <DeleteIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(movie);
                  }}
                >
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
              </div>
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
          </li>
        ))}
      </ul>
      <AddEditMovie
        mode={selectedMovie ? Mode.Edit : Mode.Add}
        movies={movies}
        selectedMovie={selectedMovie}
        open={open}
        onClose={setOpen}
        setMovies={setMovies}
      />
    </div>
  );
};

export default MovieList;
