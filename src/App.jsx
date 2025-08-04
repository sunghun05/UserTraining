import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Project from "./pages/Project/EntireProject.jsx"
import Data from "./pages/Data"
import Server from "./pages/Server"

import EntireProcess from "./pages/Process/Tab/EntireProcess.jsx"
import ExecuteProcessDetail from "./pages/Process/Tab/ExecuteProcessDetail.jsx"
import ExecuteProcess from "./pages/Process/Tab/ExecuteProcess.jsx"
import ProcessDetail from "./pages/Process/Tab/ProcessDetail.jsx"
import ImageManagement from "./pages/Process/Tab/ImageManagement.jsx"

import ProjectDetail from "./pages/Project/ProjectDetail.jsx"

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
        <Route path="/process/detail" element={
            <PrivateRoute>
                <ProcessDetail />
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
        <Route path="process/image" element={
          <PrivateRoute>
            <ImageManagement/>
          </PrivateRoute>
        }/>
        <Route path="/project" element={
            <PrivateRoute>
                <Project />
            </PrivateRoute>
        }/>
        <Route path="/project/detail" element={
            <PrivateRoute>
                <ProjectDetail/>
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
