import "./Login.css";

import hero from "../../assets/hero.png";
import logo from "../../assets/logo.png";

import { FcGoogle } from "react-icons/fc";
import { FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsFileEarmarkTextFill } from "react-icons/bs";

const Login = () => {
  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:8000/auth/google/login";
};

  return (
    <main className="container-fluid login-container">

      <div className="row g-0 min-vh-100">

        {/* ================= LEFT SECTION ================= */}

        <div className="col-lg-7 login-left">

          {/* Brand */}

          <div className="brand">

            <img
              src={logo}
              alt="DocuChat AI Logo"
              className="brand-logo"
            />

            <h3>DocuChat AI</h3>

          </div>

          {/* Hero */}

          <div className="row align-items-center flex-grow-1 hero-section">

            {/* Text */}

            <div className="col-lg-6 col-md-12 hero-text">

              <h1>
                Chat with your
                <br />
                <span>documents</span>
                <br />
                using AI
              </h1>

              <p>
                Upload PDF documents and get instant answers
                with intelligent AI conversations.
              </p>

              <div className="hero-features">

                <div className="feature">

                  <FaShieldAlt className="feature-icon" />

                  <div>

                    <h6>Secure & Private</h6>

                    <span>
                      Your data is encrypted and protected.
                    </span>

                  </div>

                </div>

                <div className="feature">

                  <HiSparkles className="feature-icon" />

                  <div>

                    <h6>AI Powered Answers</h6>

                    <span>
                      Get intelligent responses instantly.
                    </span>

                  </div>

                </div>

                <div className="feature">

                  <BsFileEarmarkTextFill className="feature-icon" />

                  <div>

                    <h6>Multi-document Support</h6>

                    <span>
                      Chat with multiple PDFs effortlessly.
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Hero Image */}

            <div className="col-lg-6 col-md-12 hero-image-wrapper">

              <img
                src={hero}
                alt="AI Assistant Illustration"
                className="hero-image"
              />

            </div>

          </div>

          {/* Footer */}

          <div className="copyright">

            © {new Date().getFullYear()} DocuChat AI. All rights reserved.

          </div>

        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="col-lg-5 login-right d-flex justify-content-center align-items-center">

          <div className="login-card">

            <img
              src={logo}
              alt="DocuChat AI Logo"
              className="login-logo"
            />

            <h3 className="login-title">
              DocuChat AI
            </h3>

            <h2>
              Welcome Back
            </h2>

            <p className="login-subtitle">
              Sign in with your Google account to upload,
              manage and chat with your documents.
            </p>

            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleLogin}
            >

              <FcGoogle size={24} />

              <span>
                Continue with Google
              </span>

            </button>

            <div className="divider">

              <span>OR</span>

            </div>

            <p className="terms">

              By continuing, you agree to our

              <br />

              <a href="/terms">
                Terms of Service
              </a>

              {" "}and{" "}

              <a href="/privacy">
                Privacy Policy
              </a>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Login;