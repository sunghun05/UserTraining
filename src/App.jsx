import {BrowserRouter, Route, Routes} from "react-router-dom"
import Learning from './pages/Learning'
import Login from "./pages/Login"
import Home from "./pages/Home"
import PrivateRoute from "./components/PrivateRoute"
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/learning"
            element={
              <PrivateRoute>
                <Learning />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
