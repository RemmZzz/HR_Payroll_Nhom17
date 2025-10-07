import React from "react";
import "../../styles/VacationDashboard.scss";

const VacationDashboard = () => {
    const employees = [
        { name: "Alice Smith", dept: "Marketing", total: 15, used: 3.0 },
        { name: "Bob Johnson", dept: "Engineering", total: 15, used: 11.5 },
    ];

    return (
        <div className="vacation-dashboard">
            <div className="card chart">
                <h3>Phân bố Ngày nghỉ (Toàn công ty)</h3>
                <div className="chart-placeholder">
                    [Pie/Donut Chart Placeholder: Used vs Remaining Days]
                </div>
                <p>Tổng cộng: 15 ngày/năm. Đã dùng TB: 6.5 ngày.</p>
            </div>

            <div className="card list">
                <div className="header-row">
                    <h3>Danh sách Nhân viên & Ngày nghỉ còn lại</h3>
                    <div className="filters">
                        <select>
                            <option>Phòng ban: Tất cả</option>
                        </select>
                        <select>
                            <option>Thời gian: Tháng hiện tại</option>
                        </select>
                        <button>Áp dụng bộ lọc</button>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>TÊN NHÂN VIÊN</th>
                            <th>PHÒNG BAN</th>
                            <th>NGÀY NGHỈ (TỔNG)</th>
                            <th>NGÀY NGHỈ (ĐÃ DÙNG)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={index}>
                                <td>{emp.name}</td>
                                <td>{emp.dept}</td>
                                <td>{emp.total}</td>
                                <td>{emp.used}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VacationDashboard;
