import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Deposits } from './pages/Deposits';
import './assets/index.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deposits" element={<Deposits />} />
        <Route path="*" element={<Navigate to="index.html /" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;