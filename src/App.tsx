import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const Login = React.lazy(() => import("./pages/auth/Login"));
const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/auth/ResetPassword"));
const NewPassword = React.lazy(() => import("./pages/auth/NewPassword"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Business_Mgt = React.lazy(() => import("./pages/Business_Mgt"));
const Admin_Mgt = React.lazy(() => import("./pages/Admin_Mgt"));
const Settings = React.lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/business-mgt" element={<Business_Mgt />} />
      <Route path="/admin-mgt" element={<Admin_Mgt />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
