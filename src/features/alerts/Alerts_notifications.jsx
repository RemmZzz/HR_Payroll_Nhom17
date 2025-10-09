import React, { useState, useEffect, useRef } from 'react';
function AlertIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    )
}
const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.478 6.664 6 8.783 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
);
const LogoutIcon = () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> );
const OverviewIcon = () => ( 
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg> 
);
const AlertsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.85-1.29 2.85-2.85V5.85c0-1.54-1.29-2.85-2.85-2.85H5.062C3.522 3 2.212 4.29 2.212 5.85v12.3c0 1.54 1.29 2.85 2.85 2.85z"></path>
    </svg>
);

const PageStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
      .w-5 { width: 1.25rem; }
      .h-5 { height: 1.25rem; }
      
      #alerts-page-wrapper {
        font-family: 'Inter', sans-serif;
        background-color: #f8fafc;
        color: #1f2937;
        font-size: 14px;
      }
      
      .dashboard-layout {
        display: grid;
        height: 100vh;
        grid-template-areas: "header header" "sidebar main-content";
        grid-template-columns: 14rem 1fr;
        grid-template-rows: 3.5rem 1fr;
      }
      .dashboard-header { grid-area: header; }
      .dashboard-sidebar { grid-area: sidebar; }
      .dashboard-main { grid-area: main-content; }
      .card {
        border-radius: 0.75rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
        background-color: white;
      }

      .dashboard-header {
        height: 3.5rem;
        background-color: white;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;
        z-index: 10;
      }
      .header-logo { font-size: 1.15rem; font-weight: 700; color: #4f46e5; }
      .header-controls { display: flex; align-items: center; gap: 1rem; }
      .header-controls > button { background: none; border: none; cursor: pointer; color: #6b7280; }
      .header-controls > .alert-btn:hover { color: #dc2626; }      /* Màu đỏ cho icon Cảnh báo */
      .header-controls > .notification-btn:hover { color: #4f46e5; } /* Màu xanh cho icon Thông báo */
      .header-avatar-container { display: flex; height: 2.25rem; width: 2.25rem; align-items: center; justify-content: center; border-radius: 9999px; background-color: #4f46e5; }
      .header-avatar-text { font-size: 1rem; font-weight: 700; color: white; }
      .header-user-name { font-weight: 500; color: #1f2937; font-size: 0.875rem; }
    .dashboard-sidebar { background-color: #3730a3; color: white; padding: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); z-index: 20; }
    .sidebar-nav-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
    .sidebar-nav-link { font-size: 0.9rem; display: flex; align-items: center; padding: 0.6rem 0.75rem; border-radius: 0.5rem; text-decoration: none; color: white; transition: background-color 150ms ease-in-out; }
    .sidebar-nav-link > svg { margin-right: 0.75rem; }
    .sidebar-nav-link:hover { background-color: rgba(79, 70, 229, 0.5); }
    .sidebar-nav-link.active { background-color: rgba(79, 70, 229, 0.5); }
      
      .dashboard-main { overflow-y: auto; padding: 2rem; }
      .main-title { font-size: 1.75rem; font-weight: 700; color: #111827; margin: 0 0 1.5rem 0; }
      
      /* ===== PHẦN ĐÃ SỬA LẠI ===== */
      .filters-and-alerts-container {
          /* Đây là thẻ card lớn bao ngoài */
          padding: 1.5rem;
      }
      .filters-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
      }
      .search-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          width: 280px; 
      }
      .filter-buttons { display: flex; gap: 0.75rem; }
      .filter-buttons button {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background-color: white;
          cursor: pointer;
      }
      .alerts-list { 
        display: flex; 
        flex-direction: column; 
        gap: 1rem;
        margin-top: 1.5rem; /* Khoảng cách với thanh filter */
        padding-top: 1.5rem; /* Khoảng cách với thanh filter */
        border-top: 1px solid #e5e7eb; /* Đường kẻ ngang phân tách */
      }
      /* ===== KẾT THÚC PHẦN SỬA ===== */

      .alert-card {
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid transparent;
        border-left-width: 5px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        position: relative;
        padding-right: 170px; 
      }
        .alert-actions { 
        position: absolute; /* Đặt vị trí tuyệt đối */
        top: 1rem; /* Cách lề trên 1rem (bằng padding của thẻ) */
        right: 1rem; /* Cách lề phải 1rem */
        display: flex; 
        gap: 0.5rem; 
      }
      .alert-card-danger { background-color: #fef2f2; border-color: #ef4444; }
      .alert-card-danger .alert-title { color: #b91c1c; font-weight: 700; margin-bottom: 0.25rem; }
      .alert-card-danger .alert-description { color: #dc2626; font-size: 0.9rem; margin-bottom: 0.5rem; }
      .alert-card-danger .alert-meta { color: #ef4444; font-size: 0.8rem; }
      .alert-card-warning { background-color: #fffbeb; border-color: #f59e0b; }
      .alert-card-warning .alert-title { color: #b45309; font-weight: 700; margin-bottom: 0.25rem; }
      .alert-card-warning .alert-description { color: #d97706; font-size: 0.9rem; margin-bottom: 0.5rem; }
      .alert-card-warning .alert-meta { color: #f59e0b; font-size: 0.8rem; }
      
      .alert-actions { flex-shrink: 0; display: flex; gap: 0.5rem; }
      .alert-actions button {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          cursor: pointer;
          border: 1px solid transparent;
      }
      .btn-ack-danger { background-color: #ef4444; color: white; }
      .alert-actions .btn-dis-danger { background-color: white; color: #ef4444; border: 1px solid #ef4444; }
      .btn-ack-warning { background-color: #f59e0b; color: white; }
      .alert-actions .btn-dis-warning { background-color: white; color: #f59e0b; border: 1px solid #f59e0b; }
      .panel { position: absolute; top: 3.5rem; right: 1.5rem; width: 22rem; z-index: 50; }
      .panel-content { padding: 1.25rem; height: 100%; border: 1px solid #e5e7eb; }
      .panel-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; }
      .panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
      .panel-list-item { padding: 0.75rem; border-radius: 0.5rem; border: 1px solid; display: flex; align-items: flex-start; gap: 0.5rem; }
      .view-all-link { background: none; border: none; padding: 0; cursor: pointer; margin-top: 1.25rem; text-align: center; font-size: 0.875rem; font-weight: 500; color: #4b5563; transition: color 150ms ease-in-out; display: block; width: 100%; }
      .view-all-link:hover { text-decoration: underline; }
      @media (max-width: 768px) {
          .dashboard-layout { grid-template-areas: "header" "main-content"; grid-template-columns: 1fr; }
          .dashboard-sidebar, .header-user-name { display: none; }
          .filters-bar { flex-direction: column; align-items: stretch; }
          .search-input { width: 100%; max-width: none; }
      }
    `}</style>
  );
};

const alertsData = [
    { level: 'danger', title: 'NGHIÊM TRỌNG: Lỗi tính toán Thuế cho 5 Nhân viên', description: 'Hệ thống phát hiện chênh lệch thuế cần điều chỉnh ngay lập tức.', meta: 'Payroll | Hôm nay, 09:30 AM' },
    { level: 'warning', title: 'CẢNH BÁO: Kỷ niệm 1 năm làm việc của 4 Nhân viên', description: 'Cần chuẩn bị giấy chứng nhận và quà tặng/thưởng kịp thời.', meta: 'HR | Ngày mai' }
];

const Header = ({ toggleAlert, toggleNotification, alertBtnRef, notificationBtnRef }) => (
    <header className="dashboard-header">
        <div className="header-logo">HR DASHBOARD</div>
        <div className="header-controls">
            {/* Thêm nút Alert và gắn sự kiện */}
            <button ref={alertBtnRef} onClick={toggleAlert} className="alert-btn"><AlertIcon /></button>
            {/* Gắn sự kiện cho nút Bell */}
            <button ref={notificationBtnRef} onClick={toggleNotification} className="notification-btn"><BellIcon /></button>
            <div className="header-avatar-container"><span className="header-avatar-text">JD</span></div>
            <span className="header-user-name">Jane Doe</span>
            <button><LogoutIcon /></button>
        </div>
    </header>
);

// --- SIDEBAR (Giữ nguyên) ---
const Sidebar = () => (
    <nav className="dashboard-sidebar">
        <ul className="sidebar-nav-list">
            <li>
                <a href="#" className="sidebar-nav-link"> {/* Xóa "active" ở đây */}
                    <OverviewIcon />
                    <span>Overview (Tổng quan)</span>
                </a>
            </li>
            <li>
                {/* Thêm "active" vào đây */}
                <a href="#" className="sidebar-nav-link active"> 
                    <AlertsIcon />
                    <span>Alerts (Cảnh báo)</span>
                </a>
            </li>
        </ul>
    </nav>
);

const AlertCard = ({ level, title, description, meta }) => (
    <div className={`card alert-card alert-card-${level}`}>
        <div>
            <p className="alert-title m-0">{title}</p>
            <p className="alert-description m-0 mt-1">{description}</p>
            <p className="alert-meta m-0 mt-2">{meta}</p>
        </div>
        <div className="alert-actions">
            <button className={`btn-ack-${level}`}>Acknowledge</button>
            <button className={`btn-dis-${level}`}>Dismiss</button>
        </div>
    </div>
);

export default function AlertsNotificationsPage() {
  // --- BỘ NÃO XỬ LÝ PANEL ---
const [showAlertPanel, setShowAlertPanel] = useState(false);
const [showNotificationPanel, setShowNotificationPanel] = useState(false);
const alertBtnRef = useRef(null);
const notificationBtnRef = useRef(null);
const alertPanelRef = useRef(null);
const notificationPanelRef = useRef(null);

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
// --- KẾT THÚC BỘ NÃO XỬ LÝ ---
    return (
        <div id="alerts-page-wrapper">
            <PageStyles />
            <div className="dashboard-layout">
                <Header toggleAlert={toggleAlert}
                        toggleNotification={toggleNotification}
                        alertBtnRef={alertBtnRef}
                        notificationBtnRef={notificationBtnRef} />
                <Sidebar />
                <main className="dashboard-main">
                    <h2 className="main-title">Cảnh báo & Thông báo HR/Payroll</h2>
                    
                    {/* ===== THAY ĐỔI CẤU TRÚC JSX Ở ĐÂY ===== */}
                    <div className="card filters-and-alerts-container">
                        {/* Thanh tìm kiếm và bộ lọc */}
                        <div className="filters-bar">
                            <input type="text" placeholder="Tìm kiếm cảnh báo..." className="search-input"/>
                            <div className="filter-buttons">
                                <button>Lọc theo Loại</button>
                                <button>Lọc theo Mức độ</button>
                            </div>
                        </div>

                        {/* Danh sách cảnh báo đã được chuyển vào đây */}
                        <div className="alerts-list">
                            {alertsData.map((alert, index) => <AlertCard key={index} {...alert} />)}
                        </div>
                    </div>
                </main>
                {/* --- GIAO DIỆN CỦA 2 PANEL --- */}
{showAlertPanel && (
    <div ref={alertPanelRef} className="panel">
        <div className="card panel-content">
            <h3 className="panel-title" style={{color: '#dc2626'}}>Cảnh báo Quan trọng</h3>
            <ul className="panel-list">
                <li className="panel-list-item" style={{borderColor: '#fecaca', backgroundColor: '#fef2f2'}}>
                    <span style={{color: '#ef4444'}}>●</span>
                    <div>
                        <p style={{margin:0, fontWeight: 500}}>Cảnh báo Payroll: Cần phê duyệt</p>
                        <p style={{margin:0, fontSize: '0.8rem', color: '#6b7280'}}>Hạn chót: 15/10 (35 nhân viên)</p>
                    </div>
                </li>
            </ul>
            <button className="view-all-link" style={{color: '#dc2626'}}>Xem tất cả cảnh báo</button>
        </div>
    </div>
)}

{showNotificationPanel && (
    <div ref={notificationPanelRef} className="panel">
        <div className="card panel-content">
            <h3 className="panel-title">Thông báo</h3>
            <ul className="panel-list">
                <li className="panel-list-item" style={{borderColor: '#fed7aa', backgroundColor: '#fff7ed'}}>
                    <span style={{color: '#f97316'}}>●</span>
                    <div>
                        <p style={{margin:0, fontWeight: 500}}>Sinh nhật/Kỷ niệm làm việc</p>
                        <p style={{margin:0, fontSize: '0.8rem', color: '#6b7280'}}>2 Sinh nhật tuần này. 1 Kỷ niệm 5 năm.</p>
                    </div>
                </li>
            </ul>
            <button className="view-all-link" style={{color: '#2563eb'}}>Xem tất cả thông báo</button>
        </div>
    </div>
)}
            </div>
        </div>
    );
}