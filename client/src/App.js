import React from "react";
// import "./App.css";
import LoginForm from "./components/login/login";
import LandingPage from "./components/landingPage/landingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import PatientList from "./components/list/patientList";
import NewPatient from "./components/newPatient/newPatient";
import DeepSearch from "./components/deepSearch/deepSearch";

export const tokenStorage = createContext();

function App() {
  const [token, setToken] = useState(null);
  //here is the fucking 1st branch change
  //checking...
  //helooijf

  return (
    <div className="App">
      <tokenStorage.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/newPatient" element={<NewPatient />} />
            <Route path="/list" element={<PatientList />} />
            <Route path="/dSearch" element={<DeepSearch />} />
          </Routes>
        </BrowserRouter>
      </tokenStorage.Provider>
    </div>
  );
}

export default App;
