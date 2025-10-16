import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// --- SVG Icons ---
function AlertIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    )
}
const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.478 6.664 6 8.783 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
);
const LogoutIcon = () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> );
const OverviewIcon = () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> );
const EmployeeIcon = () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> );

// --- CSS ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

    .w-6 { width: 1.5rem; } .h-6 { height: 1.5rem; }
    .w-5 { width: 1.25rem; } .h-5 { height: 1.25rem; }

    .dashboard-body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #1f2937; font-size: 14px; overflow: hidden; height: 100vh; margin: 0; }
    .dashboard-layout { display: grid; height: 100vh; grid-template-areas: "header header" "sidebar main-content"; grid-template-columns: 14rem 1fr; grid-template-rows: 3.5rem 1fr; position: relative; }
    .dashboard-header { grid-area: header; }
    .dashboard-sidebar { grid-area: sidebar; }
    .dashboard-main { grid-area: main-content; }
    .card, .chart-block { border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07); background-color: white; }
    .dashboard-header { height: 3.5rem; background-color: white; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; padding: 0 1.25rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); z-index: 10; }
    .header-logo { font-size: 1.15rem; font-weight: 600; color: #4f46e5; }
    .header-controls { display: flex; align-items: center; gap: 0.75rem; }
    .header-controls > button { background: none; border: none; cursor: pointer; color: #6b7280; transition: color 150ms ease-in-out; }
    .header-controls > .alert-btn:hover { color: #dc2626; }
    .header-controls > .notification-btn:hover { color: #4f46e5; }
    .header-avatar-container { display: flex; height: 2rem; width: 2rem; flex-shrink: 0; align-items: center; justify-content: center; border-radius: 9999px; background-color: #4f46e5; }
    .header-avatar-text { font-size: 1rem; font-weight: 700; color: white; }
    .header-user-name { font-weight: 500; color: #1f2937; font-size: 0.875rem; }
    .dashboard-sidebar { background-color: #3730a3; color: white; padding: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); z-index: 20; }
    .sidebar-nav-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
    .sidebar-nav-link { font-size: 0.9rem; display: flex; align-items: center; padding: 0.6rem 0.75rem; border-radius: 0.5rem; text-decoration: none; color: white; transition: background-color 150ms ease-in-out; }
    .sidebar-nav-link > svg { margin-right: 0.75rem; }
    .sidebar-nav-link:hover { background-color: rgba(79, 70, 229, 0.5); }
    .sidebar-nav-link.active { background-color: rgba(79, 70, 229, 0.5); }
    .dashboard-main { overflow-y: auto; padding: 1.5rem; }
    .main-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin: 0 0 1.5rem 0; }

    .employee-detail-content { background: transparent; }
    .employee-header { margin-bottom: 2rem; }
    .employee-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem; }
    .profile-column { }
    .details-column { }
    .profile-card, .earnings-card, .vacation-card, .benefits-card, .timeline-card { margin-bottom: 1.5rem; }
    .profile-avatar { width: 120px; height: 120px; object-fit: cover; }
    .earnings-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
    .earnings-item { padding: 1rem; border-radius: 0.5rem; }
    .basic-salary { background-color: #f3f4f6; }
    .bonus { background-color: #f0fdf4; }
    .deductions { background-color: #fef2f2; }
    .net-salary { background-color: #eef2ff; grid-column: span 3; }
    .earnings-label { font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem; }
    .earnings-value { font-size: 1.125rem; font-weight: 600; margin: 0; }
    .vacation-benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
    .vacation-stats, .benefits-list { display: flex; flex-direction: column; gap: 1rem; }
    .stat-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; }
    .timeline-item { display: flex; margin-bottom: 1.5rem; position: relative; }
    .timeline-dot { width: 12px; height: 12px; background-color: #4f46e5; border-radius: 50%; margin-right: 1rem; flex-shrink: 0; }
    .timeline-content { flex: 1; }
    .timeline-connector { position: absolute; left: 5px; top: 12px; bottom: -1.5rem; width: 2px; background-color: #e5e7eb; }

    .panel { position: absolute; top: 3.5rem; right: 1.5rem; width: 22rem; z-index: 50; }
    .panel-content { padding: 1.25rem; height: 100%; border: 1px solid #e5e7eb; }
    .panel-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; }
    .panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
    .panel-list-item { padding: 0.75rem; border-radius: 0.5rem; border: 1px solid; display: flex; align-items: flex-start; }
    
    .view-all-link { background: none; border: none; padding: 0; cursor: pointer; margin-top: 1.25rem; text-align: center; font-size: 0.875rem; font-weight: 500; color: #4b5563; transition: color 150ms ease-in-out; display: block; width: 100%; }
    .view-all-link:hover { text-decoration: underline; }
    .notification-link { color: #2563eb; }
    .notification-link:hover { color: #1d4ed8; }
    .alert-link { color: #dc2626; }
    .alert-link:hover { color: #b91c1c; }

    @media (max-width: 1024px) { 
        .employee-layout { grid-template-columns: 1fr; }
        .earnings-grid { grid-template-columns: 1fr; }
        .net-salary { grid-column: span 1; }
        .vacation-benefits-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) { 
        .dashboard-layout { grid-template-areas: "header" "main-content"; grid-template-columns: 1fr; } 
        .dashboard-sidebar, .header-user-name { display: none; } 
    }
`;

const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State cho panels
    const [showAlertPanel, setShowAlertPanel] = useState(false);
    const [showNotificationPanel, setShowNotificationPanel] = useState(false);
    const alertBtnRef = useRef(null);
    const notificationBtnRef = useRef(null);
    const alertPanelRef = useRef(null);
    const notificationPanelRef = useRef(null);

    // Mock data
    const [employee, setEmployee] = useState({
        id: parseInt(id) || 1,
        name: "Nguyễn Văn A",
        email: "a.nguyen@company.com",
        phone: "0123 456 789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        dateOfBirth: "1990-05-15",
        gender: "Nam",
        position: "Senior Developer",
        department: "IT",
        hireDate: "2020-03-01",
        baseSalary: 50000000,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        
        earnings: {
            basicSalary: 50000000,
            bonus: 5000000,
            overtime: 3000000,
            allowances: 2000000,
            deductions: 2000000,
            netSalary: 58000000
        },
        
        vacation: {
            totalDays: 15,
            usedDays: 7,
            remainingDays: 8,
            plannedDays: 3
        },
        
        benefits: [
            { id: 1, name: "Bảo hiểm sức khỏe", type: "Health", value: "Cao cấp", startDate: "2020-03-01" },
            { id: 2, name: "Đào tạo", type: "Training", value: "10M VND/năm", startDate: "2020-03-01" },
            { id: 3, name: "Thể thao", type: "Wellness", value: "Phòng gym", startDate: "2021-01-01" }
        ],
        
        timeline: [
            { id: 1, date: "2020-03-01", event: "Bắt đầu làm việc", type: "hire", description: "Tham gia công ty với vị trí Developer" },
            { id: 2, date: "2021-06-15", event: "Thăng chức", type: "promotion", description: "Thăng chức lên Senior Developer" },
            { id: 3, date: "2022-01-10", event: "Điều chỉnh lương", type: "salary", description: "Điều chỉnh lương theo hiệu suất" },
            { id: 4, date: "2023-03-01", event: "Kỷ niệm 3 năm", type: "anniversary", description: "Kỷ niệm 3 năm làm việc" }
        ]
    });

    // Panel handlers
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (alertPanelRef.current && !alertPanelRef.current.contains(event.target) && !alertBtnRef.current.contains(event.target)) {
                setShowAlertPanel(false);
            }
            if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target) && !notificationBtnRef.current.contains(event.target)) {
                setShowNotificationPanel(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleAlert = () => {
        setShowAlertPanel(prev => !prev);
        setShowNotificationPanel(false);
    };

    const toggleNotification = () => {
        setShowNotificationPanel(prev => !prev);
        setShowAlertPanel(false);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const btnPrimaryStyle = {
        backgroundColor: '#4f46e5',
        borderColor: '#4f46e5',
        color: 'white',
    };

    return (
        <div className="dashboard-body">
            <style>{styles}</style>
            <div className="dashboard-layout">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="header-logo">HR DASHBOARD</div>
                    <div className="header-controls">
                        <button ref={alertBtnRef} onClick={toggleAlert} className="alert-btn"><AlertIcon /></button>
                        <button ref={notificationBtnRef} onClick={toggleNotification} className="notification-btn"><BellIcon /></button>
                        <div className="header-avatar-container"><span className="header-avatar-text">JD</span></div>
                        <span className="header-user-name">Jane Doe</span>
                        <button onClick={handleLogout}><LogoutIcon /></button>
                    </div>
                </header>

                {/* Sidebar */}
                <nav className="dashboard-sidebar">
                    <ul className="sidebar-nav-list">
                        <li><Link to="/dashboard" className="sidebar-nav-link"><OverviewIcon /><span>Overview (Tổng quan)</span></Link></li>
                        <li><Link to={`/employees/${id}`} className="sidebar-nav-link active"><EmployeeIcon /><span>Employee Detail (Chi tiết NV)</span></Link></li>
                    </ul>
                </nav>

                {/* Main Content - Employee Detail */}
                <main className="dashboard-main">
                    <div className="employee-detail-content">
                        {/* Header */}
                        <div className="employee-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h1 className="main-title">Chi tiết nhân viên</h1>
                                    <p className="text-muted mb-0">Quản lý thông tin và lịch sử nhân viên</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button 
                                        className="btn fw-semibold shadow"
                                        style={btnPrimaryStyle}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <Link 
                                        to="/dashboard" 
                                        className="btn btn-secondary fw-semibold shadow"
                                    >
                                        Quay lại Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="employee-layout">
                            {/* Left Column - Profile Info */}
                            <div className="profile-column">
                                <div className="card profile-card">
                                    <div className="card-body p-4">
                                        <div className="text-center mb-4">
                                            <img 
                                                src={employee.avatar} 
                                                alt={employee.name}
                                                className="rounded-circle profile-avatar mb-3"
                                            />
                                            <h3 className="fw-bold">{employee.name}</h3>
                                            <p className="text-primary fw-medium">{employee.position}</p>
                                            <p className="text-muted">{employee.department}</p>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <h5 className="fw-semibold text-secondary mb-3">Thông tin liên hệ</h5>
                                            <div className="mb-2">
                                                <small className="text-muted">Email</small>
                                                <p className="mb-0">{employee.email}</p>
                                            </div>
                                            <div className="mb-2">
                                                <small className="text-muted">Điện thoại</small>
                                                <p className="mb-0">{employee.phone}</p>
                                            </div>
                                            <div>
                                                <small className="text-muted">Địa chỉ</small>
                                                <p className="mb-0">{employee.address}</p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h5 className="fw-semibold text-secondary mb-3">Thông tin cá nhân</h5>
                                            <div className="mb-2">
                                                <small className="text-muted">Ngày sinh</small>
                                                <p className="mb-0">{employee.dateOfBirth}</p>
                                            </div>
                                            <div className="mb-2">
                                                <small className="text-muted">Giới tính</small>
                                                <p className="mb-0">{employee.gender}</p>
                                            </div>
                                            <div>
                                                <small className="text-muted">Ngày vào làm</small>
                                                <p className="mb-0">{employee.hireDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Details */}
                            <div className="details-column">
                                {/* Earnings Card */}
                                <div className="card earnings-card">
                                    <div className="card-body p-4">
                                        <h4 className="fw-semibold text-dark mb-4">Thu nhập tháng này</h4>
                                        <div className="earnings-grid">
                                            <div className="earnings-item basic-salary">
                                                <p className="earnings-label">Lương cơ bản</p>
                                                <p className="earnings-value">{employee.earnings.basicSalary.toLocaleString()} VND</p>
                                            </div>
                                            <div className="earnings-item bonus">
                                                <p className="earnings-label">Thưởng & Phụ cấp</p>
                                                <p className="earnings-value text-success">
                                                    +{(employee.earnings.bonus + employee.earnings.allowances + employee.earnings.overtime).toLocaleString()} VND
                                                </p>
                                            </div>
                                            <div className="earnings-item deductions">
                                                <p className="earnings-label">Khấu trừ</p>
                                                <p className="earnings-value text-danger">
                                                    -{employee.earnings.deductions.toLocaleString()} VND
                                                </p>
                                            </div>
                                            <div className="earnings-item net-salary">
                                                <p className="earnings-label">Lương thực nhận</p>
                                                <p className="earnings-value text-primary">
                                                    {employee.earnings.netSalary.toLocaleString()} VND
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vacation & Benefits */}
                                <div className="vacation-benefits-grid">
                                    {/* Vacation Card */}
                                    <div className="card vacation-card">
                                        <div className="card-body p-4">
                                            <h5 className="fw-semibold text-dark mb-4">Ngày phép</h5>
                                            <div className="vacation-stats">
                                                <div className="stat-item">
                                                    <span className="text-muted">Tổng số ngày:</span>
                                                    <span className="fw-semibold">{employee.vacation.totalDays} ngày</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="text-muted">Đã sử dụng:</span>
                                                    <span className="fw-semibold text-danger">{employee.vacation.usedDays} ngày</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="text-muted">Còn lại:</span>
                                                    <span className="fw-semibold text-success">{employee.vacation.remainingDays} ngày</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="text-muted">Đã lên kế hoạch:</span>
                                                    <span className="fw-semibold text-primary">{employee.vacation.plannedDays} ngày</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefits Card */}
                                    <div className="card benefits-card">
                                        <div className="card-body p-4">
                                            <h5 className="fw-semibold text-dark mb-4">Phúc lợi</h5>
                                            <div className="benefits-list">
                                                {employee.benefits.map(benefit => (
                                                    <div key={benefit.id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                                                        <div>
                                                            <p className="fw-medium mb-1">{benefit.name}</p>
                                                            <p className="text-muted small mb-0">{benefit.value}</p>
                                                        </div>
                                                        <span className="badge bg-primary rounded-pill px-3 py-2">
                                                            {benefit.type}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="card timeline-card">
                                    <div className="card-body p-4">
                                        <h4 className="fw-semibold text-dark mb-4">Dòng thời gian</h4>
                                        <div className="position-relative">
                                            {employee.timeline.map((event, index) => (
                                                <div key={event.id} className="timeline-item">
                                                    <div className="timeline-dot"></div>
                                                    {index !== employee.timeline.length - 1 && (
                                                        <div className="timeline-connector"></div>
                                                    )}
                                                    <div className="timeline-content">
                                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                                            <h6 className="fw-semibold mb-0">{event.event}</h6>
                                                            <small className="text-muted">{event.date}</small>
                                                        </div>
                                                        <p className="text-muted mb-0">{event.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Alert Panel */}
                {showAlertPanel && (
                    <div ref={alertPanelRef} className="panel">
                        <div className="card panel-content">
                            <h3 className="panel-title" style={{color: '#dc2626'}}>Cảnh báo Quan trọng</h3>
                            <ul className="panel-list">
                                <li className="panel-list-item" style={{borderColor: '#fecaca', backgroundColor: '#fef2f2'}}>
                                    <span style={{color: '#ef4444'}}>●</span>
                                    <div className="item-content">
                                        <p className="title">Cảnh báo Payroll: Cần phê duyệt</p>
                                        <p className="subtitle">Hạn chót: 15/10 (35 nhân viên)</p>
                                    </div>
                                </li>
                            </ul>
                            <p className="view-all-link alert-link">Xem tất cả cảnh báo</p>
                        </div>
                    </div>
                )}
                
                {/* Notification Panel */}
                {showNotificationPanel && (
                    <div ref={notificationPanelRef} className="panel">
                        <div className="card panel-content">
                            <h3 className="panel-title">Thông báo</h3>
                            <ul className="panel-list">
                                <li className="panel-list-item" style={{borderColor: '#fed7aa', backgroundColor: '#fff7ed'}}>
                                    <span style={{color: '#f97316'}}>●</span>
                                    <div className="item-content">
                                        <p className="title">Sinh nhật/Kỷ niệm làm việc</p>
                                        <p className="subtitle">2 Sinh nhật tuần này. 1 Kỷ niệm 5 năm.</p>
                                    </div>
                                </li>
                            </ul>
                            <p className="view-all-link notification-link">Xem tất cả thông báo</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDetail;
