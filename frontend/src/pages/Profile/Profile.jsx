import "./Profile.css";

import {
    getProfile,
    getProfileStats,
} from "../../services/profileService";
import { useEffect, useState } from "react";

import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaFilePdf,
  FaComments,
  FaDatabase,
  FaSignOutAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  /* ===========================
     STATE
  =========================== */

  const [user, setUser] = useState({

    name: "",

    email: "",

    picture: "",

    joined: "",

  });

  const [stats, setStats] = useState({

    documents: 0,

    chats: 0,

    storage: "0 MB",

  });

  const [loading, setLoading] = useState(true);

  /* ===========================
     LOAD PROFILE
  =========================== */

  useEffect(() => {

    fetchProfile();

  }, []);
  //part 2
    /* ===========================
     FETCH PROFILE
  =========================== */

  const fetchProfile = async () => {

    try {

      setLoading(true);

      // Replace this with your backend API later

      const statsResponse = await getProfileStats();
      const profileResponse = await getProfile();

      setUser({

        name: profileResponse.data.name,

        email: profileResponse.data.email,

    picture: profileResponse.data.picture,

    joined: "Member",

});

    }

    catch (error) {

      console.error(error);

      toast.error("Failed to load profile.");

    }

    finally {

      setLoading(false);

    }

  };

  /* ===========================
     LOGOUT
  =========================== */

  const handleLogout = () => {

    localStorage.removeItem("access_token");

    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/login");

  };

  //part 3
    return (

    <div className="profile-page">

      <div className="profile-container">

        {/* ===========================
            PROFILE CARD
        =========================== */}

        <div className="profile-card">

          {

            loading ? (

              <h3>Loading Profile...</h3>

            ) : (

              <>

                {

                  user.picture ? (

                    <img
                      src={user.picture}
                      alt={user.name}
                      className="profile-image"
                    />

                  ) : (

                    <FaUserCircle className="profile-avatar" />

                  )

                }

                <h2>{user.name}</h2>

                <p className="profile-email">

                  <FaEnvelope />

                  {user.email}

                </p>

                <p className="profile-joined">

                  <FaCalendarAlt />

                  Joined {user.joined}

                </p>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >

                  <FaSignOutAlt />

                  Logout

                </button>

              </>

            )

          }

        </div>

        {/* ===========================
            STATS
        =========================== */}

        <div className="profile-stats">

          <div className="j-card">

            <FaFilePdf className="stat-icon" />

            <h3>{stats.documents}</h3>

            <p>Documents</p>

          </div>

          <div className="stat-card">

            <FaComments className="stat-icon" />

            <h3>{stats.chats}</h3>

            <p>AI Chats</p>

          </div>

          <div className="stat-card">

            <FaDatabase className="stat-icon" />

            <h3>{stats.storage}</h3>

            <p>Storage Used</p>

          </div>

        </div>

        
                {/* ===========================
            QUICK INFO
        =========================== */}

        <div className="profile-info">

          <div className="info-card">

            <h3>Account Information</h3>

            <div className="info-item">

              <span>Name</span>

              <strong>{user.name}</strong>

            </div>

            <div className="info-item">

              <span>Email</span>

              <strong>{user.email}</strong>

            </div>

            <div className="info-item">

              <span>Member Since</span>

              <strong>{user.joined}</strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;