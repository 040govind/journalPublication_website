import React, { useState } from 'react';
import './styles.css'; // Import your CSS file

const data = [
  { id: 1, name: 'John Doe', gmail: 'john.doe@gmail.com', degree: 'Computer Science', qualification: 'Bachelor' },
  { id: 2, name: 'Jane Smith', gmail: 'jane.smith@gmail.com', degree: 'Electrical Engineering', qualification: 'Master' },
  { id: 3, name: 'Alice Johnson', gmail: 'alice.johnson@gmail.com', degree: 'Mechanical Engineering', qualification: 'PhD' },
  // Add more data as needed
];

const Table = () => {
  const [applicants, setApplicants] = useState(data);

  const handleAccept = (id) => {
    // Handle accept action here, you can modify the applicant's status or remove them from the list
    // For demonstration, let's just remove the applicant from the list
    setApplicants(applicants.filter(applicant => applicant.id !== id));
  };

  const handleReject = (id) => {
    // Handle reject action here, you can modify the applicant's status or remove them from the list
    // For demonstration, let's just remove the applicant from the list
    setApplicants(applicants.filter(applicant => applicant.id !== id));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gmail</th>
            <th>Degree</th>
            <th>Qualification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(applicant => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>
              <td>{applicant.gmail}</td>
              <td>{applicant.degree}</td>
              <td>{applicant.qualification}</td>
              <td>
                <button onClick={() => handleAccept(applicant.id)} className="accept-btn">Accept</button>
                <button onClick={() => handleReject(applicant.id)} className="reject-btn">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
