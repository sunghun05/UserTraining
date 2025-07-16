import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Project from "./pages/Project"
import Data from "./pages/Data"
import Server from "./pages/Server"

import EntireProcess from "./pages/Process/Tab/EntireProcess.jsx"
import ExecuteProcessDetail from "./pages/Process/Tab/ExecuteProcessDetail.jsx"
import ExecuteProcess from "./pages/Process/Tab/ExecuteProcess.jsx"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import './App.css';


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
        <Route path="/process/all" element={
            <PrivateRoute>
                <EntireProcess />
            </PrivateRoute>
        }/>
        <Route path="/process/execute" element={
            <PrivateRoute>
                <ExecuteProcess/>
            </PrivateRoute>
        }/>
        <Route path="/process/execute/detail" element={
            <PrivateRoute>
                <ExecuteProcessDetail/>
            </PrivateRoute>
        }/>
        <Route path="/project" element={
            <PrivateRoute>
                <Project />
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
