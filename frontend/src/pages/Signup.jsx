import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import toast from "react-hot-toast";

 const Signup= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    qualification: '',
    degree_pdf: null,
    isReviewer: 'no',
    specialistArea: 'ml',
    agreeTerm: false,
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { id, value, type, checked, files,name } = e.target;
    //console.log(name+" "+ value);
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
    
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    try {
     
    
      const { data } = await toast.promise(
        axios.post('http://localhost:5000/api/v1/author/register', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
        {
          pending: "Register in progress...",
          success: "User Registered successfully",
          error: "Unable to Register user",
          loading: "Register in progress...",
        }
      );

      console.log(data);
      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors, show an error message, etc.
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="form-title">Sign up</h2>
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="name">
              Your Name
            </label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Your Email
            </label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="qualification">
              Qualification
            </label>
            <input
              className="input"
              type="text"
              id="qualification"
              name="qualification"
              placeholder="Your Qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="degree_pdf">
              Degree PDF
            </label>
            <input
              className="input"
              type="file"
              id="degree_pdf"
              name="degree_pdf"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="isReviewer">
              Are you a reviewer?
            </label>
            <select
              className="input"
              id="isReviewer"
              name="isReviewer"
              value={formData.isReviewer}
              onChange={handleChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="specialistArea">
              Specialist Area
            </label>
            <select
              className="input"
              id="specialistArea"
              name="specialistArea"
              value={formData.specialistArea}
              onChange={handleChange}
            >
              <option value="ml">Machine Learning</option>
              <option value="webdev">Web Development</option>
              <option value="mechanical">Mechanical</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group checkbox-label">
            <input
              type="checkbox"
              id="agree-term"
              className="agree-term"
              name="agreeTerm"
              checked={formData.agreeTerm}
              onChange={handleChange}
            />
            <label className="label-agree-term" htmlFor="agree-term">
              <span></span>
              I agree to all statements in{' '}
              <Link to="#">Terms</Link>
              <a className="term-service" href="#">
                Terms of service
              </a>
            </label>
          </div>
          <div className="form-group">
            <button className="submit-button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
