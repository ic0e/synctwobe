import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Pages/SignIn"
import SignUp from './components/Pages/SignUp'
import ResetPassword from './components/Pages/ResetPassword'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
