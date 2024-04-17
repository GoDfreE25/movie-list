import { Movies } from "../../movie-list/movie-list";

export function isEmptyValue(obj: Movies) {
  return Object.values(obj).some((value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === null || value === undefined || value === "" || value === 0;
  });
}
