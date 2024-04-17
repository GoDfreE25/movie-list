import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Movies } from "../movie-list/movie-list";
import { Button, TextField } from "@mui/material";
import Label from "../helpers/label/label";
import "./add-edit-movie.scss";
import { isEmptyValue } from "../helpers/is-empty-value/is-empty-value";

export enum Mode {
  Edit = "edit",
  Add = "add",
  View = "view",
}

interface AddEditMovieProps {
  mode: Mode;
  setMovies: React.Dispatch<React.SetStateAction<Movies[]>>;
  selectedMovie: Movies | null;
  open: boolean;
  onClose: (value: boolean) => void;
}

const AddEditMovie: React.FC<AddEditMovieProps> = ({
  mode = Mode.View,
  open,
  selectedMovie,
  onClose,
  setMovies,
}) => {
  const emptyMovie = {
    title: "",
    description: "",
    actors: [],
    director: "",
    genre: [],
    rating: 0,
    release_date: "",
    image: "",
    id: 0,
  };
  const [formData, setFormData] = useState<Movies>(emptyMovie);
  const uniqueId = () => Math.round(Date.now() * Math.random());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      id:
        mode === Mode.Edit && selectedMovie !== null
          ? Number(selectedMovie.id)
          : uniqueId(),
      [name]: value,
    }));
  };

  const checkEmptyValue = useMemo(() => {
    return isEmptyValue(formData);
  }, [formData]);

  useEffect(() => {
    if (mode === Mode.Edit && selectedMovie !== null) {
      setFormData(selectedMovie);
    } else {
      setFormData(emptyMovie);
    }
  }, [mode, selectedMovie]);

  const handleAddEditMovie = () => {
    const url =
      mode === Mode.Edit
        ? `http://localhost:3001/movies/${selectedMovie?.id}`
        : "http://localhost:3001/movies";
    const method = mode === Mode.Edit ? "put" : "post";

    axios({
      method,
      url,
      data: formData,
    })
      .then((response) => {
        setMovies((prevMovies) => {
          if (mode === Mode.Edit) {
            return prevMovies.map((movie) => {
              if (movie.id === formData.id) {
                return response.data;
              }
              return movie;
            });
          } else {
            return [response.data, ...prevMovies];
          }
        });
        onClose(false);
        setFormData(emptyMovie);
      })
      .catch((error) => {
        console.error("Error saving movie:", error);
      });
  };

  return (
    <Dialog
      PaperProps={{ className: "dialog" }}
      onClose={() => onClose(false)}
      open={open}
    >
      <DialogTitle sx={{ color: "white", textAlign: "center" }}>
        {mode === Mode.Edit ? "Edit Movie" : "Add Movie"}
      </DialogTitle>
      <div className="form_container">
        <div>
          <Label>Title</Label>
          <TextField
            fullWidth
            className="text_field"
            variant="outlined"
            placeholder="Enter title"
            type="text"
            size="small"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Description</Label>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            className="text_field"
            placeholder="Enter description"
            type="text"
            size="small"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Actors</Label>
          <TextField
            fullWidth
            placeholder="Enter Actor"
            type="text"
            size="small"
            className="text_field"
            name="actors"
            value={formData.actors.join(",")}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                actors: e.target.value.split(","),
              }))
            }
          />
        </div>
        <div>
          <Label>Director</Label>
          <TextField
            fullWidth
            placeholder="Enter Director"
            type="text"
            size="small"
            className="text_field"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Genre</Label>
          <TextField
            fullWidth
            placeholder="Enter genre"
            type="text"
            size="small"
            className="text_field"
            name="genre"
            value={formData.genre.join(",")}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                genre: e.target.value.split(","),
              }))
            }
          />
        </div>
        <div>
          <Label>Rating</Label>
          <TextField
            fullWidth
            placeholder="Enter rating"
            type="number"
            size="small"
            className="text_field"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Release Date</Label>
          <TextField
            fullWidth
            placeholder="Enter rating"
            type="date"
            size="small"
            className="text_field"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Image URL</Label>
          <TextField
            fullWidth
            placeholder="Enter rating"
            type="text"
            size="small"
            className="text_field"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="button_container">
          <Button
            fullWidth
            onClick={() => handleAddEditMovie()}
            variant="contained"
            sx={{
              "&.Mui-disabled": {
                background: "rgb(46, 122, 157)",
                color: "#c0c0c0",
              },
            }}
            color="primary"
            disabled={checkEmptyValue}
          >
            {mode === Mode.Edit ? "Edit Movie" : "Add Movie"}
          </Button>
          <Button
            fullWidth
            onClick={() => {
              setFormData(emptyMovie);
              onClose(false);
            }}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddEditMovie;
