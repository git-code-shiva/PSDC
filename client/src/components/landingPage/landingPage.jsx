import React, { useContext } from "react";
import Button from "@mui/material/Button";
// import "./landingPage.css";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/loginBack.png";
import { Container } from "@mui/material";
import Header from "../header/header";
import { tokenStorage } from "../../App";

const CenteredDiv = styled("div")({
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const LandingPageContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: `url(${backgroundImage}) center/cover no-repeat`,
});

const LandingPage = () => {
  const [token] = useContext(tokenStorage);
  const navigate = useNavigate();

  const buttonStyle = {
    textTransform: "none",
  };

  if (token) {
    return (
      <>
        <Header />
        <LandingPageContainer>
          <CenteredDiv>
            <Link to="/newPatient">
              <Button variant="contained" sx={buttonStyle}>
                New Patient
              </Button>
            </Link>

            <Link to="/followup">
              <Button variant="contained" sx={buttonStyle}>
                Follow-up Patient
              </Button>
            </Link>
          </CenteredDiv>
        </LandingPageContainer>
      </>
    );
  } else {
    navigate("/");
  }
};

export default LandingPage;
