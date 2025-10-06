import React, { useState } from 'react';

// Định nghĩa các style tùy chỉnh tương tự như trong thẻ <style> của bạn
const inlineStyle = {
    // Tái tạo màu Indigo (primary) và hiệu ứng focus
    primaryColor: '#4f46e5', // indigo-600
    primaryHover: '#4338ca', // indigo-700
    bodyBackground: '#f8fafc', // blue-50
};

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // **Xác thực Bootstrap 5:** // Lấy form hiện tại
        const form = e.currentTarget;
        
        // Kiểm tra tính hợp lệ của form theo chuẩn HTML5/Bootstrap
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        
        // Thêm lớp 'was-validated' để hiển thị các thông báo validation của Bootstrap
        form.classList.add('was-validated');

        if (form.checkValidity()) {
            // Nếu form hợp lệ, xử lý logic đăng nhập ở đây
            alert('Đăng nhập thành công! (Form hợp lệ)');
            console.log("Form submitted and valid!");
        }
    };
    
    // Style cho nút Đăng nhập chính (tái tạo .btn-primary-custom)
    const btnPrimaryStyle = {
        backgroundColor: inlineStyle.primaryColor,
        borderColor: inlineStyle.primaryColor,
        color: '#fff' // Đảm bảo chữ trắng
    };
    
    // Style cho nút Đăng nhập với Facebook
    const btnFacebookStyle = {
        backgroundColor: inlineStyle.facebookColor,
        borderColor: inlineStyle.facebookColor,
        color: '#fff', // Chữ trắng trên nền xanh
    };


    return (
        // Sử dụng inline style cho body background để tái tạo style gốc
        <div className="text-body min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: inlineStyle.bodyBackground }}>
            {/* 1. Login Screen Layout */}
            <div className="card p-4 p-md-5 rounded-4 shadow-lg border-0" style={{ maxWidth: '440px', width: '100%' }}>
                <div className="text-center mb-5">
                    {/* Logo + Branding */}
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        {/* Áp dụng màu primary cho SVG */}
                        <svg 
                            className="text-primary-custom" 
                            style={{ width: '2.5rem', height: '2.5rem', color: inlineStyle.primaryColor }} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 2 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                    <h1 className="h3 fw-bold text-dark">HR/Payroll System</h1>
                    <p className="text-muted">Đăng nhập để quản lý nhân sự và lương thưởng</p>
                </div>

                {/* Thêm 'noValidate' và 'onSubmit' để xử lý form trong React */}
                <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                    {/* Email Input */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-medium text-secondary">Địa chỉ Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control p-2" 
                            placeholder="vd: tenban@congty.com" 
                            required
                            // Tái tạo style focus bằng CSS classes hoặc global CSS
                            style={{ '--bs-focus-ring-color': 'rgba(79, 70, 229, 0.25)', '--bs-focus-border-color': inlineStyle.primaryColor }}
                        />
                        {/* Bootstrap feedback */}
                        <div className="invalid-feedback">Vui lòng nhập địa chỉ email hợp lệ.</div>
                    </div>
                    
                    {/* Password Input */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-medium text-secondary">Mật khẩu</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-control p-2" 
                            placeholder="********" 
                            required
                            style={{ '--bs-focus-ring-color': 'rgba(79, 70, 229, 0.25)', '--bs-focus-border-color': inlineStyle.primaryColor }}
                        />
                        <div className="invalid-feedback">Vui lòng nhập mật khẩu của bạn.</div>
                    </div>

                    {/* Links: Register (thêm) và Forgot Password */}
                    <div className="d-flex justify-content-between mb-4">
                        <a href="#" className="text-decoration-none fw-medium small" style={{ color: inlineStyle.primaryColor }}>Đăng ký tài khoản</a> {/* Thêm link Đăng ký */}
                        <a href="#" className="text-decoration-none fw-medium small" style={{ color: inlineStyle.primaryColor }}>Quên mật khẩu?</a>
                    </div>


                    {/* Main Login Button */}
                    <div className="d-grid mb-4">
                        <button 
                            type="submit" 
                            className="btn btn-lg fw-semibold shadow"
                            style={btnPrimaryStyle}
                            // Thêm hiệu ứng hover thủ công nếu không dùng CSS file
                            onMouseOver={e => e.currentTarget.style.backgroundColor = inlineStyle.primaryHover}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = inlineStyle.primaryColor}
                        >
                            Đăng nhập
                        </button>
                    </div>

                    {/* Dòng "Hoặc" */}
                    <div className="d-flex align-items-center mb-4">
                        <div className="flex-grow-1 border-top border-muted"></div>
                        <span className="mx-2 text-muted small bg-white px-2">Hoặc</span>
                        <div className="flex-grow-1 border-top border-muted"></div>
                    </div>

                    {/* Sign in with Google Button (giữ nguyên) */}
                    <div className="d-grid mb-3">
                        <button type="button" className="btn btn-outline-secondary btn-lg bg-light fw-medium shadow-sm d-flex align-items-center justify-content-center">
                            <svg style={{ width: '1.25rem', height: '1.25rem' }} className="me-3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44.5 20H42V18H24V20H44.5Z" fill="#EA4335"/>
                                <path d="M44.5 24H42V22H24V24H44.5Z" fill="#4285F4"/>
                                <path d="M44.5 28H42V26H24V28H44.5Z" fill="#34A853"/>
                                <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C30.63 44 36.43 40.48 39.99 35.38L37.1 32.74C34.33 34.8 30.66 36 26.68 36C18.67 36 12 29.33 12 24C12 18.67 18.67 12 26.68 12C30.66 12 33.72 13.56 35.53 15.39L38.2 12.87C34.2 9.53 29.35 8 24 8C15.16 8 8 15.16 8 24C8 32.84 15.16 40 24 40C30.93 40 37.1 36.26 40.7 30.88L44.5 34.5C40.45 40.94 32.86 45 24 45C11.45 45 1.5 35.05 1.5 24C1.5 12.95 11.45 3 24 3C36.55 3 46.5 12.95 46.5 24C46.5 24.57 46.47 25.13 46.4 25.68H24V20H44.5Z" fill="#EA4335"/>
                            </svg>
                            Đăng nhập với Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;