import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Player1 from "./pages/Player1";
import Player2 from "./pages/Player2";
import Summarize from "./pages/Summarize";
import Final from "./pages/Final";
import { FormProvider } from "./context/FormContext"; // Import the context provider

function App() {
  return (
    <FormProvider> {/* Wrap the whole app with FormProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player1" element={<Player1 />} />
          <Route path="/player2" element={<Player2 />} />
          <Route path="/summarize" element={<Summarize />} />
          <Route path="/final" element={<Final />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;

