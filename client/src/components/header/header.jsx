import React, { useContext } from "react";
import "./header.css";
// import { SvgIcon } from "@mui/material";
// import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { tokenStorage } from "../../App";

// function HomeIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//     </SvgIcon>
//   );
// }

const Header = () => {
  const [token, setToken] = useContext(tokenStorage);
  const handleLogout = () => {
    setToken(null);
    // console.log("logOut===>", token);
  };
  return (
    <div className="header_container">
      <Link to="/home">
        <HomeIcon sx={{ fontSize: 40, color: "white" }} />
      </Link>
      <Link to="/list">
        <RecentActorsIcon
          sx={{ fontSize: 40, cursor: "pointer", color: "white" }}
        />
      </Link>
      <LogoutIcon
        sx={{ fontSize: 40, cursor: "pointer", color: "white" }}
        onClick={handleLogout}
      />
    </div>
  );
};

export default Header;
