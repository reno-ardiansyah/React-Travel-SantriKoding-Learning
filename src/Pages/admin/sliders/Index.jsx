import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../components/utilities/Pagination";
import toast from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function SlidersIndex() {
  document.title = "Sliders -  Administrator Travel GIS";

  const [sliders, setSliders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);
  const token = Cookies.get("token");

  const fetchData = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/api/admin/sliders?page=${page}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      setSliders(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setPerPage(response.data.data.per_page);
      setTotal(response.data.data.total);
    });
  };

  //hook
  useEffect(() => {
    fetchData()
  }, []);

  //function "deleteSlider"
  const deleteSlider = (id) => {

    //show confirm alert
    confirmAlert({
      title: 'Are You Sure ?',
      message: 'want to delete this data ?',
      buttons: [{
        label: 'YES',
        onClick: async () => {
          await Api.delete(`/api/admin/sliders/${id}`, {
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
              fetchData();
            })
        }
      },{
        label: 'NO',
        onClick: () => { }
      }]
    });
  }

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card border-0 border-top-success rounded shadow-sm mb-5">
              <div className="card-header">
                <span className="font-weight-bold"><i className="fa fa-images"></i> SLIDERS</span>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <Link to="/admin/sliders/create" className="btn btn-md btn-success"><i className="fa fa-plus-circle"></i> ADD NEW</Link>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliders.map((slider, index) => (
                        <tr key={index}>
                          <td className="text-center">{++index + (currentPage - 1) * perPage}</td>
                          <td className="text-center">
                            <img src={slider.image} alt="" width="200" className="rounded" />
                          </td>
                          <td className="text-center">  <button onClick={() => deleteSlider(slider.id)} className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button></td>
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
  )
}

export default SlidersIndex;