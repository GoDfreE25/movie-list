import { FC } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, TextField } from "@mui/material";
import Label from "../helpers/label/label";
import "./add-edit-movie.scss";
import { Actions as MovieListActions } from "../movie-list/movie-list.controller";
import { connect } from "react-redux";
import { AppState } from "../../redux/store";
import { Mode, Movie } from "services/movie.model";

type StateProps = {
  isOpen: boolean;
  selectedMovie: Movie | null;
  mode: Mode;
};

type DispatchProps = {
  closeModal: () => void;
  createMovie: (data: Movie) => void;
  editMovie: (movieId: number, data: Movie) => void;
  onMovieFieldChange: (values: Partial<Movie>) => void;
};

type Props = StateProps & DispatchProps;

const AddEditMovie: FC<Props> = ({
  mode,
  isOpen,
  selectedMovie,
  closeModal,
  createMovie,
  editMovie,
  onMovieFieldChange,
}) => {
  return (
    <Dialog
      PaperProps={{ className: "dialog" }}
      onClose={() => closeModal}
      open={isOpen}
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
            value={selectedMovie.title}
            onChange={(event) => {
              console.log({ title: event.target.value });
              onMovieFieldChange({ title: event.target.value });
            }}
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
            value={selectedMovie.description}
            onChange={(event) =>
              onMovieFieldChange({ description: event.target.value })
            }
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
            value={selectedMovie.actors.join(",")}
            onChange={(event) =>
              onMovieFieldChange({ actors: [event.target.value] })
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
            value={selectedMovie.director}
            onChange={(event) =>
              onMovieFieldChange({ director: event.target.value })
            }
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
            value={selectedMovie.genre}
            onChange={(event) =>
              onMovieFieldChange({ genre: [event.target.value] })
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
            value={selectedMovie.rating}
            onChange={(event) =>
              onMovieFieldChange({ rating: +event.target.value })
            }
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
            value={selectedMovie.release_date}
            onChange={(event) =>
              onMovieFieldChange({ release_date: event.target.value })
            }
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
            value={selectedMovie.image}
            onChange={(event) =>
              onMovieFieldChange({ image: event.target.value })
            }
          />
        </div>
        <div className="button_container">
          <Button
            fullWidth
            onClick={() =>
              mode === Mode.Edit
                ? editMovie(selectedMovie.id, selectedMovie)
                : createMovie(selectedMovie)
            }
            variant="contained"
            sx={{
              "&.Mui-disabled": {
                background: "rgb(46, 122, 157)",
                color: "#c0c0c0",
              },
            }}
            color="primary"
            // disabled={checkEmptyValue}
          >
            {mode === Mode.Edit ? "Edit Movie" : "Add Movie"}
          </Button>
          <Button
            fullWidth
            onClick={() => {
              closeModal();
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

const mapStateToProps = (state: AppState): StateProps => ({
  selectedMovie: state.movie_list.data,
  isOpen: state.movie_list.isOpen,
  mode: state.movie_list.mode,
});

const mapDispatchToProps: DispatchProps = {
  closeModal: MovieListActions.closeModal,
  createMovie: MovieListActions.createMovie,
  editMovie: MovieListActions.editMovie,
  onMovieFieldChange: MovieListActions.onMovieFieldChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditMovie);
