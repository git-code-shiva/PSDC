import React, { useContext, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { tokenStorage } from "../../App";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const Header = () => {
  const [token, setToken] = useContext(tokenStorage);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
  };

  const handleDeepSearch = () => {
    navigate("/dSearch");
  };

  return (
    <div className="header_container">
      <div className="left_container">
        <Link to="/home">
          <HomeIcon sx={{ fontSize: 40, color: "white" }} />
        </Link>
        <Link to="/list">
          <RecentActorsIcon
            sx={{ fontSize: 40, cursor: "pointer", color: "white" }}
          />
        </Link>
      </div>

      <div className="right_container" style={{ display: "flex", gap: "35px" }}>
        <PersonSearchIcon
          sx={{ fontSize: 40, cursor: "pointer", color: "white" }}
          onClick={handleDeepSearch}
        />
        <LogoutIcon
          sx={{ fontSize: 40, cursor: "pointer", color: "white" }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
