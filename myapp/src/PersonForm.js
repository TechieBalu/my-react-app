import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import PersonTable from './PersonTable'; // Import the PersonTable component
import './PersonForm.css'; // Import the CSS file for styling

const PersonForm = () => {
  const [formData, setFormData] = useState({
    personId: '',
    lastName: '',
    firstName: '',
    address: '',
    city: ''
  });

  const [showTable, setShowTable] = useState(false); // State to control the visibility of the table

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the backend server
      const response = await axios.post('http://localhost:5000/api/submit', formData);
      alert('Data submitted successfully!');
      console.log(response.data);
      
      // Show the table after submission
      setShowTable(true);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="form-container">
      {!showTable ? ( // Display the form if showTable is false
        <>
          <h2>Person Information Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="personId">Person ID:</label>
              <input
                type="text"
                id="personId"
                name="personId"
                value={formData.personId}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </>
      ) : (
        <PersonTable /> // Display the PersonTable if showTable is true
      )}
    </div>
  );
};

export default PersonForm;
