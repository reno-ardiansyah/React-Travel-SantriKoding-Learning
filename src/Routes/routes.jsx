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
import PlacesIndex from '../pages/admin/places/index.jsx'; //import view admin placesq
import PlaceCreate from '../pages/admin/places/Create.jsx'; //import view admin places
import SidebarIndex from "../pages/admin/sliders/Index.jsx"; //import component sidebar
import SliderCreate from "../pages/admin/sliders/Create.jsx"; //import component slider
import UserIndex from "../pages/admin/users/Index.jsx"; //import component user
import UserCreate from "../pages/admin/users/Create.jsx"; //import component user

function RoutesIndex() {
  return (
    <Routes>

      {/* route "/admin/login" */}
      <Route path="/admin/login" element={<Login />} />

      {/* private route "/admin/dashboard" */}
      <Route path="/admin/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />

      {/* private route "/admin/categories" */}
      <Route path="/admin/categories" element={<PrivateRoute> <CategoriesIndex /> </PrivateRoute>} />

      {/* private route "/admin/categories/create" */}
      <Route path="/admin/categories/create" element={<PrivateRoute> <CategoryCreate /> </PrivateRoute>} />

      {/* private route "/admin/categories/edit/:id" */}
      <Route path="/admin/categories/edit/:id" element={<PrivateRoute> <CategoryEdit /> </PrivateRoute>} />

      {/* private route "/admin/places" */}
      <Route path="/admin/places" element={<PrivateRoute> <PlacesIndex /> </PrivateRoute>} />

      {/* private route "/admin/places/create" */}
      <Route path="/admin/places/create" element={<PrivateRoute> <PlaceCreate /> </PrivateRoute>} />

      {/* private route "/admin/sliders" */}
      <Route path="/admin/sliders" element={<PrivateRoute> <SidebarIndex /> </PrivateRoute>} />

      {/* private route "/admin/sliders/create" */}
      <Route path="/admin/sliders/create" element={<PrivateRoute> <SliderCreate /> </PrivateRoute>} />

      {/* private route "/admin/users" */}
      <Route path="/admin/users" element={<PrivateRoute> <UserIndex /> </PrivateRoute>} />

      {/* private route "/admin/users/create" */}
      <Route path="/admin/users/create" element={<PrivateRoute> <UserCreate /> </PrivateRoute>} />
    </Routes>
  )
}

export default RoutesIndex