import React from "react";

const TableComponent = ({ data, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.password}</td>
                <td>
                  <button className="edit" onClick={() => onEdit(item.id)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => onDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;
