import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Pages/SignIn"
import SignUp from './components/Pages/SignUp'
import ResetPassword from './components/Pages/ResetPassword'
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
