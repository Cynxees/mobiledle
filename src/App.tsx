import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from './pages/LandingPage';
import ClassicPage from './pages/ClassicPage';
import DevPage from './pages/DevPage';


function App() {
  const [count, setCount] = useState(0)

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<LandingPage />} />
          <Route path="classic" element={<ClassicPage />} />
          <Route path="dev" element={<DevPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
