import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ClassicPage from "./pages/ClassicPage";
import DevPage from "./pages/DevPage";
import DevPage2 from "./pages/DevPage2";
import 'animate.css';
import SurvivalPage from "./pages/SurvivalPage";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="classic" element={<ClassicPage />} />
          <Route path="dev" element={<DevPage />} />
          <Route path="dev2" element={<DevPage2 />} />
          <Route path="survival" element={<SurvivalPage />} />
          
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
