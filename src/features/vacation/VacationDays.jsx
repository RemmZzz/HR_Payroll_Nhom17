import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import Header from "../../components/ui/Header";
import VacationDashboard from "../../components/ui/VacationDashboard";
import "../../styles/VacationDays.scss";

const VacationDays = () => {
    return (
        <div className="app_VacationDays">
            <Sidebar />
            <div className="main-content">
                <Header />
                <VacationDashboard />
            </div>
        </div>
    );
};

export default VacationDays;
