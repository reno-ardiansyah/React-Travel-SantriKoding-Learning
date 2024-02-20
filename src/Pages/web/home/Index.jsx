//import layout
import React from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

function Home() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="container mt-5">
            <h1>Home</h1>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Home;