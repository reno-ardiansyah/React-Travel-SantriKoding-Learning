//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/admin/login';

//import component private routes
import PrivateRoute from "./PrivateRoutes";

//import view admin Dashboard
import Dashboard from '../pages/admin/dashboard/Index';

function RoutesIndex() {
  return (
    <Routes>

      {/* route "/admin/login" */}
      <Route path="/admin/login" element={<Login />} />

      {/* private route "/admin/dashboard" */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

    </Routes>
  )
}

export default RoutesIndex