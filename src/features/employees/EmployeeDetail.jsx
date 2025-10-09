import React from 'react';
import { Link } from 'react-router-dom';

const Employees = () => {
  const employees = [
    { id: 1, name: "Nguyễn Văn A", position: "Developer", department: "IT" },
    { id: 2, name: "Trần Thị B", position: "Designer", department: "Design" },
    { id: 3, name: "Lê Văn C", position: "Manager", department: "HR" },
  ];

  return (
    <div className="employees-page p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Nhân viên</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm nhân viên
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Tên</th>
              <th className="px-6 py-3 text-left">Chức vụ</th>
              <th className="px-6 py-3 text-left">Phòng ban</th>
              <th className="px-6 py-3 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="border-t">
                <td className="px-6 py-4">{employee.id}</td>
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4">{employee.position}</td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4">
                  <Link 
                    to={`/employees/${employee.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Xem chi tiết
                  </Link>
                  <button className="text-green-500 hover:text-green-700 mr-3">
                    Sửa
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;