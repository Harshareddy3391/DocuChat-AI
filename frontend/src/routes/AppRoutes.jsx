import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthCallback from "../pages/AuthCallback/AuthCallback";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Upload from "../pages/Upload/Upload";
import Documents from "../pages/Documents/Documents";
import Chat from "../pages/Chat/Chat";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";


const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTE
                ========================= */}

                <Route
                    path="/"
                    element={<Login />}
                />


                {/* =========================
                    AUTH CALLBACK
                ========================= */}

                <Route
                    path="/auth/callback"
                    element={<AuthCallback />}
                />


                {/* =========================
                    PROTECTED ROUTES
                ========================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <Upload />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/documents"
                    element={
                        <ProtectedRoute>
                            <Documents />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    404
                ========================= */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

};


export default AppRoutes;