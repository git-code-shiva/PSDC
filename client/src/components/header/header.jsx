import React, { useContext, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SearchIcon from "@mui/icons-material/Search"; // Added search icon here
import { tokenStorage } from "../../App";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { MenuItem, Select } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
  },
  marginLeft: 0,
  width: "100%",
  height: "40px",
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const [token, setToken] = useContext(tokenStorage);
  const [searchBy, setSearchBy] = useState("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
  };

  const handleSearchClick = () => {
    navigate("/list");
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  return (
    <div className="header_container">
      <div className="left_container">
        <Link to="/home">
          <HomeIcon sx={{ fontSize: 40, color: "white" }} />
        </Link>
        <RecentActorsIcon
          sx={{ fontSize: 40, cursor: "pointer", color: "white" }}
        />
        <Search onClick={handleSearchClick}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Select
          value={searchBy}
          onChange={handleSearchByChange}
          sx={{ marginLeft: "5px", backgroundColor: "white", height: "40px" }}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="mobile">Mobile</MenuItem>
          <MenuItem value="id">ID</MenuItem>
        </Select>
      </div>

      <div className="right_container">
        <LogoutIcon
          sx={{ fontSize: 40, cursor: "pointer", color: "white" }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
