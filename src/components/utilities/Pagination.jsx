import Pagination from "react-js-pagination"; //import pagination

//function Pagination
function PaginationComponent(props) {
  return (
    props.total > 0 && (
      <Pagination
        innerClass={`pagination justify-content-${props.position} mb-0`}
        activePage={props.currentPage}
        activeClass="page-item active"
        itemsCountPerPage={props.perPage}
        totalItemsCount={props.total}
        onChange={props.onChange}
        itemClasss="page-item"
        linkClass="page-link"
      />
    )
  )
}

export default PaginationComponent; //export default PaginationComponent