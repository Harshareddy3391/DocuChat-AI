import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFileAlt,
  FaComments,
  FaDatabase,
  FaRobot,
  FaCloudUploadAlt,
  FaUserCircle,
  FaBars,
  FaHome,
} from "react-icons/fa";

import {
  getDashboardStats,
  getRecentDocuments,
} from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await getDashboardStats();
      const documentsData = await getRecentDocuments();

      setStats(statsData || []);
      setDocuments(documentsData || []);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  /*
   * Backend gives us title/value.
   * Icons are added here on the frontend.
   */
  const getStatIcon = (title) => {
    switch (title?.toLowerCase()) {
      case "documents":
        return <FaFileAlt />;

      case "ai chats":
        return <FaComments />;

      case "storage":
        return <FaDatabase />;

      case "ai responses":
        return <FaRobot />;

      default:
        return <FaFileAlt />;
    }
  };

  /*
   * If backend does not return statistics,
   * show default values.
   */
  const defaultStats = [
    {
      title: "Documents",
      value: 0,
    },
    {
      title: "AI Chats",
      value: 0,
    },
    {
      title: "Storage",
      value: "0 MB",
    },
    {
      title: "AI Responses",
      value: 0,
    },
  ];

  const displayStats =
    stats.length > 0 ? stats : defaultStats;

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-closed"
        }`}
      >

        {/* LOGO */}

        <div className="logo">

          <FaRobot />

          <span>
            DocuChat AI
          </span>

        </div>

        {/* MENU */}

        <ul>

          <li
            className="active"
            onClick={() => navigate("/dashboard")}
          >

            <FaHome />

            <span>
              Dashboard
            </span>

          </li>

          <li
            onClick={() => navigate("/upload")}
          >

            <FaCloudUploadAlt />

            <span>
              Upload
            </span>

          </li>

          <li
            onClick={() => navigate("/documents")}
          >

            <FaFileAlt />

            <span>
              Documents
            </span>

          </li>

          <li
            onClick={() => navigate("/chat")}
          >

            <FaComments />

            <span>
              Chat
            </span>

          </li>

          <li
            onClick={() => navigate("/profile")}
          >

            <FaUserCircle />

            <span>
              Profile
            </span>

          </li>

        </ul>

      </aside>

      {/* ================= MAIN ================= */}

      <div className="main">

        {/* ================= NAVBAR ================= */}

        <nav className="navbar">

          <div
            className="menu"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >

            <FaBars />

          </div>

          <div
            className="profile"
            onClick={() =>
              navigate("/profile")
            }
          >

            <FaUserCircle size={35} />

          </div>

        </nav>

        {/* ================= WELCOME CARD ================= */}

        <section className="welcome-card">

          <div>

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Manage your documents and chat
              with AI effortlessly.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/upload")
            }
          >

            <FaCloudUploadAlt />

            Upload PDF

          </button>

        </section>

        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">

          {displayStats.map(
            (item, index) => (

              <div
                className="stat-card"
                key={index}
              >

                <div className="icon">

                  {getStatIcon(
                    item.title
                  )}

                </div>

                <h3>
                  {item.value ?? 0}
                </h3>

                <p>
                  {item.title}
                </p>

              </div>

            )
          )}

        </section>

        {/* ================= BOTTOM SECTION ================= */}

        <section className="bottom-grid">

          {/* RECENT DOCUMENTS */}

          <div className="documents">

            <h3>
              Recent Documents
            </h3>

            <table>

              <thead>

                <tr>

                  <th>
                    Name
                  </th>

                  <th>
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {documents.length > 0 ? (

                  documents.map(
                    (doc) => (

                      <tr
                        key={doc.id}
                      >

                        <td>
                          {doc.filename}
                        </td>

                        <td>

                          {doc.uploaded_at
                            ? new Date(
                                doc.uploaded_at
                              ).toLocaleDateString()
                            : "N/A"}

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="2"
                      style={{
                        textAlign:
                          "center",
                      }}
                    >
                      No documents found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* RECENT ACTIVITY */}

          <div className="activity">

            <h3>
              Recent Activity
            </h3>

            <ul>

              <li>
                Uploaded Resume.pdf
              </li>

              <li>
                Asked 15 AI questions
              </li>

              <li>
                Deleted Python Notes.pdf
              </li>

              <li>
                Uploaded Machine Learning.pdf
              </li>

            </ul>

          </div>

        </section>

      </div>

    </div>
  );
};

export default Dashboard;