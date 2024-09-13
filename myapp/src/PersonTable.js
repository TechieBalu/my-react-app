import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PersonTable.css'; // Assuming you have some CSS for styling

const PersonTable = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editPerson, setEditPerson] = useState(null);
  const [formData, setFormData] = useState({
    personId: '',
    lastName: '',
    firstName: '',
    address: '',
    city: ''
  });

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        setError('There was an error fetching the data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission for update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/persons/${formData.personId}`, formData);
      alert('Person updated successfully!');
      setEditPerson(null); // Close the edit form
      setFormData({
        personId: '',
        lastName: '',
        firstName: '',
        address: '',
        city: ''
      });
      // Refresh data
      const response = await axios.get('http://localhost:5000/api/persons');
      setPersons(response.data);
    } catch (error) {
      setError('Error updating person. Please try again.');
    }
  };

  // Handle edit button click
  const handleEdit = (person) => {
    setEditPerson(person.PersonID);
    setFormData({
      personId: person.PersonID,
      lastName: person.LastName,
      firstName: person.FirstName,
      address: person.Address,
      city: person.City
    });
  };

  // Handle delete button click
  const handleDelete = async (personId) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        await axios.delete(`http://localhost:5000/api/persons/${personId}`);
        alert('Person deleted successfully!');
        // Refresh data
        const response = await axios.get('http://localhost:5000/api/persons');
        setPersons(response.data);
      } catch (error) {
        setError('Error deleting person. Please try again.');
      }
    }
  };

  return (
    <div className="table-container">
      <h2>Person Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : persons.length === 0 ? (
        <p>No data available</p>
      ) : (
        <>
          <table className="person-table">
            <thead>
              <tr>
                <th>Person ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr key={person.PersonID}>
                  <td>{person.PersonID}</td>
                  <td>{person.LastName}</td>
                  <td>{person.FirstName}</td>
                  <td>{person.Address}</td>
                  <td>{person.City}</td>
                  <td>
                    <button onClick={() => handleEdit(person)}>Edit</button>
                    <button onClick={() => handleDelete(person.PersonID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editPerson && (
            <div className="edit-form">
              <h3>Edit Person</h3>
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
                    disabled
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
                <button type="submit" className="submit-button">Update</button>
                <button type="button" onClick={() => setEditPerson(null)} className="cancel-button">Cancel</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonTable;
