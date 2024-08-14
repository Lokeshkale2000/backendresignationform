import React, { useEffect, useState } from "react";
import "./index.css";
import FormComponent from "./components/FormComponent";
import TableComponent from "./components/TableComponent";
import axios from "axios";

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user");
      setTableData(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response || error.message || error
      );
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

      await fetchData();
    } catch (error) {
      console.error(
        "Error adding data:",
        error.response || error.message || error
      );
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

      await fetchData();
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response || error.message || error
      );
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

      await fetchData();
    } catch (error) {
      console.error(
        "Error deleting data:",
        error.response || error.message || error
      );
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
        <button className="create" onClick={showCreateForm}>
          Create New Entry
        </button>
        <TableComponent
          data={tableData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
