import React from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import "./login.css";
import backgroundImage from "../../assets/loginBack.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  background: `url(${backgroundImage}) center/cover no-repeat`,
});

const LoginFormPaper = styled(Paper)({
  padding: "16px",
  maxWidth: "400px",
  width: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8081/login", data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContainer>
      <LoginFormPaper elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email/Phone"
            type="string"
            variant="outlined"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Form>
      </LoginFormPaper>
    </LoginContainer>
  );
};

export default LoginForm;
