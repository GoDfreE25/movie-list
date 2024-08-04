export type Movie = {
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

export enum Mode {
  Edit = "edit",
  Add = "add",
  View = "view",
}
