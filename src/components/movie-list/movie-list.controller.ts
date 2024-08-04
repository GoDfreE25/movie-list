import { AppState } from "redux/store";
import { Mode, Movie } from "../../services/movie.model";
import { MovieService } from "../../services/movie.service";
import { StateController } from "../../state-controller";

export type MovieDetailsState = {
  movies: Movie[];
  isOpen: boolean;
  data: Movie | null;
  mode: Mode;
};

const defaultState: MovieDetailsState = {
  movies: [],
  isOpen: false,
  data: {
    title: "",
    description: "",
    actors: [],
    director: "",
    genre: [],
    rating: 0,
    release_date: "",
    image: "",
    id: 0,
  },
  mode: Mode.View,
};

const stateController = new StateController<MovieDetailsState>(
  "MOVIE_DETAILS",
  defaultState
);

class Actions {
  public static init() {
    return async (dispatch) => {
      const movies = await MovieService.getAllMovies();
      dispatch(
        stateController.setState((prev) => ({
          ...prev,
          movies,
        }))
      );
    };
  }

  public static closeModal() {
    return (dispatch) => {
      dispatch(
        stateController.setState((prev) => ({
          ...prev,
          isOpen: false,
        }))
      );
    };
  }

  public static deleteMovie(id: number) {
    return async (dispatch) => {
      await MovieService.deleteMovie(id);
      dispatch(
        stateController.setState((prev) => ({
          ...prev,
          movies: prev.movies.filter((movie) => movie.id !== id),
        }))
      );
    };
  }

  public static createMovie() {
    return async (dispatch, getState: () => AppState) => {
      const uniqueId = () => Math.round(Date.now() * Math.random());
      const { data } = getState().movie_list;
      const newMovie = await MovieService.createMovie({
        ...data,
        id: uniqueId(),
      });
      dispatch(
        stateController.setState((prevState) => ({
          ...prevState,
          movies: [...prevState.movies, newMovie],
        }))
      );
      dispatch(Actions.closeModal());
    };
  }

  public static editMovie(movieId: number, data: Movie) {
    return async (dispatch) => {
      const updatedMovie = await MovieService.updateMovie(movieId, data);
      dispatch(
        stateController.setState((prevState) => ({
          ...prevState,
          movies: prevState.movies.map((movie) =>
            movie.id === movieId ? updatedMovie : movie
          ),
        }))
      );
      dispatch(Actions.closeModal());
    };
  }

  public static onMovieFieldChange(values: Partial<Movie>) {
    return (dispatch, getState: () => AppState) => {
      const dataValues = values;
      dispatch(
        stateController.setState((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            ...dataValues,
          },
        }))
      );
      // if (getState().movie.didTryToSave) {
      //   dispatch(Actions.fieldValidation());
      // }
    };
  }

  public static openCreateEditModal(mode: Mode, movieId?: number) {
    return async (dispatch) => {
      let movieData;
      if (movieId) {
        movieData = await MovieService.getMovieById(movieId);
      }
      dispatch(
        stateController.setState((prevState) => ({
          ...prevState,
          mode,
          data: movieData || defaultState.data,
          isOpen: true,
        }))
      );
    };
  }

  public static addMovieToFavorite(id: number) {
    return async (dispatch, getState: () => AppState) => {
      const { movies } = getState().movie_list;
      const selectedMovie = movies.find((movie) => {
        return movie.id === id;
      });

      await MovieService.updateMovie(id, {
        ...selectedMovie,
        favorite: true,
      });

      dispatch(Actions.init());
    };
  }
}

class Selectors {}

const reducer = stateController.getReducer();
export { reducer, Actions, Selectors, stateController as Controller };
