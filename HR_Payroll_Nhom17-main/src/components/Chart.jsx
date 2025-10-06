import React from 'react';

const Chart = ({ type, data, options }) => {
  // Đây là component giả lập - bạn cần cài đặt thư viện chart thực tế
  return (
    <div style={{ 
      border: '1px dashed #ccc', 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <h4>Biểu đồ {type}</h4>
        <p>📊 Đây là vùng hiển thị biểu đồ</p>
        <p><small>Install chart library like Chart.js or Recharts</small></p>
      </div>
    </div>
  );
};

export default Chart;