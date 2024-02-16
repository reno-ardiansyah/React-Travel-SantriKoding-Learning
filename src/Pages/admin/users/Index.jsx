import React, { useState, useEffect } from "react";

import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../components/utilities/Pagination";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function UserIndex() {
  document.title = "Users - Administrator Travel GIS";

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const token = Cookies.get("token");
  const [search, setSearch] = useState("");

  const fetchData = async (pageNumber, SearchData) => {
    const page = pageNumber ? pageNumber : currentPage;
    const searchQuery = SearchData ? SearchData : search;

    await Api.get(`/api/admin/users?q=${searchQuery}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      setUsers(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setPerPage(response.data.data.per_page);
      setTotal(response.data.data.total);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = (id) => {
    confirmAlert({
      title: 'Are You Sure ?',
      message: 'want to delete this data ?',
      buttons: [{
        label: 'YES',
        onClick: async () => {
          await Api.delete(`/api/admin/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
            .then(() => {
              toast.success("Data Deleted Successfully!", {
                duration: 4000,
                position: "top-right",
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });
              fetchData();
            })
        }
      },
      {
        label: 'NO',
        onClick: () => { }
      }
      ]
    });
  }

  const searchHandler = (e) => {
    e.preventDefault();
    fetchData(1, search);
  }

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card border-0 border-top-success rounded shadow-sm mb-5">
              <div className="card-header">
                <span className="font-weight-bold"><i className="fa fa-users"></i> USERS</span>
              </div>
              <div className="card-body">
                <form onSubmit={searchHandler} className="form-group">
                  <div className="input-group mb-3">
                    <Link to="/admin/users/create" className="btn btn-md btn-success"><i className="fa fa-plus-circle"></i> ADD NEW</Link>
                    <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search by user name" />
                    <button type="submit" className="btn btn-md btn-success"><i className="fa fa-search"></i> SEARCH</button>
                  </div>
                </form>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="text-center">{++index + (currentPage - 1) * perPage}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="text-center">
                            <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationComponent currentPage={currentPage} perPage={perPage} total={total} onChange={(pageNumber) => fetchData(pageNumber)} position="end" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  )
}

export default UserIndex;