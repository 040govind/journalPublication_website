import React, { useState, useEffect } from "react";
import "../../style/archiveadd.css"; // Import your CSS file
import axios from "axios";
import toast from "react-hot-toast";

const ArchiveAdd = () => {
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [allVolume, setAllVolume] = useState([]);
  const [allIssue,setAllIssue] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author:"",
    pageNumber: "",
    date: "",
    abstract: "",
    pdfFile: "null",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFormData({
      ...formData,
      pdfFile: e.target.files[0],
    });
  };

  const handleVolume = (e) => {
    console.log(typeof(e.target.value));
    setVolume(e.target.value);
  };
  const handleIssue = (e) => {
    //console.log(e.target.value);
    setIssue(e.target.value);
  };

  const getAllIssue = ()=>{
    const volData =parseInt(volume,10);
   // console.log(typeof(vol));
    const VolumeData = allVolume.find((vol) => {
        //console.log(vol.volume === volData);
        return vol.volume === volData});
        //console.log(VolumeData?.issue);
        setAllIssue(VolumeData?.issue);
  }

  const getAllVolume = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        "http://127.0.0.1:5000/api/v1/admin/getAllVolume",
        { headers }
      );

      if (response.status === 200) {
        // Assuming the response.data contains the array of journals
        console.log(response.data.data);
        setAllVolume(response.data.data);
        toast.success("Data Fetched Successfully");
      } else if (response.status == 203) {
        toast.success("Not any Volume Present");
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Some internal server error");
    }
  };

  const handleAddVolume = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        "http://127.0.0.1:5000/api/v1/admin/addVolume",
        { headers }
      );

      if (response.status === 200) {
        // Assuming the response.data contains the array of journals
        console.log(response.data.data);
        setAllVolume(response.data.data);
        toast.success("Volume Added SuccesFully");
      } else if (response.status == 203) {
        toast.error("Some Error While Adding Volume");
      } else {
        toast.error("Failed Add Volume");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Some internal server error");
    }
  };

  const handleAddIsuue = async()=>{
    try {
        const headers = {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        };
  
        const response = await axios.put(
          `http://127.0.0.1:5000/api/v1/admin/addIssue/${volume}`,{},
          { headers }
        );
  
        if (response.status === 200) {
          // Assuming the response.data contains the array of journals
          
          setVolume("");
          toast.success("Issue Added SuccesFully");
        } else if (response.status == 203) {
          toast.error("Some Error While Adding Issue");
        } else {
          toast.error("Failed Add Issue");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Some internal server error");
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here, you can use formData to send data to the server
    const updatedFormData = {
        ...formData,
        vol: volume, // Add additional fields as needed
        issu: issue,
      };
     console.log(updatedFormData);
     try {
     
    
        const { data } = await toast.promise(
          axios.post('http://localhost:5000/api/v1/admin/submit-Archive',  updatedFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
             Authorization: localStorage.getItem('token'),
          },
        }),
          {
            pending: "Archive Submitting in progress...",
            success: "Archive Submitting successfully",
            error: "Unable to submit Archive",
            loading: "Archive Submitting in progress...",
          }
        );
  
        //console.log(data);
        // Handle success, redirect, or show a success message
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle errors, show an error message, etc.
      }
    // Reset form after submission if needed
    // setFormData({
    //   title: "",
    //   pageNumber: "",
    //   date: "",
    //   abstract: "",
    //   file: null,
    // });
  };

  useEffect(() => {
    getAllVolume();
  }, []);
  useEffect(() => {
    getAllIssue();
  }, [volume]);

  return (
    <div className="archive-form-container">
      <h1>Archive Page</h1>
      {!volume && <button onClick={handleAddVolume}>Add Volume</button>}
      {volume && <button onClick={handleAddIsuue}>Add Issue</button>}
      <div>
        <label htmlFor="volume">Volume:</label>
        <select
          id="volume"
          name="volume"
          value={volume}
          onChange={handleVolume}
        >
          <option value="">Select Volume</option>
          {allVolume.map((vol) => (
            <option key={vol._id} value={vol.volume}>
              Volume {vol.volume}
            </option>
          ))}
        </select>

        <label htmlFor="issue">Issue:</label>
        <select id="issue" name="issue" value={issue} onChange={handleIssue}>
          <option value="">Select Issue</option>
          {allIssue?.map((issue) => (
            <option key={issue} value={issue}>
              Issue {issue}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
         <label htmlFor="author">Title:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <label htmlFor="pageNumber">Page Number:</label>
        <input
          type="text"
          id="pageNumber"
          name="pageNumber"
          value={formData.pageNumber}
          onChange={handleChange}
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label htmlFor="abstract">Abstract:</label>
        <textarea
          id="abstract"
          name="abstract"
          value={formData.abstract}
          onChange={handleChange}
        ></textarea>

        <label  htmlFor="pdfFile">File:</label>
        <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArchiveAdd;