import { baseAxiosInstance } from "../axios-config";
import { Movie } from "./movie.model";

export class MovieService {
  public static async getAllMovies() {
    const { data } = await baseAxiosInstance.get<Movie[]>(
      `http://localhost:3001/movies`
    );
    return data;
  }

  public static async getMovieById(id: number) {
    const { data } = await baseAxiosInstance.get<Movie>(
      `http://localhost:3001/movies/${id}`
    );
    return data;
  }

  public static async deleteMovie(movieId: number) {
    return baseAxiosInstance.delete(`http://localhost:3001/movies/${movieId}`);
  }

  public static async updateMovie(movieId: number, movieData: Movie) {
    const { data } = await baseAxiosInstance.put<Movie>(
      `http://localhost:3001/movies/${movieId}`,
      movieData
    );
    return data;
  }

  public static async createMovie(movieData: Movie) {
    const { data } = await baseAxiosInstance.post<Movie>(
      "http://localhost:3001/movies",
      movieData
    );
    return data;
  }
}
