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

        if (!tocken) {

            return;

        }

        localStorage.setItem(
            "access_token",
            tocken
        );

        /*
         * Decode JWT payload
         * to get logged-in user's information.
         */
        try {

            const payload = JSON.parse(
                atob(
                    tocken.split(".")[1]
                )
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: payload.name,
                    email: payload.sub,
                    picture: payload.picture
                })
            );

        } catch (error) {

            console.error(
                "Failed to decode user information:",
                error
            );

        }

        toast.success(
            "Login successful."
        );

        navigate(
            "/dashboard",
            { replace: true }
        );

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