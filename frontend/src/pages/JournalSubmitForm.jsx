// JournalSubmitForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/journalsubmisionform.css';

const JournalSubmitForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    pdfFile: '',
    journalType: 'ml',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      pdfFile: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="container mt-5">
      <div className="form-container">
        <h2 className="text-center mb-4">Journal Submission Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="abstract" className="form-label">
              Abstract <span className="text-danger">*</span>
            </label>
            <textarea className="form-control" id="abstract" name="abstract" rows="4" value={formData.abstract} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="pdfFile" className="form-label">
              Journal PDF File <span className="text-danger">*</span>
            </label>
            <input type="file" className="form-control" id="pdfFile" name="pdfFile" onChange={handleFileChange} accept=".pdf" required />
          </div>
          <div className="mb-3">
            <label htmlFor="journalType" className="form-label">
              Journal Type <span className="text-danger">*</span>
            </label>
            <select className="form-select" id="journalType" name="journalType" value={formData.journalType} onChange={handleChange} required>
              <option value="ml">Machine Learning</option>
              <option value="web-dev">Web Development</option>
              <option value="deep-learning">Deep Learning</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalSubmitForm;
