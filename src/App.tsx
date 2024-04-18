import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ClassicPage from "./pages/ClassicPage";
import DevPage from "./pages/DevPage";
import 'animate.css';
import SurvivalPage from "./pages/SurvivalPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<LandingPage />} />
            <Route path="classic" element={<ClassicPage />} />
            <Route path="dev" element={<DevPage />} />
            <Route path="survival" element={<SurvivalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
