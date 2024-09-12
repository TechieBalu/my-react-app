import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import './PersonTable.css'; // Import the CSS file for styling

const PersonTable = () => {
  const [data, setData] = useState([]);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/persons');
        setData(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h2>Person Data Table</h2>
      <table className="person-table">
        <thead>
          <tr>
            <th>Person ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Address</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.personId}>
              <td>{person.personId}</td>
              <td>{person.lastName}</td>
              <td>{person.firstName}</td>
              <td>{person.address}</td>
              <td>{person.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonTable;
