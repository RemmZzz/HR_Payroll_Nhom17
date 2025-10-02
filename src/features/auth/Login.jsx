import React from 'react';

// Định nghĩa các style tùy chỉnh
const inlineStyle = {
    primaryColor: '#4f46e5',
    primaryHover: '#4338ca',
    bodyBackground: '#f8fafc',
};

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        form.classList.add('was-validated');

        if (form.checkValidity()) {
            alert('Đăng nhập thành công! (Form hợp lệ)');
            console.log("Form submitted and valid!");
        }
    };
    
    const btnPrimaryStyle = {
        backgroundColor: inlineStyle.primaryColor,
        borderColor: inlineStyle.primaryColor,
        color: 'white',
    };

    return (
        <div className="text-body min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: inlineStyle.bodyBackground }}>
            <div className="card p-4 p-md-5 rounded-4 shadow-lg border-0" style={{ maxWidth: '440px', width: '100%' }}>
                <div className="text-center mb-4">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <svg 
                            style={{ width: '2.5rem', height: '2.5rem', color: inlineStyle.primaryColor }} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                    <h1 className="h3 fw-bold text-dark">HR/Payroll System</h1>
                    <p className="text-muted">Đăng nhập để quản lý nhân sự và lương thưởng</p>
                </div>

                <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-medium text-secondary">Địa chỉ Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control" // Bỏ form-control-sm
                            required
                            style={{ '--bs-focus-ring-color': 'rgba(79, 70, 229, 0.25)', '--bs-focus-border-color': inlineStyle.primaryColor }}
                        />
                        <div className="invalid-feedback">Vui lòng nhập địa chỉ email hợp lệ.</div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-medium text-secondary">Mật khẩu</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-control" // Bỏ form-control-sm                            ssh-keygen -t ed25519 -C "your_email@example.com"
                            required
                            style={{ '--bs-focus-ring-color': 'rgba(79, 70, 229, 0.25)', '--bs-focus-border-color': inlineStyle.primaryColor }}
                        />
                        <div className="invalid-feedback">Vui lòng nhập mật khẩu của bạn.</div>
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                        <a href="#" className="text-decoration-none fw-medium small" style={{ color: inlineStyle.primaryColor }}>
                            Đăng ký tài khoản
                        </a>
                        <a href="#" className="text-decoration-none fw-medium small" style={{ color: inlineStyle.primaryColor }}>
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Main Login Button - ĐÃ THAY ĐỔI */}
                    <div className="d-grid mb-4">
                        <button 
                            type="submit" 
                            className="btn fw-semibold shadow" // Bỏ btn-lg
                            style={btnPrimaryStyle}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = inlineStyle.primaryHover}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = inlineStyle.primaryColor}
                        >
                            Đăng nhập
                        </button>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                        <div className="flex-grow-1 border-top border-muted"></div>
                        <span className="mx-2 text-muted small bg-white px-2">Hoặc</span>
                        <div className="flex-grow-1 border-top border-muted"></div>
                    </div>

                    {/* Sign in with Google Button - ĐÃ THAY ĐỔI */}
                    <div className="d-grid">
                        <button type="button" className="btn btn-outline-secondary bg-light fw-medium shadow-sm d-flex align-items-center justify-content-center">
                            <svg style={{ width: '1.25rem', height: '1.25rem' }} className="me-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
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