import {BrowserRouter, Route, Routes} from "react-router-dom"
import Learning from './pages/Learning'
import Login from "./pages/Login"
import Home from "./pages/Home"
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/learning" element={<Learning/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
