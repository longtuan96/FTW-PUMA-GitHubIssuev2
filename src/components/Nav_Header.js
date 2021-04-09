import React from "react";
import { Nav } from "react-bootstrap";

const Nav_Header = () => {
  return (
    <nav className="nav-header">
      <div className="nav-header-left">
        <a href="" id="img-id"></a>
        <p>GitHubs Issues</p>
      </div>
      <div className="nav-header-right">
        <div className="search">
          <input type="text" className="searchTerm" value="facebook/react" />
          <button type="submit" className="searchButton">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav_Header;
