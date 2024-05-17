import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ClassicPage from "./pages/ClassicPage";
import DevPage from "./pages/DevPage";
import DevPage2 from "./pages/DevPage2";
import DevPage3 from "./pages/DevPage3";
import DevPage5 from "./pages/DevPage5";
import 'animate.css';
import SurvivalPage from "./pages/SurvivalPage";
import ArcadeLandingPage from "./pages/ArcadePage/ArcadeLandingPage";
import ArcadeRoomPage from "./pages/ArcadePage/ArcadeRoomPage";
import ErrorPage from "./pages/ErrorPage";
import MirrorPage from "./pages/MirrorPage";
import MemoryPage from "./pages/MemoryPage";
import BlurPage from "./pages/BlurPage";
import LandingPage2 from "./pages/LandingPage2";



function App() {
  return (
    
      <BrowserRouter>

        <Routes>

          <Route path="" element={<LandingPage />} />

          <Route path="classic" element={<ClassicPage />} />
          <Route path="blur" element={<BlurPage />} />
          <Route path="dev" element={<DevPage />} />
          <Route path="dev2" element={<DevPage2 />} />
          <Route path="mirror" element={<MirrorPage />} />
          <Route path="survival" element={<SurvivalPage />} />
          <Route path="memory" element={<MemoryPage />} />

          <Route path="arcade" element={<ArcadeLandingPage />} />
          <Route path="arcade/:code" element={<ArcadeRoomPage />}/>

          <Route path="error" element={<ErrorPage />}/>
          <Route path="error/:code" element={<ErrorPage />}/>
          <Route path=":code" element={<ErrorPage />}/>

          <Route path="dev" element={<DevPage />} />
          <Route path="dev2" element={<DevPage2 />} />
          <Route path="dev3" element={<DevPage3 />} />
          <Route path="dev4" element={<LandingPage2 />} />
          <Route path="dev5" element={<DevPage5 />} />

        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
