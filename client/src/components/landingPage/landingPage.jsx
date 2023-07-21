import React from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientFormContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const FormPaper = styled(Paper)({
  padding: "16px",
  maxWidth: "400px",
  width: "100%",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const ErrorMessage = styled("span")({
  color: "red", // Error message color
  fontSize: "12px",
});

const LandingPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post("http://localhost:8081/create/patient", data);
    console.log(data);
    navigate("/list");
  };

  return (
    <PatientFormContainer>
      <FormPaper elevation={3}>
        <h2>Add Patient</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Referral Doctor"
            variant="outlined"
            {...register("referalDoc")}
          />
          <TextField
            label="Patient Name"
            variant="outlined"
            {...register("patientName", {
              required: "Patient Name is required",
            })}
          />
          {errors.patientName && (
            <ErrorMessage>{errors.patientName.message}</ErrorMessage>
          )}

          {/* Radio Group for Gender */}
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            )}
          />
          {errors.gender && (
            <ErrorMessage>{errors.gender.message}</ErrorMessage>
          )}

          <TextField label="City" variant="outlined" {...register("city")} />
          <TextField
            label="Address"
            variant="outlined"
            {...register("address")}
          />
          <TextField
            label="Mobile"
            variant="outlined"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid mobile number",
              },
            })}
          />
          {errors.mobile && (
            <ErrorMessage>{errors.mobile.message}</ErrorMessage>
          )}
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Form>
      </FormPaper>
    </PatientFormContainer>
  );
};

export default LandingPage;
