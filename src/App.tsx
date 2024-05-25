import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ClassicPage from "./pages/ClassicPage";
import DevPage from "./pages/DevPage";
import DevPage3 from "./pages/DevPage3";
import DevPage4 from "./pages/DevPage4";
import 'animate.css';
import SurvivalPage from "./pages/SurvivalPage";
import ArcadeLandingPage from "./pages/ArcadePage/ArcadeLandingPage";
import ArcadeRoomPage from "./pages/ArcadePage/ArcadeRoomPage";
import ErrorPage from "./pages/ErrorPage";
import MirrorPage from "./pages/MirrorPage";
import MemoryPage from "./pages/MemoryPage";
import BlurPage from "./pages/BlurPage";
import ArcadeLandingParticlePage from "./pages/ArcadePage/ArcadeLandingParticlePage";
import DiscoPage from "./pages/DiscoPage";



function App() {
  return (
    
      <BrowserRouter>

        <Routes>

          <Route path="" element={<LandingPage />} />

          <Route path="classic" element={<ClassicPage />} />
          <Route path="blur" element={<BlurPage />} />
          <Route path="disco" element={<DiscoPage />} />
          <Route path="mirror" element={<MirrorPage />} />
          <Route path="survival" element={<SurvivalPage />} />
          <Route path="memory" element={<MemoryPage />} />

          <Route path="arcade" element={<ArcadeLandingParticlePage />} />
          <Route path="arcade/:code" element={<ArcadeRoomPage />}/>

          <Route path="error" element={<ErrorPage />}/>
          <Route path="error/:code" element={<ErrorPage />}/>
          <Route path=":code" element={<ErrorPage />}/>

          <Route path="dev" element={<DevPage />} />
          <Route path="dev3" element={<DevPage3 />} />
          <Route path="dev4" element={<DevPage4 />} />

        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
