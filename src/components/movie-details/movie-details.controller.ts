import { Movie } from "../../services/movie.model";
import { MovieService } from "../../services/movie.service";
import { StateController } from "../../state-controller";
import { emptyMovie } from "../helpers/movie";

export type MovieDetailsState = {
  movie: Movie;
  isLoading: boolean;
};

const defaultState: MovieDetailsState = {
  movie: emptyMovie,
  isLoading: false,
};

const stateController = new StateController<MovieDetailsState>(
  "MOVIE_DETAILS",
  defaultState
);

class Actions {
  public static init(id: number) {
    return async (dispatch) => {
      try {
        dispatch(stateController.setState({ isLoading: true }));
        const movie = await MovieService.getMovieById(id);

        dispatch(
          stateController.setState((prev) => ({
            ...prev,
            movie,
          }))
        );
      } finally {
        dispatch(stateController.setState({ isLoading: false }));
      }
    };
  }
}

class Selectors {}

const reducer = stateController.getReducer();
export { reducer, Actions, Selectors, stateController as Controller };
