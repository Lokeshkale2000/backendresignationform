import React, { useEffect, useState } from "react";
import axios from "axios";

const FormComponent = ({ addData, updateData, currentData, onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    name: "",
    number: "",
    email: "",
    address: "",
  });
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (currentData) {
      setFormData(currentData);
    } else {
      setFormData({
        id: "",
        username: "",
        name: "",
        number: "",
        email: "",
        address: "",
      });
    }
  }, [currentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        const response = await axios.put(
          `http://localhost:8080/user/${formData.id}`,
          formData
        );
        updateData(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:8080/users",
          formData
        );
        addData(response.data);
      }
      setFormData({
        id: "",
        username: "",
        name: "",
        number: "",
        email: "",
        address: "",
      });
      setApiError("");
      onClose(); 
    } catch (error) {
      console.error("Error:", error);
      setApiError("An error occurred while saving data.");
    }
  };

  return (
    <div className="form-container">
      <h2>{formData.id ? "Edit Entry" : "Create Entry"}</h2>
      <form onSubmit={handleSubmit}>
        {apiError && <div className="api-error">{apiError}</div>}
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Number</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{formData.id ? "Update" : "Save"}</button>
        <button type="button" className="cancel" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
