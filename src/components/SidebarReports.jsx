import React from "react";
import "./SidebarReports.scss";

export default function SidebarReports() {
    return (
        <aside className="sidebar">
            <h1 className="logo">HR DASHBOARD</h1>
            <nav className="menu">
                <button className="menu-item active">🏠 Overview (Tổng quan)</button>
                <button className="menu-item">📄 Reports Export (Xuất báo cáo)</button>
            </nav>
        </aside>
    );
}
