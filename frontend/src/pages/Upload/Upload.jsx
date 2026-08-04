import "./Upload.css";
import { useRef, useState } from "react";
import { uploadDocument } from "../../services/documentService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaTimes,
} from "react-icons/fa";

const Upload = () => {

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [dragActive, setDragActive] = useState(false);

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const validateFile = (file) => {

    if (!file) return false;

    if (file.type !== "application/pdf") {

      toast.error("Only PDF files are allowed.");

      return false;
    }

    if (file.size > 50 * 1024 * 1024) {

      toast.error("Maximum file size is 50 MB.");

      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!validateFile(file)) return;

    setSelectedFile(file);
  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (!validateFile(file)) return;

    setSelectedFile(file);
  };

  const handleDragOver = (e) => {

    e.preventDefault();

    setDragActive(true);
  };

  const handleDragLeave = () => {

    setDragActive(false);
  };

  const removeFile = () => {

    setSelectedFile(null);

    setProgress(0);

    fileInputRef.current.value = "";
  };

  const handleUpload = async () => {

    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      setLoading(true);

      setProgress(0);

      await uploadDocument(

        formData,

        (event) => {

          const percent = Math.round(
            (event.loaded * 100) / event.total
          );

          setProgress(percent);

        }

      );

      toast.success("Document uploaded successfully!");

setSelectedFile(null);

setProgress(0);

fileInputRef.current.value = "";

setTimeout(() => {

    navigate("/documents", { replace: true });

}, 1500);

    } catch (error) {

     console.error("Upload Error:", error);

toast.error(
    error.response?.data?.detail ||
    "Upload failed. Please try again."
);

    } finally {

      setLoading(false);

    }

  };


   
  return (

    <div className="upload-page">

      <div className="upload-container">

        <h1>Upload Document</h1>

        <p className="upload-subtitle">

          Upload your PDF document and start chatting with AI.

        </p>

        <div

          className={`upload-box ${dragActive ? "drag-active" : ""}`}

          onDragOver={handleDragOver}

          onDragLeave={handleDragLeave}

          onDrop={handleDrop}

        >

          <FaCloudUploadAlt className="upload-icon" />

          <h3>

            Drag & Drop your PDF here

          </h3>

          <p>

            or click below to browse

          </p>

          <input

            type="file"

            accept=".pdf"

            hidden

            ref={fileInputRef}

            onChange={handleFileChange}

          />

          <button

            className="browse-btn"

            onClick={handleBrowse}

            type="button"

          >

            Browse Files

          </button>

          <small>

            Only PDF files are supported (Max 50 MB)

          </small>

        </div>

        {selectedFile && (

          <div className="file-card">

            <div className="file-left">

              <FaFilePdf className="pdf-icon" />

              <div>

                <h5>

                  {selectedFile.name}

                </h5>

                <p>

                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB

                </p>

              </div>

            </div>

            <button

              className="remove-btn"

              type="button"

              onClick={removeFile}

            >

              <FaTimes />

            </button>

          </div>

        )}

       {loading && (

<div className="progress-container">

    <div className="progress-track">

        <div
            className="progress-bar"
            style={{
                width: `${progress}%`,
            }}
        />

    </div>

    <p className="progress-text">

        Uploading... {progress}%

    </p>

</div>

)}

        <button

          className="upload-btn"

          onClick={handleUpload}

          disabled={!selectedFile || loading}

          type="button"

        >

          {loading

            ? `Uploading ${progress}%`

            : "Upload Document"}

        </button>

      </div>

    </div>

  );

};

export default Upload;