import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import VacationDays from "./features/vacation/VacationDays";
import Alerts_notifications from "./features/alerts/Alerts_notifications";
import EmployeeDetail from "./features/employees/EmployeeDetail";
import PayrollList from "./features/payroll/PayrollList";
import Reports from "./features/reports/Reports";

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


      
      {/* Route cho trang Reports */}
      <Route path="/report" element={<Reports />} />

      {/* Route mặc định, sẽ hiển thị trang Login khi vào trang chủ */}
      <Route path="/" element={<Login />} />

      {/* Route cho trang Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Route cho trang thông báo */}
      <Route path="/alerts_notifications" element={<Alerts_notifications />} />

      {/* Route cho trang nghỉ phép */}
      <Route path="/vacation-days" element={<VacationDays />} />

      {/* Route cho trang nhân viên */}
      <Route path="/employees" element={<EmployeeDetail />} />

      {/* Route cho trang bảng lương */}
      <Route path="/payroll" element={<PayrollList />} />
    </Routes>
  );
}

export default App;
