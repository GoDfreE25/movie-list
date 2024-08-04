import { Movie } from "services/movie.model";

export function isEmptyValue(obj: Movie) {
  return Object.values(obj).some((value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === null || value === undefined || value === "" || value === 0;
  });
}
