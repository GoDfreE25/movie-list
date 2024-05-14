import { Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";

type Props = React.HTMLAttributes<HTMLDivElement> & {};

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

export function Header(props: Props) {
  const navigate = useNavigate();
  return (
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
            onClick={() => {}}
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
            value=""
            onChange={() => {}}
            placeholder="Search movies by title..."
          />
        </Search>
      </div>
    </header>
  );
}
