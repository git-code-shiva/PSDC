import React from "react";
// import "./App.css";
import LoginForm from "./components/login/login";
import LandingPage from "./components/landingPage/landingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import PatientList from "./components/list/patientList";

export const tokenStorage = createContext();

function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <tokenStorage.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/list" element={<PatientList />} />
          </Routes>
        </BrowserRouter>
      </tokenStorage.Provider>
    </div>
  );
}

export default App;
