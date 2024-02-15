import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../components/utilities/Pagination";
import toast from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function PlacesIndex() {
  document.title = "Places - Administrator Travel GIS";

  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const token = Cookies.get("token");

  const fetchData = async (pageNumber, searchData) => {
    const page = pageNumber ? pageNumber : currentPage;
    const searchQuery = searchData ? searchData : search;

    await Api.get(`/api/admin/places?q=${searchQuery}&page=${page}`, {
      headers: {

        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setPlaces(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setPerPage(response.data.data.per_page);
      setTotal(response.data.data.total);
    });
  };

  //hook
  useEffect(() => {
    fetchData();
  }, []);

  //function "handleSearch"
  const searchHandlder = (e) => {
    e.preventDefault();

    //call function "fetchDataPost"
    fetchData(1, search)
  }

  //function "handleDelete"
  const deletePlace = (id) => {
    confirmAlert({
      title: 'Are You Sure ?',
      message: 'want to delete this data ?',
      buttons: [{
        label: 'YES',
        onClick: async () => {
          await Api.delete(`/api/admin/places/${id}`, {
            headers: {
              //header Bearer + Token
              Authorization: `Bearer ${token}`,
            }
          })
            .then(() => {

              //show toast
              toast.success("Data Deleted Successfully!", {
                duration: 4000,
                position: "top-right",
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });

              //call function "fetchData"
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

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="font-weight-bold"><i className="fa fa-map-marked-alt"></i> PLACES</span>
              </div>
              <div className="card-body">

                <form onSubmit={searchHandlder} className="form-group">
                  <div className="input-group mb-3">
                    <Link to="/admin/places/create" className="btn btn-md btn-success"><i className="fa fa-plus-circle"></i> ADD NEW</Link>
                    <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search by place title" />
                    <button type="submit" className="btn btn-md btn-success"><i className="fa fa-search"></i> SEARCH</button>
                  </div>
                </form>

                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {places.map((place, index) => (
                        <tr key={index}>
                          <td className="text-center">{++index + (currentPage - 1) * perPage}</td>
                          <td>{place.title}</td>
                          <td>{place.category.name}</td>
                          <td className="text-center">
                            <button onClick={() => deletePlace(place.id)} className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationComponent currentPage={currentPage} perPage={perPage} total={total} onChange={(pageNumber) => fetchData(pageNumber)} position="end" />
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  );
}

export default PlacesIndex;