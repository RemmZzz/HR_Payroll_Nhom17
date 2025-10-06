// src/features/payroll/PayrollList.jsx
import React, { useState, useEffect } from 'react';
import KPCard from '../../components/KPCard';
import Chart from '../../components/Chart';
import Table from '../../components/Table';

const PayrollList = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [filters, setFilters] = useState({
    department: 'all',
    year: '2024',
    gender: 'all'
  });

  // Dữ liệu mẫu - sẽ thay thế bằng API call thực tế
  useEffect(() => {
    const mockData = [
      { 
        id: 1, 
        month: 'Tháng 1/2024', 
        it: 50000000, 
        hr: 40000000, 
        sales: 60000000,
        marketing: 45000000,
        male: 52000000,
        female: 48000000
      },
      { 
        id: 2, 
        month: 'Tháng 2/2024', 
        it: 52000000, 
        hr: 41000000, 
        sales: 62000000,
        marketing: 46000000,
        male: 54000000,
        female: 49000000
      },
      { 
        id: 3, 
        month: 'Tháng 3/2024', 
        it: 48000000, 
        hr: 39000000, 
        sales: 58000000,
        marketing: 44000000,
        male: 50000000,
        female: 47000000
      },
      { 
        id: 4, 
        month: 'Tháng 4/2024', 
        it: 51000000, 
        hr: 40000000, 
        sales: 61000000,
        marketing: 45500000,
        male: 53000000,
        female: 48500000
      },
    ];
    setEarningsData(mockData);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Chuẩn bị dữ liệu cho biểu đồ dựa trên bộ lọc
  const getChartData = () => {
    let datasets = [];
    
    if (filters.department === 'all' || filters.department === 'it') {
      datasets.push({
        label: 'IT Department',
        data: earningsData.map(item => item.it),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.1
      });
    }
    
    if (filters.department === 'all' || filters.department === 'hr') {
      datasets.push({
        label: 'HR Department',
        data: earningsData.map(item => item.hr),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.1
      });
    }
    
    if (filters.department === 'all' || filters.department === 'sales') {
      datasets.push({
        label: 'Sales Department',
        data: earningsData.map(item => item.sales),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.1
      });
    }

    if (filters.department === 'all' || filters.department === 'marketing') {
      datasets.push({
        label: 'Marketing Department',
        data: earningsData.map(item => item.marketing),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.1)',
        tension: 0.1
      });
    }

    // Biểu đồ theo giới tính
    if (filters.gender === 'male' || filters.gender === 'female') {
      datasets = [{
        label: filters.gender === 'male' ? 'Nam' : 'Nữ',
        data: earningsData.map(item => item[filters.gender]),
        borderColor: filters.gender === 'male' ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
        backgroundColor: filters.gender === 'male' ? 'rgba(54, 162, 235, 0.1)' : 'rgba(255, 99, 132, 0.1)',
        tension: 0.1
      }];
    }

    return {
      labels: earningsData.map(item => item.month),
      datasets: datasets
    };
  };

  // Lấy dữ liệu cho bảng dựa trên bộ lọc
  const getTableData = () => {
    if (filters.department === 'all' && filters.gender === 'all') {
      return earningsData.map(item => ({
        month: item.month,
        it: item.it,
        hr: item.hr,
        sales: item.sales,
        marketing: item.marketing
      }));
    }

    if (filters.gender !== 'all') {
      return earningsData.map(item => ({
        month: item.month,
        earnings: item[filters.gender]
      }));
    }

    return earningsData.map(item => ({
      month: item.month,
      earnings: item[filters.department]
    }));
  };

  const getTableColumns = () => {
    if (filters.gender !== 'all') {
      return [
        { key: 'month', title: 'Tháng' },
        { 
          key: 'earnings', 
          title: `Lương (${filters.gender === 'male' ? 'Nam' : 'Nữ'})`,
          render: (value) => value ? `${value.toLocaleString()} VND` : '-'
        }
      ];
    }

    if (filters.department !== 'all') {
      const departmentNames = {
        it: 'IT Department',
        hr: 'HR Department', 
        sales: 'Sales Department',
        marketing: 'Marketing Department'
      };
      
      return [
        { key: 'month', title: 'Tháng' },
        { 
          key: 'earnings', 
          title: departmentNames[filters.department],
          render: (value) => value ? `${value.toLocaleString()} VND` : '-'
        }
      ];
    }

    return [
      { key: 'month', title: 'Tháng' },
      { 
        key: 'it', 
        title: 'IT Department',
        render: (value) => value ? `${value.toLocaleString()} VND` : '-'
      },
      { 
        key: 'hr', 
        title: 'HR Department',
        render: (value) => value ? `${value.toLocaleString()} VND` : '-'
      },
      { 
        key: 'sales', 
        title: 'Sales Department', 
        render: (value) => value ? `${value.toLocaleString()} VND` : '-'
      },
      { 
        key: 'marketing', 
        title: 'Marketing Department',
        render: (value) => value ? `${value.toLocaleString()} VND` : '-'
      }
    ];
  };

  // Tính toán thống kê
  const getStats = () => {
    const currentData = getTableData();
    let total = 0;
    let count = 0;

    currentData.forEach(item => {
      if (filters.department === 'all' && filters.gender === 'all') {
        total += (item.it + item.hr + item.sales + item.marketing);
        count += 4;
      } else if (item.earnings) {
        total += item.earnings;
        count += 1;
      }
    });

    const average = count > 0 ? Math.round(total / count) : 0;
    
    return {
      total: total,
      average: average,
      growth: 8.5 // Tăng trưởng giả định
    };
  };

  const stats = getStats();

  return (
    <div className="payroll-view p-4">
      <h2 className="mb-4">Quản lý Bảng Lương</h2>

      {/* Bộ lọc */}
      <KPCard title="Bộ lọc dữ liệu" className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Phòng ban</label>
            <select 
              className="form-select"
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
            >
              <option value="all">Tất cả phòng ban</option>
              <option value="it">IT</option>
              <option value="hr">HR</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Năm</label>
            <select 
              className="form-select"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Giới tính</label>
            <select 
              className="form-select"
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
        </div>
      </KPCard>

      {/* Thống kê tổng quan */}
      <div className="row mb-4">
        <div className="col-md-4">
          <KPCard title="Tổng lương">
            <h3 className="text-primary">{stats.total.toLocaleString()} VND</h3>
            <p className="text-muted mb-0">Tổng lương {filters.year}</p>
          </KPCard>
        </div>
        <div className="col-md-4">
          <KPCard title="Lương trung bình">
            <h3 className="text-success">{stats.average.toLocaleString()} VND</h3>
            <p className="text-muted mb-0">Trung bình theo tháng</p>
          </KPCard>
        </div>
        <div className="col-md-4">
          <KPCard title="Tăng trưởng">
            <h3 className="text-info">+{stats.growth}%</h3>
            <p className="text-muted mb-0">So với năm trước</p>
          </KPCard>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="row mb-4">
        <div className="col-12">
          <KPCard title="Biểu đồ lương theo thời gian">
            <Chart 
              type="line" 
              data={getChartData()}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: `Biểu đồ lương ${filters.year}`
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return value.toLocaleString() + ' VND';
                      }
                    }
                  }
                }
              }}
            />
          </KPCard>
        </div>
      </div>

      {/* Bảng dữ liệu chi tiết */}
      <KPCard title="Dữ liệu chi tiết">
        <Table 
          data={getTableData()}
          columns={getTableColumns()}
        />
      </KPCard>
    </div>
  );
};

export default PayrollList;