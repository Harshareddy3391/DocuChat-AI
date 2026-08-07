import "./AuthCallback.css";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const AuthCallback = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(
            window.location.search
        );

        const tocken = params.get("token");

        if (tocken) {

            localStorage.setItem(
                "access_token",
                tocken
            );

            toast.success(
                "Login successful."
            );

            navigate("/dashboard");

        }

        else {

            toast.error(
                "Login failed."
            );

            navigate("/");

        }

    }, [navigate]);

    return (

        <div className="callback-page">

            <h2>

                Signing you in...

            </h2>

        </div>

    );

};

export default AuthCallback;