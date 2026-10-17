import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Pages/SignIn"
import SignUp from './components/Pages/SignUp'
import ResetPassword from './components/Pages/ResetPassword'
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./components/Pages/Profile";
import Layout from "./components/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
