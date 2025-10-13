import React from "react";
import SidebarReports from "../../components/SidebarReports";
import HeaderReports from "../../components/HeaderReports";
import ReportFormReports from "../../components/ReportFormReports";
import "./Reports.scss";

export default function App() {
    return (
        <div className="dashboard">
            <SidebarReports />
            <div className="main">
                <HeaderReports />
                <div className="content">
                    <ReportFormReports />
                </div>
            </div>
        </div>
    );
}
