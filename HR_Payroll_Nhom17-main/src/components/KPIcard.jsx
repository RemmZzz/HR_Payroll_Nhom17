import React from 'react';

const KPCard = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      {title && <h3 style={{ marginBottom: '15px' }}>{title}</h3>}
      {children}
    </div>
  );
};

export default KPCard;