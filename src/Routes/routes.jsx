//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/admin/login.jsx';

function RoutesIndex() {
    return (
        <Routes>

            {/* route "/admin/login" */}
            <Route path="/admin/login" element={<Login />} />

        </Routes>
    )
}

export default RoutesIndex