import React, { useContext, useState } from "react";
import Header from "../header/header";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
import { tokenStorage } from "../../App";
import { useNavigate } from "react-router-dom";

const DeepSearch = () => {
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [token] = useContext(tokenStorage);

  const navigate = useNavigate();

  const patientsWithDateTime = searchResults.map((patient) => {
    const date = new Date(patient.createdAt);
    return {
      ...patient,
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      time: date.toLocaleTimeString(),
    };
  });

  const sortedPatients = patientsWithDateTime.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setErrorMessage("");
      setSearchResults([]);
      const response = await axios.get(
        `http://localhost:8081/searchBy${capitalizeFirstLetter(
          searchType
        )}/${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      setErrorMessage("Error searching patients. Please try again later.");
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (token) {
    return (
      <>
        <Header />
        <Box display="flex" alignItems="center" padding={2} mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            label={`Search by ${capitalizeFirstLetter(searchType)}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 4, mr: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ flex: 1 }}>
            <InputLabel id="search-type-label">Search Type</InputLabel>
            <Select
              labelId="search-type-label"
              id="search-type"
              value={searchType}
              onChange={handleSearchTypeChange}
              label="Search Type"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="mobile">Mobile</MenuItem>
              <MenuItem value="id">ID</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSearch}
            style={{ height: "54px", marginLeft: "8px" }}
          >
            Search
          </Button>
        </Box>
        {errorMessage && <p>{errorMessage}</p>}
        {searchResults.length > 0 && (
          <div>
            <h2>Search Results:</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Time
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Refered By
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Patient Name
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Gender
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Age
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      City
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Address
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Mobile
                    </TableCell>
                    {/* Add other columns here */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedPatients.map((patient) => (
                    <TableRow key={patient._id}>
                      <TableCell>{patient.date}</TableCell>
                      <TableCell>{patient.time}</TableCell>
                      <TableCell>{patient.referalDoc}</TableCell>
                      <TableCell>{patient.patientName}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.city}</TableCell>
                      <TableCell>{patient.address}</TableCell>
                      <TableCell>{patient.mobile}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </>
    );
  } else {
    navigate("/");
  }
};

export default DeepSearch;
