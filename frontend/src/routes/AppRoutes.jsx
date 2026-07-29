import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Upload from "../pages/Upload/Upload";
import Documents from "../pages/Documents/Documents"; // or Document if that's the filename
import Chat from "../pages/Chat/Chat";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";



const AppRoutes = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/"element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        
        </BrowserRouter>
    )
}
             
export default AppRoutes;