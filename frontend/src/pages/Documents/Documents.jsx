import "./Documents.css";

import { useEffect, useState } from "react";

import {
  FaSearch,
  FaFilePdf,
  FaTrashAlt,
  FaEye,
  FaThLarge,
  FaList,
} from "react-icons/fa";

import {
  getDocuments,
  deleteDocument,
} from "../../services/documentService";

import { toast } from "react-toastify";

const Documents = () => {

  const [gridView, setGridView] = useState(true);

  const [documents, setDocuments] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDocuments();

  }, []);

  const fetchDocuments = async () => {

    try {

      setLoading(true);

      const response = await getDocuments();

      setDocuments(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load documents.");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDocument(id);

      toast.success("Document deleted successfully.");

      fetchDocuments();

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete document.");

    }

  };

  const filteredDocuments = documents.filter((doc) =>
    doc.filename
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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

        {/* Toolbar */}

        <div className="documents-toolbar">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
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

        {/* Loading */}

        {loading ? (

          <h3 style={{ textAlign: "center" }}>

            Loading documents...

          </h3>

        ) : filteredDocuments.length === 0 ? (

          <h3 style={{ textAlign: "center" }}>

            No documents found.

          </h3>

        ) : (

          <div
            className={
              gridView
                ? "documents-grid"
                : "documents-list"
            }
          >

            {filteredDocuments.map((doc) => (

              <div
                className="document-card"
                key={doc.id}
              >

                <FaFilePdf className="pdf-icon" />

                <h4>

                  {doc.filename}

                </h4>

                <p>

                  Size : {doc.size || "N/A"}

                </p>

                <p>

                  Uploaded :

                  {" "}

                {doc.uploaded_at
  ? new Date(
      doc.uploaded_at
    ).toLocaleDateString()
  : "N/A"}

                </p>

                <div className="document-actions">

                  <button className="view-btn">

                    <FaEye />

                    Open

                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(doc.id)
                    }
                  >

                    <FaTrashAlt />

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default Documents;