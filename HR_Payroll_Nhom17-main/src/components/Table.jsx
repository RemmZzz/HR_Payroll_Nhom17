import React from 'react';

const Table = ({ data, columns }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={column.key} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {column.render ? column.render(row[column.key]) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;