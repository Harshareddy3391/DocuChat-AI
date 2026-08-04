import "./Dashboard.css";

import {
  FaFileAlt,
  FaComments,
  FaDatabase,
  FaRobot,
  FaCloudUploadAlt,
  FaUserCircle,
  FaBars
} from "react-icons/fa";

const Dashboard = () => {

  const stats = [
    {
      title: "Documents",
      value: "12",
      icon: <FaFileAlt />
    },
    {
      title: "AI Chats",
      value: "85",
      icon: <FaComments />
    },
    {
      title: "Storage",
      value: "240 MB",
      icon: <FaDatabase />
    },
    {
      title: "AI Responses",
      value: "1,248",
      icon: <FaRobot />
    }
  ];

  const documents = [
    {
      name: "Machine Learning.pdf",
      date: "02 Aug 2026"
    },
    {
      name: "Python Notes.pdf",
      date: "30 Jul 2026"
    },
    {
      name: "Resume.pdf",
      date: "28 Jul 2026"
    }
  ];

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

        {/* Welcome */}

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

          {stats.map((item, index) => (

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

        {/* Bottom */}

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

                {documents.map((doc, index) => (

                  <tr key={index}>

                    <td>

                      {doc.name}

                    </td>

                    <td>

                      {doc.date}

                    </td>

                  </tr>

                ))}

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