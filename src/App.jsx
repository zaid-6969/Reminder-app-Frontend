import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/authSlice";
import usePushNotifications from "./hooks/usePushNotifications";  // ← FIXED: was "../../Frontend/src/hooks/usePushNotifications"
import LoginPage     from "./pages/LoginPage";
import RegisterPage  from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage   from "./pages/ProfilePage";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((s) => s.auth);
  return token ? children : <Navigate to="/login" replace />;
};

const GuestRoute = ({ children }) => {
  const { token } = useSelector((s) => s.auth);
  return !token ? children : <Navigate to="/dashboard" replace />;
};

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) dispatch(fetchMe());
  }, [token, dispatch]);

  // Registers browser for push notifications after login
  usePushNotifications();

  return (
    <Routes>
      <Route path="/"          element={<Navigate to="/dashboard" replace />} />
      <Route path="/login"     element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/register"  element={<GuestRoute><RegisterPage /></GuestRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/profile"   element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    </Routes>
  );
}