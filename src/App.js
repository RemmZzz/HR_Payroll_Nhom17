import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './features/dashboard/Dashboard'; // Import file dashboard gộp
import VacationDays from "./features/vacation/VacationDays";

function App() {
  return (
    <Routes>
      {/* Route cho trang Login */}
      <Route 
        path="/login"
        element={
          <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <Login />
          </div>
        } 
      />

      {/* Route mặc định, sẽ hiển thị trang Dashboard khi vào trang chủ */}
      <Route path="/" element={<Login />} />

      {/* Route cho trang Dashboard, vẫn giữ lại để có thể truy cập trực tiếp */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* /vocation-days */}
      <Route path="/vacation-days" element={<VacationDays />} />


    </Routes>
  );
}

export default App;