//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

import Login from '../pages/admin/login'; //import view Login
import PrivateRoute from "./PrivateRoutes"; //import component private routes
import Dashboard from '../pages/admin/dashboard/Index'; //import view admin Dashboard

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