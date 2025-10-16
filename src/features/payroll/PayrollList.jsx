import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
const PayrollIcon = () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> );

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
    .dashboard-main { overflow-y: auto; padding: 1.5rem; background-color: #f8fafc; }
    
    /* Payroll List Styles */
    .payroll-container { max-width: 100%; }
    .payroll-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .payroll-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin: 0; }
    .payroll-subtitle { color: #6b7280; margin: 0.25rem 0 0 0; }
    .payroll-actions { display: flex; gap: 0.75rem; }
    .payroll-btn { padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; cursor: pointer; border: none; font-size: 0.875rem; }
    .btn-primary { background-color: #4f46e5; color: white; }
    .btn-secondary { background-color: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
    
    .filters-card { margin-bottom: 1.5rem; }
    .filter-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
    .form-label { font-weight: 500; color: #6b7280; margin-bottom: 0.5rem; display: block; }
    .form-select, .form-input { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background-color: white; }
    
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
    .kpi-card { padding: 1.5rem; }
    .kpi-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
    .kpi-title { font-weight: 500; color: #6b7280; margin: 0; }
    .kpi-value { font-size: 1.875rem; font-weight: 700; margin: 0; }
    .kpi-icon { width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    
    .charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
    .chart-card { padding: 1.5rem; }
    .chart-title { font-weight: 600; color: #111827; margin-bottom: 1rem; }
    .progress { height: 8px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden; }
    .progress-bar { height: 100%; border-radius: 4px; }
    
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .data-table th { background-color: #f9fafb; font-weight: 600; color: #374151; }
    .data-table tr:hover { background-color: #f9fafb; }
    
    .text-success { color: #10b981; }
    .text-danger { color: #ef4444; }
    .text-primary { color: #3b82f6; }
    
    .bg-danger { background-color: #ef4444; }
    .bg-primary { background-color: #3b82f6; }
    .bg-success { background-color: #10b981; }
    
    .bg-opacity-10 { opacity: 0.1; }

    @media (max-width: 1024px) { 
        .kpi-grid, .charts-grid, .filter-row { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) { 
        .dashboard-layout { grid-template-areas: "header" "main-content"; grid-template-columns: 1fr; } 
        .dashboard-sidebar, .header-user-name { display: none; } 
        .payroll-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        .payroll-actions { width: 100%; justify-content: space-between; }
    }
`;

const PayrollList = () => {
    const [showAlertPanel, setShowAlertPanel] = useState(false);
    const [showNotificationPanel, setShowNotificationPanel] = useState(false);
    const alertBtnRef = useRef(null);
    const notificationBtnRef = useRef(null);
    const alertPanelRef = useRef(null);
    const notificationPanelRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Mock data cho earnings
    const [earningsData, setEarningsData] = useState({
        totalEarnings: 485000000,
        averageSalary: 48500000,
        employeeCount: 10,
        
        // Data for charts
        byDepartment: [
            { department: "IT", earnings: 185000000, employees: 4, percentage: 38 },
            { department: "Sales", earnings: 120000000, employees: 3, percentage: 25 },
            { department: "Marketing", earnings: 85000000, employees: 2, percentage: 18 },
            { department: "HR", earnings: 95000000, employees: 1, percentage: 19 }
        ],
        
        byGender: [
            { gender: "Nam", earnings: 320000000, percentage: 66 },
            { gender: "Nữ", earnings: 165000000, percentage: 34 }
        ],
        
        byTime: [
            { month: "2024-01", earnings: 475000000 },
            { month: "2024-02", earnings: 485000000 },
            { month: "2024-03", earnings: 490000000 },
            { month: "2024-04", earnings: 495000000 }
        ]
    });

    const [filters, setFilters] = useState({
        period: "2024-04",
        department: "all",
        gender: "all"
    });

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isActive = (path) => {
        return location.pathname.includes(path);
    };

    return (
        <div className="dashboard-body">
            <style>{styles}</style>
            <div className="dashboard-layout">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="header-logo">HR DASHBOARD</div>
                    <div className="header-controls">
                        <button ref={alertBtnRef} onClick={toggleAlert} className="alert-btn">
                            <AlertIcon />
                        </button>
                        <button ref={notificationBtnRef} onClick={toggleNotification} className="notification-btn">
                            <BellIcon />
                        </button>
                        <div className="header-avatar-container">
                            <span className="header-avatar-text">JD</span>
                        </div>
                        <span className="header-user-name">Jane Doe</span>
                        <button onClick={handleLogout}>
                            <LogoutIcon />
                        </button>
                    </div>
                </header>

                {/* Sidebar */}
                <nav className="dashboard-sidebar">
                    <ul className="sidebar-nav-list">
                        <li>
                            <Link 
                                to="/dashboard" 
                                className={`sidebar-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                            >
                                <OverviewIcon /><span>Overview (Tổng quan)</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/employees/1" 
                                className={`sidebar-nav-link ${isActive('/employees') ? 'active' : ''}`}
                            >
                                <EmployeeIcon /><span>Employee Detail (Chi tiết NV)</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/payroll" 
                                className={`sidebar-nav-link ${isActive('/payroll') ? 'active' : ''}`}
                            >
                                <PayrollIcon /><span>Payroll (Lương thưởng)</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="payroll-container">
                        {/* Header */}
                        <div className="payroll-header">
                            <div>
                                <h1 className="payroll-title">Báo cáo Thu nhập & Lương</h1>
                                <p className="payroll-subtitle">Phân tích và thống kê thu nhập toàn công ty</p>
                            </div>
                            <div className="payroll-actions">
                                <button className="payroll-btn btn-primary">
                                    Export Excel
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="card filters-card">
                            <div className="card-body">
                                <div className="filter-row">
                                    <div>
                                        <label className="form-label">Kỳ báo cáo</label>
                                        <select 
                                            name="period" 
                                            value={filters.period}
                                            onChange={handleFilterChange}
                                            className="form-select"
                                        >
                                            <option value="2024-04">Tháng 4/2024</option>
                                            <option value="2024-03">Tháng 3/2024</option>
                                            <option value="2024-02">Tháng 2/2024</option>
                                            <option value="2024-01">Tháng 1/2024</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="form-label">Phòng ban</label>
                                        <select 
                                            name="department" 
                                            value={filters.department}
                                            onChange={handleFilterChange}
                                            className="form-select"
                                        >
                                            <option value="all">Tất cả phòng ban</option>
                                            <option value="IT">IT</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="HR">HR</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="form-label">Giới tính</label>
                                        <select 
                                            name="gender" 
                                            value={filters.gender}
                                            onChange={handleFilterChange}
                                            className="form-select"
                                        >
                                            <option value="all">Tất cả</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="form-label">Hành động</label>
                                        <button 
                                            onClick={() => setFilters({ period: "2024-04", department: "all", gender: "all" })}
                                            className="payroll-btn btn-secondary w-100"
                                        >
                                            Đặt lại
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="kpi-grid">
                            <div className="card kpi-card">
                                <div className="kpi-header">
                                    <div>
                                        <h5 className="kpi-title">Tổng chi phí lương</h5>
                                        <p className="kpi-value text-danger">
                                            {earningsData.totalEarnings.toLocaleString()} VND
                                        </p>
                                    </div>
                                    <div className="kpi-icon bg-danger bg-opacity-10">
                                        <span className="text-danger">💰</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card kpi-card">
                                <div className="kpi-header">
                                    <div>
                                        <h5 className="kpi-title">Lương trung bình</h5>
                                        <p className="kpi-value text-primary">
                                            {earningsData.averageSalary.toLocaleString()} VND
                                        </p>
                                    </div>
                                    <div className="kpi-icon bg-primary bg-opacity-10">
                                        <span className="text-primary">📊</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card kpi-card">
                                <div className="kpi-header">
                                    <div>
                                        <h5 className="kpi-title">Số nhân viên</h5>
                                        <p className="kpi-value text-success">
                                            {earningsData.employeeCount} người
                                        </p>
                                    </div>
                                    <div className="kpi-icon bg-success bg-opacity-10">
                                        <span className="text-success">👥</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="charts-grid">
                            {/* Department Chart */}
                            <div className="card chart-card">
                                <h5 className="chart-title">Thu nhập theo phòng ban</h5>
                                <div>
                                    {earningsData.byDepartment.map((dept, index) => (
                                        <div key={dept.department} style={{marginBottom: '1rem'}}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                                                <span style={{fontWeight: '500'}}>{dept.department}</span>
                                                <span style={{color: '#6b7280'}}>
                                                    {dept.earnings.toLocaleString()} VND ({dept.employees} người)
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div 
                                                    className="progress-bar" 
                                                    style={{ 
                                                        width: `${dept.percentage}%`,
                                                        backgroundColor: '#4f46e5'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gender Chart */}
                            <div className="card chart-card">
                                <h5 className="chart-title">Thu nhập theo giới tính</h5>
                                <div>
                                    {earningsData.byGender.map(gender => (
                                        <div key={gender.gender} style={{marginBottom: '1rem'}}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                                                <span style={{fontWeight: '500'}}>{gender.gender}</span>
                                                <span style={{color: '#6b7280'}}>
                                                    {gender.earnings.toLocaleString()} VND ({gender.percentage}%)
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div 
                                                    className="progress-bar" 
                                                    style={{ 
                                                        width: `${gender.percentage}%`,
                                                        backgroundColor: '#10b981'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Time Series Table */}
                        <div className="card">
                            <div className="card-body">
                                <h5 className="chart-title">Biến động thu nhập theo thời gian</h5>
                                <div className="table-responsive">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Tháng</th>
                                                <th>Tổng thu nhập</th>
                                                <th>Thay đổi</th>
                                                <th>Tỷ lệ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {earningsData.byTime.map((month, index) => {
                                                const prevEarnings = index > 0 ? earningsData.byTime[index - 1].earnings : month.earnings;
                                                const change = month.earnings - prevEarnings;
                                                const changePercent = ((change / prevEarnings) * 100).toFixed(1);
                                                
                                                return (
                                                    <tr key={month.month}>
                                                        <td style={{fontWeight: '500'}}>{month.month}</td>
                                                        <td>{month.earnings.toLocaleString()} VND</td>
                                                        <td className={change >= 0 ? 'text-success' : 'text-danger'}>
                                                            {change >= 0 ? '+' : ''}{change.toLocaleString()} VND
                                                        </td>
                                                        <td className={change >= 0 ? 'text-success' : 'text-danger'}>
                                                            {change >= 0 ? '+' : ''}{changePercent}%
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
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

export default PayrollList;
