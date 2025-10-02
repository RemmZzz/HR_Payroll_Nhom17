import React from 'react';
import './App.css'; 
import Login from './features/auth/Login';

function App() {
  return (
    // Chúng ta sẽ đặt component Login ở đây
    // Để căn giữa form cho đẹp, có thể thêm một vài class CSS
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Login />
    </div>
  );
}

export default App;