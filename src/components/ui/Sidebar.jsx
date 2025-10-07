import React from "react";
import "../../styles/Sidebar.scss"; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>HR DASHBOARD</h2>
            <ul>
                <li className="active">Overview (Tổng quan)</li>
                <li>Vacation Days (Nghỉ phép)</li>
            </ul>
        </div>
    );
};

export default Sidebar;