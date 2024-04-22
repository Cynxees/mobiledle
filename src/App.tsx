import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ClassicPage from "./pages/ClassicPage";
import DevPage from "./pages/DevPage";
import DevPage2 from "./pages/DevPage2";
import 'animate.css';
import SurvivalPage from "./pages/SurvivalPage";
import ArcadeLandingPage from "./pages/ArcadePage/ArcadeLandingPage";
import ArcadeRoomPage from "./pages/ArcadePage/ArcadeRoomPage";
import ErrorPage from "./pages/ErrorPage";



function App() {
  return (
    
      <BrowserRouter>

        <Link to={'heroes/' + 1} />
        <Routes>

          <Route path="" element={<LandingPage />} />

          <Route path="classic" element={<ClassicPage />} />
          <Route path="dev" element={<DevPage />} />
          <Route path="dev2" element={<DevPage2 />} />
          <Route path="survival" element={<SurvivalPage />} />

          <Route path="arcade" element={<ArcadeLandingPage />} />
          <Route path="arcade/:code" element={<ArcadeRoomPage />}/>

          <Route path="error" element={<ErrorPage />}/>
          <Route path="error/:code" element={<ErrorPage />}/>
          <Route path=":code" element={<ErrorPage />}/>


        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
