import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import './ReportAnalyzer.css';
import image from '../../assets/image.jpg';
import loader from "../../assets/Loading (1).gif"

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error messages
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null); // Clear any previous error
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a lab report first.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true); // Set loading to true before the upload starts

    try {
      const response = await axios.post('http://localhost:3000/api/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.gptResponse);
      navigate('/Visualize',{ state: response.data.gptResponse });

      console.log('File uploaded successfully', response.data);
      // alert('File uploaded successfully');
      // You can redirect to the result page here if needed
    } catch (error) {
      console.error('Error uploading file', error);
      setError('Error uploading file. Please try again.'); // Set error state
    } finally {
      setLoading(false); // Set loading to false after the upload is done
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (<>
  {
    loading ?  <div className="loading">
    <img src={loader} alt="Loading..." className="loading" />
    <p>Uploading...</p>
  </div> : (


  
    <div className={`card-container ${loading ? 'blur-effect' : ''}`}>
      <div className="card1">
        <h2 className="title">Upload Lab Report</h2>
        <p className="subtitle">Please attach a lab report to proceed</p>

        <div className="upload-section">
          <input
            type="file"
            accept="application/pdf"
            id="fileInput"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button className="upload-button" onClick={handleButtonClick} disabled={loading}>
            <FaCloudUploadAlt />
            <span>Upload Lab Report</span>
          </button>
        </div>

        <div className="divider"></div>

        <div className="attached-section">
          <p className="attached-title">Attached Lab Report</p>
          <p className="attached-placeholder">
            {fileName ? fileName : 'Uploaded lab report will be shown here'}
          </p>
        </div>

        {/* Show loading GIF when loading is true */}
        {/* {loading ? (
          <div className="loading-container">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
            <p>Uploading...</p>
          </div>
        ) : ( */}
          <button className="continue-button" onClick={handleUpload}>
            Continue
          </button>

        {/* )} */}

        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </div>

      <div className="card2">
        <h2 className="card-title">Guide to upload a lab report</h2>
        <div className="card-content">
          <img
            src={image}
            className="card-image"
            alt="Guide to upload lab report"
          />
          <ul className="card-instructions">
            <li>Don't crop out any part of the image</li>
            <li>Avoid blurred image</li>
            <li>Supported files type: jpeg, jpg, png, pdf</li>
            <li>Maximum allowed file size: 2MB</li>
          </ul>
        </div>
      </div>
    </div>
        )

      }
    </>
  );
};

export default ReportAnalyzer;
