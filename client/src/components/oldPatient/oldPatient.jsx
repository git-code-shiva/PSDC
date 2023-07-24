import React, { useContext } from "react";
import Header from "../header/header";
import { tokenStorage } from "../../App";
import { useNavigate } from "react-router-dom";

const OldPatient = () => {
  const [token] = useContext(tokenStorage);
  const navigate = useNavigate();
  if (token) {
    return (
      <div>
        <Header />
        <h1>old patioent</h1>
      </div>
    );
  } else {
    navigate("/");
  }
};

export default OldPatient;
