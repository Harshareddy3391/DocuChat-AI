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
} from "react-icons/fa";

import {
  getDashboardStats,
  getRecentDocuments,
} from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await getDashboardStats();
      const documentsData = await getRecentDocuments();

      setStats(statsData);
      setDocuments(documentsData);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const defaultStats = [
    {
      title: "Documents",
      value: 0,
      icon: <FaFileAlt />,
    },
    {
      title: "AI Chats",
      value: 0,
      icon: <FaComments />,
    },
    {
      title: "Storage",
      value: "0 MB",
      icon: <FaDatabase />,
    },
    {
      title: "AI Responses",
      value: 0,
      icon: <FaRobot />,
    },
  ];

  const displayStats = stats.length ? stats : defaultStats;

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside
  className={`sidebar ${
    sidebarOpen ? "sidebar-open" : "sidebar-closed"
  }`}
>

        <div className="logo">
          <FaRobot />
          <span>DocuChat AI</span>
        </div>

        <ul>

          <li
            className="active"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>

          <li
            onClick={() => navigate("/upload")}
          >
            Upload
          </li>

          <li
            onClick={() => navigate("/documents")}
          >
            Documents
          </li>

          <li
            onClick={() => navigate("/chat")}
          >
            Chat
          </li>

          <li
            onClick={() => navigate("/profile")}
          >
            Profile
          </li>

        </ul>

      </aside>

      {/* ================= MAIN ================= */}

      <div className="main">

        {/* ================= NAVBAR ================= */}

        <nav className="navbar">

          <div
  className="menu"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  <FaBars />
</div>

          <div
            className="profile"
            onClick={() => navigate("/profile")}
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
              Manage your documents and chat with AI effortlessly.
            </p>

          </div>

          <button
            onClick={() => navigate("/upload")}
          >
            <FaCloudUploadAlt />
            Upload PDF
          </button>

        </section>

        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">

          {displayStats.map((item, index) => (

            <div
              className="stat-card"
              key={index}
            >

              <div className="icon">
                {item.icon}
              </div>

              <h3>
                {item.value}
              </h3>

              <p>
                {item.title}
              </p>

            </div>

          ))}

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
                  <th>Name</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {documents.length > 0 ? (

                  documents.map((doc) => (

                    <tr key={doc.id}>

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

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="2"
                      style={{ textAlign: "center" }}
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