import React from "react";
import "../../styles/Header.scss"; 

const Header = () => {
    return (
        <div className="header">
            <div className="right">
                <span className="user-icon">U</span>
                <span className="username">Jane Doe</span>
            </div>
        </div>
    );
};

export default Header;