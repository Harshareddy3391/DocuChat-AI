import "./Dashboard.css";
import { useEffect, useState } from "react";

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

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="logo">

          <FaRobot />

          <span>DocuChat AI</span>

        </div>

        <ul>

          <li className="active">
            Dashboard
          </li>

          <li>
            Upload
          </li>

          <li>
            Documents
          </li>

          <li>
            Chat
          </li>

          <li>
            Profile
          </li>

        </ul>

      </aside>

      {/* Main */}

      <div className="main">

        {/* Navbar */}

        <nav className="navbar">

          <div className="menu">

            <FaBars />

          </div>

          <div className="profile">

            <FaUserCircle size={35} />

          </div>

        </nav>

        {/* Welcome Card */}

        <section className="welcome-card">

          <div>

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Manage your documents and chat with AI effortlessly.
            </p>

          </div>

          <button>

            <FaCloudUploadAlt />

            Upload PDF

          </button>

        </section>

        {/* Statistics */}

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

        {/* Bottom Section */}

        <section className="bottom-grid">

          {/* Recent Documents */}

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

                        {new Date(doc.created_at).toLocaleDateString()}

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

          {/* Activity */}

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