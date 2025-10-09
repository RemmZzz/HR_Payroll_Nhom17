import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './features/dashboard/Dashboard';
import VacationDays from './features/vacation/VacationDays';
import Alerts_notifications from './features/alerts/Alerts_notifications';

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

      {/* Route mặc định, sẽ hiển thị trang Login khi vào trang chủ */}
      <Route path="/" element={<Login />} />

      {/* Route cho trang Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Route cho trang thông báo */}
      <Route path="/alerts_notifications" element={<Alerts_notifications />} />

      {/* Route cho trang nghỉ phép */}
      <Route path="/vacation-days" element={<VacationDays />} />
    </Routes>
  );
}

export default App;
