import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KPCard from '../../components/KPCard';
// import Chart from '../../components/Chart'; // 
import Table from '../../components/Table';

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [timelineData, setTimelineData] = useState([]);

  // Gọi API lấy thông tin nhân viên
  useEffect(() => {
    // Giả lập dữ liệu
    setEmployee({
      id: employeeId,
      name: "Nguyễn Văn A",
      position: "Developer",
      department: "IT",
      email: "a.nguyen@company.com",
      phone: "0123456789",
      hireDate: "2020-01-15",
      earnings: 50000000,
      vacationDays: 12,
      benefits: "Bảo hiểm sức khỏe, Du lịch công ty"
    });
    
    setTimelineData([
      { date: "2020-01-15", event: "Ngày vào làm" },
      { date: "2021-03-20", event: "Thăng chức Senior Developer" },
      { date: "2022-06-10", event: "Nghỉ phép 1 tuần" }
    ]);
  }, [employeeId]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-detail">
      <div className="row">
        {/* Thông tin profile */}
        <div className="col-md-4">
          <KPCard title="Thông tin nhân viên">
            <div className="employee-profile">
              <div className="avatar"></div>
              <h3>{employee.name}</h3>
              <p><strong>Chức vụ:</strong> {employee.position}</p>
              <p><strong>Phòng ban:</strong> {employee.department}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>SĐT:</strong> {employee.phone}</p>
              <p><strong>Ngày vào làm:</strong> {employee.hireDate}</p>
            </div>
          </KPCard>
        </div>

        {/* Earnings & Benefits */}
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <KPCard title="Earnings">
                <div className="earnings-info">
                  <h4>{employee.earnings.toLocaleString()} VND</h4>
                  <p>Lương tháng hiện tại</p>
                </div>
              </KPCard>
            </div>
            <div className="col-md-6">
              <KPCard title="Vacation Days">
                <div className="vacation-info">
                  <h4>{employee.vacationDays} ngày</h4>
                  <p>Còn lại</p>
                </div>
              </KPCard>
            </div>
          </div>

          {/* Benefits */}
          <KPCard title="Benefits" className="mt-3">
            <p>{employee.benefits}</p>
          </KPCard>
        </div>
      </div>

      {/* Timeline */}
      <div className="row mt-4">
        <div className="col-md-12">
          <KPCard title="Timeline sự kiện">
            <Table 
              data={timelineData}
              columns={[
                { key: 'date', title: 'Ngày' },
                { key: 'event', title: 'Sự kiện' }
              ]}
            />
          </KPCard>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;