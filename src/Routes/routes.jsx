//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

import Login from '../pages/admin/login'; //import view Login
import PrivateRoute from "./PrivateRoutes"; //import component private routes
import Dashboard from '../pages/admin/dashboard/Index'; //import view admin Dashboard
import CategoriesIndex from '../pages/admin/categories/Index.jsx'; //import view admin categories
import CategoryCreate from '../pages/admin/categories/Create.jsx'; //import view admin categories
import CategoryEdit from "../pages/admin/categories/Edit.jsx"; //import view admin categories

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

      {/* private route "/admin/categories" */}
      <Route
        path="/admin/categories"
        element={
          <PrivateRoute>
            <CategoriesIndex />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/categories/create" */}
      <Route
        path="/admin/categories/create"
        element={
          <PrivateRoute>
            <CategoryCreate />
          </PrivateRoute>
        }
      />

      {/* private route "/admin/categories/edit/:id" */}
      <Route
        path="/admin/categories/edit/:id"
        element={
          <PrivateRoute>
            <CategoryEdit />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default RoutesIndex