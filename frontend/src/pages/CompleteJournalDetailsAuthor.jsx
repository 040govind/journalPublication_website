// ReviewerCard.js
import React, { useState, useEffect } from "react";
import "../style/addreviewer.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CompleteJournalDetailsAuthor = () => {
  const [data, setData] = useState(null);
  let { id } = useParams();

  const getCompleteJournalDetails = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/author/getCompleteDetailsOfJournal/${id}`,
        { headers }
      );
      console.log(response);
      if (response.status === 200) {
        // Assuming the response.data contains the array of journals
        //console.log("One journal", response.data.data);
        setData(response.data.data);
        toast.success("Data Fetched Successfully");
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Some internal server error");
    }
  };

  useEffect(() => {
    getCompleteJournalDetails();
  }, []);
  return (
    <div className="reviewer-card">
      <h3>Title:{data?.journalDetails?.title}</h3>
      <p>Abstract:{data?.journalDetails?.abstract} </p>
      <p>Status: {data?.journalDetails?.status}</p>
      <span>
        Journal-Pdf:{" "}
        <a
          href={data?.journalDetails?.journal_pdf}
          target="_blank"
          style={{ display: "inline" }}
        >
          {data?.journalDetails?.journal_pdf}
        </a>
      </span>
      <p>Journal-Category:{data?.journalDetails?.journalType}</p>
      <h3 style={{ fontWeight: "bold" }}>Author Detail</h3>
      <p>Author:{data?.journalDetails?.author?.name}</p>
      <p>Author-Email:{data?.journalDetails?.author?.email}</p>
      <h3 style={{ textAlign: "center" }}>Reviewers Details</h3>
      <div
        style={{
          display: "flex",
          FlexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data &&
          data.reviewerDetails.length &&
          data.reviewerDetails.map((reviewer, index) => (
            <div
              style={{
                width: "200px",
                border: "2px solid black",
                height: "150px",
                //overflow:'auto'
                margin: "3px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Name:{reviewer?.reviewerData?.name}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Email:{reviewer?.reviewerData?.email}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                status:{reviewer?.status}
              </p>
            </div>
          ))}
      </div>
      <h3 style={{ textAlign: "center", padding: "4px", marginTop: "5px" }}>
        Progress Of Your Paper
      </h3>
      <div style={{ width: "100%", height: "auto", border: "2px solid black" }}>
        <p
          style={{
            fontSize: "15px",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          No. of Reviewers are Added: {data?.totalReviewer}
        </p>
        <p
          style={{
            fontSize: "15px",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          No. of Reviewers are Accepted: {data?.acceptedReviewers}
        </p>
        <p
          style={{
            fontSize: "15px",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          No. of Reviewers are Rejected: {data?.rejectedReviewers}
        </p>
      </div>
    </div>
  );
};

export default CompleteJournalDetailsAuthor;
