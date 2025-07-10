import {BrowserRouter, Route, Routes} from "react-router-dom"
import Learning from './pages/Learning'
import Login from "./pages/Login"
import Home from "./pages/Home"
import EntireProcess from "./pages/Process/Tab/EntireProcess.jsx"
import Result from "./pages/Result"
import Data from "./pages/Data"
import Server from "./pages/Server"
import PrivateRoute from "./components/PrivateRoute"
import './App.css';
import { AuthProvider, useAuth } from "./contexts/AuthContext";


function AppContent() {
  const { loggedIn } = useAuth();

  if (loggedIn === null) return <div>자동 로그인 중...</div>;

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route
            path="/learning"
            element={
              <PrivateRoute>
                <Learning />
              </PrivateRoute>
            }
          />
        <Route path="/process/all" element={
            <PrivateRoute>
                <EntireProcess />
            </PrivateRoute>
        }/>
        <Route path="/result" element={
            <PrivateRoute>
                <Result />
            </PrivateRoute>
        }/>
        <Route path="/data" element={
            <PrivateRoute>
                <Data />
            </PrivateRoute>
        }/>
        <Route path="/server" element={
            <PrivateRoute>
                <Server />
            </PrivateRoute>
        }/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
