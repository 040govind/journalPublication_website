// JournalCard.js

import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import '../style/journalcard.css';
import { jwtDecode } from 'jwt-decode';

const JournalCard = ({journal}) => {
const { id, title, author, status, date,journalType } = journal;
//console.log(journal);
const [user, setUser] = useState(
  localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : ""
);
  return (
    <div className="journal-card">
      <h3>Title: Cancer Detection </h3>
      <p>Author: {author.name}</p>
      <p>Status: {status}</p>
      <p>Date: {date}</p>
      <p>Subject Category:{journalType}</p>
      {
         user.isAdmin ?<Link to={`/journal/${journal._id}`} className="detail-button">
        Check More Details / Add Reviewers
      </Link>:<Link to={`/journal/author/${journal._id}`} className="detail-button">
        Check More Details
      </Link>
      }
    </div>
  );
};

export default JournalCard;
