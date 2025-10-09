import React, { useState } from 'react';

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([
    { id: 1, name: "Nguyễn Văn A", salary: 50000000, bonus: 5000000, deductions: 2000000, netSalary: 53000000 },
    { id: 2, name: "Trần Thị B", salary: 45000000, bonus: 3000000, deductions: 1500000, netSalary: 46500000 },
    { id: 3, name: "Lê Văn C", salary: 60000000, bonus: 8000000, deductions: 3000000, netSalary: 65000000 },
  ]);

  return (
    <div className="payroll-page p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Bảng lương</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Tính lương tháng
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Tổng chi phí lương</h3>
          <p className="text-2xl text-red-500">164,500,000 VND</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Nhân viên đã tính lương</h3>
          <p className="text-2xl text-blue-500">3/50</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Lương trung bình</h3>
          <p className="text-2xl text-green-500">54,833,333 VND</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Tên nhân viên</th>
              <th className="px-6 py-3 text-left">Lương cơ bản</th>
              <th className="px-6 py-3 text-left">Thưởng</th>
              <th className="px-6 py-3 text-left">Khấu trừ</th>
              <th className="px-6 py-3 text-left">Lương thực nhận</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map(employee => (
              <tr key={employee.id} className="border-t">
                <td className="px-6 py-4">{employee.id}</td>
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4">{employee.salary.toLocaleString()} VND</td>
                <td className="px-6 py-4 text-green-600">{employee.bonus.toLocaleString()} VND</td>
                <td className="px-6 py-4 text-red-600">{employee.deductions.toLocaleString()} VND</td>
                <td className="px-6 py-4 font-semibold">{employee.netSalary.toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;