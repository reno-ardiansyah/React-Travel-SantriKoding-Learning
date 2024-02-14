import Api from "../../api"; //import BASE URL API
import Cookies from "js-cookie"; //import js cookie
import toast from "react-hot-toast"; //import toats
import React, { useState } from "react"; //import hook react
import { useNavigate } from "react-router-dom"; //import react router dom

function Login() {
  document.title = "Login - Administrator Travel GIS"; //title page

  const navigate = useNavigate(); //navigate
  const [email, setEmail] = useState(""); //state user
  const [password, setPassword] = useState(""); //state password
  const [isLoading, setLoading] = useState(false); //state loading
  const [validation, setValidation] = useState({}); //state validation

  //function "loginHandler"
  const loginHandler = async (e) => {
    e.preventDefault();

    setLoading(true); //set state isLoading to "true"

    await Api.post("/api/admin/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        setLoading(false); //set state isLoading to "false"

        //show toast
        toast.success("Login Successfully.", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

        Cookies.set("token", response.data.token); //set cookie
        navigate("/admin/dashboard"); //redirect dashboard page
      })
      .catch((error) => {
        setLoading(false); //set state isLoading to "false"
        setValidation(error.response.data); //set error response validasi to state "validation"
      });
  };

  if (Cookies.get("token")) {
    return navigate("/admin/dashboard"); //redirect dashboard page
  }
  
  return (
    <React.Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 mt-150">
            <div className="text-center mb-4">
              <h4><i className="fa fa-map-marked-alt"></i> <strong>TRAVEL GIS</strong></h4>
            </div>
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body">
                <div className="text-center">
                  <h6 className="fw-bold">LOGIN ADMIN</h6>
                  <hr />
                </div>
                {validation.message && (
                  <div className="alert alert-danger">
                    {validation.message}
                  </div>
                )}
                <form onSubmit={loginHandler}>

                  <label className="mb-1">EMAIL ADDRESS</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                  </div>
                  {validation.email && (
                    <div className="alert alert-danger">
                      {validation.email[0]}
                    </div>
                  )}

                  <label className="mb-1">PASSWORD</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  </div>
                  {validation.password && (
                    <div className="alert alert-danger">
                      {validation.password[0]}
                    </div>
                  )}

                  <button className="btn btn-success shadow-sm rounded-sm px-4 w-100" type="submit" disabled={isLoading}> {isLoading ? "LOADING..." : "LOGIN"} </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )

}

export default Login;