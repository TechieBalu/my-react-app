import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PersonTable.css'; // Assuming you have some CSS for styling

const PersonTable = () => {
  const [persons, setPersons] = useState([]); // State to store the fetched data

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/persons')
      .then(response => {
        console.log('Fetched data:', response.data); // Check if data is fetched
        setPersons(response.data); // Set the state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Person Data</h2>
      {persons.length === 0 ? (
        <p>No data available</p> // Show this when no data is available
      ) : (
        <table>
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
            {persons.map((person) => (
                
              <tr key={person.PersonID}>
                 <td>{person.PersonID}</td>
                <td>{person.LastName}</td>
                <td>{person.FirstName}</td>
                <td>{person.Address}</td>
                <td>{person.City}</td>
              </tr>
            ))}


          </tbody>
        </table>
      )}
    </div>
  );
};

export default PersonTable;
