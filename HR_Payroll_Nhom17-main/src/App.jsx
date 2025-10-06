import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDetail from './path/to/EmployeeDetail';
import PayrollList from './path/to/PayrollList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
          <Route path="/payroll" element={<PayrollList />} />
          {/* Các route khác nếu có */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;