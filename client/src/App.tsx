import { Routes, Route, BrowserRouter } from "react-router";
import { AuthLayout } from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Prelogin from "./pages/prelogin/Prelogin";
import Dashboardlayout from "./pages/dashboard/Dashboardlayout";
import { Toaster } from 'sonner';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Prelogin/>} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Dashboardlayout/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App
