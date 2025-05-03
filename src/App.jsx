import { Routes, Route } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { useAuth } from "./auth/AuthContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./auth/ProtectedRoute";

const drawerWidth = 180;

export default function App() {
  const { token } = useAuth();

  return (
    <Box sx={{ display: "flex" }}>
      {token && <Sidebar />}
      <Box sx={{ flexGrow: 1 }}>
        {token && <Header />}
        <Box
          component="main"
          sx={{ p: 2, ...(token && { mx: `${drawerWidth}px`, mt: "64px" }) }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateEventPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/:id"
              element={
                <ProtectedRoute>
                  <EventDetailPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
