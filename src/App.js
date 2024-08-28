import React, { useEffect, useState } from "react";
import "./index.css";
import FormComponent from "./components/FormComponent";
import TableComponent from "./components/TableComponent";
import axios from "axios";

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8080/user");
      setTableData(response.data);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async (data) => {
    try {
      await axios.post("http://localhost:8080/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTableData([...tableData, data]);
    } catch (error) {
      setError("Error adding data");
      console.error("Error adding data:", error);
    }
    setIsFormVisible(false);
  };

  const updateData = async (data) => {
    try {
      await axios.put(`http://localhost:8080/user/${data.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTableData((prevData) =>
        prevData.map((item) => (item.id === data.id ? data : item))
      );
    } catch (error) {
      setError("Error updating data");
      console.error("Error updating data:", error);
    }
    setCurrentIndex(null);
    setIsFormVisible(false);
  };

  const handleEdit = (id) => {
    const index = tableData.findIndex((item) => item.id === id);
    setCurrentIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      setTableData(tableData.filter((item) => item.id !== id));
    } catch (error) {
      setError("Error deleting data");
      console.error("Error deleting data:", error);
    }
  };

  const showCreateForm = () => {
    setCurrentIndex(null);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="App">
      <div className={`form-sidebar ${isFormVisible ? "show" : ""}`}>
        <FormComponent
          addData={addData}
          updateData={updateData}
          currentData={currentIndex !== null ? tableData[currentIndex] : null}
          onClose={handleCloseForm}
        />
      </div>
      <div className="main-content">
        <h1>Data Table</h1>
        {error && <div className="error-message">{error}</div>}
        <button className="create" onClick={showCreateForm}>
          Create New Entry
        </button>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <TableComponent
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
