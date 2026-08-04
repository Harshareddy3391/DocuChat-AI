import "./Documents.css";
import { useState } from "react";

import {
  FaSearch,
  FaFilePdf,
  FaTrashAlt,
  FaEye,
  FaThLarge,
  FaList,
} from "react-icons/fa";

const Documents = () => {

  const [gridView, setGridView] = useState(true);

  const documents = [
    {
      id: 1,
      filename: "Resume.pdf",
      size: "2.4 MB",
      date: "Today",
    },
    {
      id: 2,
      filename: "Machine Learning.pdf",
      size: "8.6 MB",
      date: "Yesterday",
    },
    {
      id: 3,
      filename: "Python Notes.pdf",
      size: "5.2 MB",
      date: "02 Aug 2026",
    },
  ];

  return (

    <div className="documents-page">

      <div className="documents-container">

        {/* Header */}

        <div className="documents-header">

          <div>

            <h1>Documents</h1>

            <p>
              Manage all your uploaded PDF documents.
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="documents-toolbar">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search documents..."
            />

          </div>

          <div className="view-toggle">

            <button
              className={gridView ? "active" : ""}
              onClick={() => setGridView(true)}
            >
              <FaThLarge />
            </button>

            <button
              className={!gridView ? "active" : ""}
              onClick={() => setGridView(false)}
            >
              <FaList />
            </button>

          </div>

        </div>

        {/* Documents */}

        <div
          className={
            gridView
              ? "documents-grid"
              : "documents-list"
          }
        >

          {documents.map((doc) => (

            <div
              className="document-card"
              key={doc.id}
            >

              <FaFilePdf className="pdf-icon" />

              <h4>{doc.filename}</h4>

              <p>Size : {doc.size}</p>

              <p>Uploaded : {doc.date}</p>

              <div className="document-actions">

                <button className="view-btn">

                  <FaEye />

                  Open

                </button>

                <button className="delete-btn">

                  <FaTrashAlt />

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Documents;