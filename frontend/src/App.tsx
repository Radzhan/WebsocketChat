import { Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './app/hooks';
import MainMenu from './components/Header/MainMenu';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Chat from './containers/Chat/Chat';
import Login from './features/user/Login';
import Register from './features/user/Register';
import { selectUser } from './features/user/userSlice';

function App() {
  const user = useAppSelector(selectUser)
  return (
    <div className="App">
      <MainMenu />

      <Container maxWidth="xl">
      <Routes>
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAllowed={!!user}>
              <Chat />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      </Container>
    </div>
  );
}

export default App;
