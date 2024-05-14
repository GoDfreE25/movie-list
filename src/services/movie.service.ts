import { baseAxiosInstance } from "../axios-config";
import { Movie } from "./movie.model";

export class MovieService {
  // public static async getAllDepartaments() {
  //   const { data } = await baseAxiosInstance.get<AllDepartmentsByPage>(
  //     `/departments/all-by-page`
  //   );
  //   return data;
  // }

  public static async getMovieById(id: number) {
    const { data } = await baseAxiosInstance.get<Movie>(
      `http://localhost:3001/movies/${id}`
    );
    return data;
  }

  // public static async deleteDepartament(departmentId: string) {
  //   return baseAxiosInstance.delete(`/departments/delete/${departmentId}`);
  // }

  // public static async updateDepartament(
  //   departmentId: string,
  //   departmentData: CreateDepartamentData
  // ) {
  //   const { data } = await baseAxiosInstance.put<Department>(
  //     `/departments/update/${departmentId}`,
  //     departmentData
  //   );
  //   return data;
  // }

  // public static async createDepartament(departmentData: CreateDepartamentData) {
  //   const { data } = await baseAxiosInstance.post<Department>(
  //     "/departments/create",
  //     departmentData
  //   );
  //   return data;
  // }
}
