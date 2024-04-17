import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddEditMovie, { Mode } from "../add-edit-movie/add-edit-movie";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import debounce from "lodash/debounce";
import "./movie-list.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchAllMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchAllMovies();
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

  const debouncedHandleChange = useCallback(
    debounce((inputValue) => {
      if (inputValue.trim() !== "") {
        searchMovies(inputValue);
      } else {
        fetchAllMovies();
      }
    }, 1000),
    []
  );

  const searchMovies = async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/movies?title_like=${query}`
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    debouncedHandleChange(inputValue);
  };

  return (
    <div className="container">
      <header className="movie_header">
        <div style={{ width: "55%" }} />
        <div className="search_container">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search movies by title..."
            />
          </Search>
          <div>
            <Button onClick={() => navigate("/favorite")}>Favorite</Button>
            <Button onClick={() => handleAdd()}>Add movie</Button>
          </div>
        </div>
      </header>
      <body className="body">
        <span className="title">Movie List</span>
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
      </body>
      <AddEditMovie
        mode={selectedMovie ? Mode.Edit : Mode.Add}
        selectedMovie={selectedMovie}
        open={open}
        onClose={setOpen}
        setMovies={setMovies}
      />
    </div>
  );
};

export default MovieList;
