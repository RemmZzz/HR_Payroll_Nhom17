import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './features/dashboard/Dashboard'; // Import file dashboard gộp

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

      {/* Route cho trang Dashboard, vẫn giữ lại để có thể truy cập trực tiếp */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Route mặc định, sẽ hiển thị trang Dashboard khi vào trang chủ */}
      <Route path="/" element={<Dashboard />} />

    </Routes>
  );
}

export default App;