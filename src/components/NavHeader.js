import React from "react";
import { nav } from "react-bootstrap";

const NavHeader = (props) => {
  return (
    <nav className="nav-header">
      <div className="nav-header-left">
        <a href id="img-id" alt="a icon">
          {" "}
        </a>
        <p>GitHubs Issues</p>
      </div>
      <div className="nav-header-right">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Default: facebook/react"
            onKeyUp={(event) =>
              event.key === "Enter" ? props.handleInput(event.target.value) : ""
            }
          />
          <button type="submit" className="searchButton">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;
