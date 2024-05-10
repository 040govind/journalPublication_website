import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/journalcard.css';
import { jwtDecode } from 'jwt-decode';

const JournalCard = ({ journal }) => {
  const { id, title, author, status, date, journalType } = journal;
  //console.log(author);

  const [user, setUser] = useState(
    localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : ''
  );

  // Function to format the date in the desired format (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="journal-card">
      <h3>Title: {title}</h3>
     {!user.isReviewer &&  <p>Author: {author.name}</p>}
      <p>Status: {status}</p>
      <p>Date: {formatDate(date)}</p> {/* Use the formatted date */}
      <p>Subject Category: {journalType}</p>
      {user.isAdmin ? (
        <Link to={`/journal/${journal._id}`} className="detail-button">
          Check More Details / Add Reviewers
        </Link>
      ) : user.isReviewer ? (
        <Link to={`/journal/reviewer/${journal._id}`} className="detail-button">
          Take Action on the Paper
        </Link>
      ) : (
        <Link to={`/journal/author/${journal._id}`} className="detail-button">
          Check More Details
        </Link>
      )}
    </div>
  );
};

export default JournalCard;
