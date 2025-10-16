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
    .dashboard-main { overflow-y: auto; padding: 1.5rem; }
    .main-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin: 0 0 1.5rem 0; }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.75rem;
    }

    .stat-card {
        position: relative;
        overflow: hidden;
        padding: 0.8rem 1.25rem;
        border: 1px solid #f3f4f6;
        box-shadow: inset 4px 0 0 0 var(--card-accent-color),
                    0 4px 12px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        border-radius: 0.5rem;
    }

    .card-title {
        font-size: 0.8rem;
        font-weight: 500;
        color: #6b7280;
        margin-bottom: 0.25rem;
        margin-top: 0;
    }

    .card-value {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
        margin-top: 0;
    }

    .card-subtext {
        font-size: 0.75rem;
        color: #6b7280;
        margin-top: 0;
        margin-bottom: 0;
    }

    .charts-grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 1.5rem; }
    .main-chart-wrapper { grid-column: span 3; display: flex; flex-direction: column; gap: 1.25rem; }
    .sub-charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
    .chart-block { padding: 1.25rem; }
    .chart-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; }
    .chart-placeholder { height: 12rem; background-color: #f9fafb; display: flex; align-items: center; justify-content: center; color: #9ca3af; }
    .main-chart-wrapper .chart-placeholder { height: 16rem; }
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

    /* Payroll View Styles */
    .payroll-container { padding: 1.5rem; }
    .payroll-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .payroll-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin: 0; }
    .payroll-actions { display: flex; gap: 0.75rem; }
    .payroll-btn { padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; cursor: pointer; border: none; }
    .btn-primary { background-color: #4f46e5; color: white; }
    .btn-secondary { background-color: #f3f4f6; color: #374151; }
    .payroll-table { width: 100%; border-collapse: collapse; background-color: white; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
    .payroll-table th, .payroll-table td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .payroll-table th { background-color: #f9fafb; font-weight: 600; color: #374151; }
    .payroll-table tr:hover { background-color: #f9fafb; }
    .status-badge { padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 500; }
    .status-paid { background-color: #d1fae5; color: #065f46; }
    .status-pending { background-color: #fef3c7; color: #92400e; }

    @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .dashboard-layout { grid-template-areas: "header" "main-content"; grid-template-columns: 1fr; } .dashboard-sidebar, .header-user-name { display: none; } .stats-grid, .sub-charts-grid { grid-template-columns: 1fr; } }
`;

// Payroll View Component
const PayrollView = () => {
    return (
        <div className="payroll-container">
            <div className="payroll-header">
                <h2 className="payroll-title">Quản lý Payroll</h2>
                <div className="payroll-actions">
                    <button className="payroll-btn btn-secondary">Xuất báo cáo</button>
                    <button className="payroll-btn btn-primary">Tạo payroll mới</button>
                </div>
            </div>
            
            <table className="payroll-table">
                <thead>
                    <tr>
                        <th>ID Nhân viên</th>
                        <th>Tên nhân viên</th>
                        <th>Tháng</th>
                        <th>Lương cơ bản</th>
                        <th>Thưởng</th>
                        <th>Khấu trừ</th>
                        <th>Tổng lương</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>NV001</td>
                        <td>Nguyễn Văn A</td>
                        <td>10/2023</td>
                        <td>15,000,000</td>
                        <td>2,000,000</td>
                        <td>1,500,000</td>
                        <td>15,500,000</td>
                        <td><span className="status-badge status-paid">Đã thanh toán</span></td>
                    </tr>
                    <tr>
                        <td>NV002</td>
                        <td>Trần Thị B</td>
                        <td>10/2023</td>
                        <td>12,000,000</td>
                        <td>1,500,000</td>
                        <td>1,200,000</td>
                        <td>12,300,000</td>
                        <td><span className="status-badge status-paid">Đã thanh toán</span></td>
                    </tr>
                    <tr>
                        <td>NV003</td>
                        <td>Lê Văn C</td>
                        <td>10/2023</td>
                        <td>18,000,000</td>
                        <td>3,000,000</td>
                        <td>2,000,000</td>
                        <td>19,000,000</td>
                        <td><span className="status-badge status-pending">Chờ xử lý</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

// Employee Detail View Component
const EmployeeDetailView = () => {
    return (
        <div className="payroll-container">
            <div className="payroll-header">
                <h2 className="payroll-title">Chi tiết Nhân viên</h2>
                <div className="payroll-actions">
                    <button className="payroll-btn btn-secondary">Chỉnh sửa</button>
                    <button className="payroll-btn btn-primary">Lưu thay đổi</button>
                </div>
            </div>
            
            <div className="card" style={{padding: '1.5rem', marginBottom: '1.5rem'}}>
                <h3 style={{margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: '600'}}>Thông tin cá nhân</h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                    <div>
                        <p><strong>Họ tên:</strong> Nguyễn Văn A</p>
                        <p><strong>Chức vụ:</strong> Developer</p>
                        <p><strong>Phòng ban:</strong> IT</p>
                    </div>
                    <div>
                        <p><strong>Email:</strong> nva@company.com</p>
                        <p><strong>SĐT:</strong> 0123 456 789</p>
                        <p><strong>Ngày vào làm:</strong> 01/01/2022</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [showAlertPanel, setShowAlertPanel] = useState(false);
    const [showNotificationPanel, setShowNotificationPanel] = useState(false);
    const [currentView, setCurrentView] = useState('overview'); // 'overview', 'employee', 'payroll'
    const alertBtnRef = useRef(null);
    const notificationBtnRef = useRef(null);
    const alertPanelRef = useRef(null);
    const notificationPanelRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

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

    // Update current view based on URL
    useEffect(() => {
        if (location.pathname.includes('/employees')) {
            setCurrentView('employee');
        } else if (location.pathname.includes('/payroll')) {
            setCurrentView('payroll');
        } else {
            setCurrentView('overview');
        }
    }, [location.pathname]);

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

    const renderMainContent = () => {
        switch (currentView) {
            case 'employee':
                return <EmployeeDetailView />;
            case 'payroll':
                return <PayrollView />;
            case 'overview':
            default:
                return (
                    <>
                        <h2 className="main-title">Tổng quan HR & Payroll</h2>
                        <div className="stats-grid">
                            <div className="card stat-card" style={{'--card-accent-color': 'rgb(79, 70, 229)'}}><p className="card-title">Tổng Thu nhập (Q3)</p><p className="card-value">$1.2M</p><p className="card-subtext" style={{color: 'rgb(34, 197, 94)'}}>↑ 5.2% so với Q2</p></div>
                            <div className="card stat-card" style={{'--card-accent-color': '#f59e0b'}}><p className="card-title">Ngày nghỉ còn lại TB</p><p className="card-value">8.5 Ngày</p><p className="card-subtext" style={{color: '#6b7280'}}>Cần xử lý: 4 yêu cầu</p></div>
                            <div className="card stat-card" style={{'--card-accent-color': '#22c55e'}}><p className="card-title">Tỷ lệ tham gia Phúc lợi</p><p className="card-value">95%</p><p className="card-subtext" style={{color: '#22c55e'}}>Phúc lợi mới: Tháng 11</p></div>
                            <div className="card stat-card" style={{'--card-accent-color': '#ef4444'}}><p className="card-title">Cảnh báo Quan trọng</p><p className="card-value">5 Cảnh báo</p><p className="card-subtext" style={{color: '#ef4444'}}>2 HR/3 Payroll</p></div>
                        </div>
                        <div className="charts-grid-container">
                            <div className="main-chart-wrapper">
                                <div className="chart-block"><h3 className="chart-title">Earnings: Phân bổ theo Phòng ban / Giới tính</h3><div className="chart-placeholder">[Bar Chart Placeholder]</div></div>
                                <div className="sub-charts-grid">
                                    <div className="chart-block"><h3 className="chart-title">Xu hướng sử dụng Vacation</h3><div className="chart-placeholder">[Line Chart Placeholder]</div></div>
                                    <div className="chart-block"><h3 className="chart-title">Xu hướng tham gia Benefits</h3><div className="chart-placeholder">[Pie Chart Placeholder]</div></div>
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    };

    const isActive = (path) => {
        if (path === '/dashboard' && currentView === 'overview') return true;
        if (path.includes('/employees') && currentView === 'employee') return true;
        if (path.includes('/payroll') && currentView === 'payroll') return true;
        return false;
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
                    {renderMainContent()}
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

export default Dashboard;
