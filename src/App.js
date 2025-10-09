import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './features/dashboard/Dashboard';
// Import thêm các component payroll và employees
import Employees from './features/employees/Employees';
import Payroll from './features/payroll/Payroll';
import EmployeeDetail from './features/employees/EmployeeDetail';

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

      {/* Route cho trang Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Route cho trang Employees */}
      <Route path="/employees" element={<Employees />} />

      {/* Route cho trang Employee Detail */}
      <Route path="/employees/:employeeId" element={<EmployeeDetail />} />

      {/* Route cho trang Payroll */}
      <Route path="/payroll" element={<Payroll />} />

      {/* Route mặc định */}
      <Route path="/" element={<Login />} />

    </Routes>
  );
}

export default App;