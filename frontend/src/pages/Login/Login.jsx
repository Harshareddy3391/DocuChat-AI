import "./Login.css";
import hero from "../../assets/hero.png";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleGoogleLogin = () => {
    // Backend OAuth URL
    window.location.href = "http://127.0.0.1:8000/auth/google/login";
  };

  return (
    <div className="login-container container-fluid">
      <div className="row min-vh-100">

        {/* Left Side */}
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center login-left">

          <img
            src={hero}
            alt="DocuChat AI"
            className="hero-image mb-4"
          />

          <h1 className="fw-bold">DocuChat AI</h1>

          <p className="text-center mt-3">
            Upload your PDF and chat with your documents using AI.
          </p>

        </div>

        {/* Right Side */}

        <div className="col-lg-6 d-flex justify-content-center align-items-center">

          <div className="login-card shadow">

            <h2 className="text-center mb-4">
              Welcome Back
            </h2>

            <button
              className="btn btn-light google-btn w-100"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={24} />
              <span className="ms-2">
                Continue with Google
              </span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;