import React, { useState, useEffect, useCallback, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Chip, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddEditMovie from "../add-edit-movie/add-edit-movie";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import debounce from "lodash/debounce";
import { Mode, Movie } from "services/movie.model";
import { Actions as MovieListActions } from "./movie-list.controller";
import { connect } from "react-redux";
import { AppState } from "../../redux/store";
import "./movie-list.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.4),
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
  color: alpha(theme.palette.common.white, 0.6),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 1),
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    "&::placeholder": {
      color: alpha(theme.palette.common.white, 1),
    },
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

type StateProps = {
  movies: Movie[];
};

type DispatchProps = {
  init: () => void;
  deleteMovie: (id: number) => void;
  openCreateEditModal: (mode: Mode, movieId?: number) => void;
};

type Props = StateProps & DispatchProps;

const MovieList: FC<Props> = ({
  init,
  deleteMovie,
  openCreateEditModal,
  movies,
}) => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

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
            } as Movie;
          }
          return movie;
        });
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  };
  const debouncedHandleChange = useCallback(
    debounce((inputValue) => {
      if (inputValue.trim() !== "") {
        searchMovies(inputValue);
      } else {
        init();
      }
    }, 1000),
    []
  );

  const searchMovies = async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/movies?title_like=${query}`
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    debouncedHandleChange(inputValue);
  };

  return (
    <div className="container">
      <header className="movie_header">
        <div className="search_container">
          <div className="button_container">
            <Button
              sx={{
                fontWeight: 600,
                color: "white",
                borderColor: "gray",
                "&:hover": {
                  borderColor: "white",
                },
              }}
              variant="outlined"
              onClick={() => navigate("/favorite")}
            >
              Favorite
            </Button>
            <Button
              sx={{
                fontWeight: 600,
                color: "white",
                borderColor: "gray",
                "&:hover": {
                  borderColor: "white",
                },
              }}
              variant="outlined"
              onClick={() => openCreateEditModal(Mode.Add)}
            >
              Add movie
            </Button>
          </div>
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
                      deleteMovie(movie.id);
                    }}
                  >
                    <DeleteIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      openCreateEditModal(Mode.Edit, movie.id);
                    }}
                  >
                    <EditIcon sx={{ color: "white" }} />
                  </IconButton>
                </div>
              </Link>
              <div className="info_container">
                <Typography
                  sx={{ color: "white", height: "65px" }}
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
      </body>
      <AddEditMovie />
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  movies: state.movie_list.movies,
});

const mapDispatchToProps: DispatchProps = {
  init: MovieListActions.init,
  deleteMovie: MovieListActions.deleteMovie,
  openCreateEditModal: MovieListActions.openCreateEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
