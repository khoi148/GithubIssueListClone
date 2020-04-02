import React, { useState } from "react";
let defaultOption = "Repo";

export default function SearchBar(props) {
  const [filterText, setFilterText] = useState("Filter");
  function filterSelect(event) {
    defaultOption = event.target.id;
    console.log(defaultOption);
    setFilterText(defaultOption);
  }

  function searchEvent(event) {
    console.log("initiated a search, with text: ", event.target.value);
    let searchQuery = event.target.value;
    if (defaultOption === "Repo") {
      props.apiSearchReposMethod(searchQuery);
    } else if (defaultOption === "Issue") {
      props.apiSearchIssuesMethod(searchQuery);
    }
  }

  return (
    <div className="col-8 btn-group pl-3" style={{ height: "30px" }}>
      <div className="btn-group">
        <button
          className="btn btn-outline-secondary btn-sm dropdown-toggle"
          style={{ backgroundColor: "lightgrey" }}
          id="FilterButton"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {filterText}
        </button>
        <div className="dropdown-menu">
          <a
            className="dropdown-item"
            id="Repo"
            onClick={input => filterSelect(input)}
          >
            Repo
          </a>
          <a
            className="dropdown-item"
            id="Issue"
            onClick={input => filterSelect(input)}
          >
            Issue
          </a>
        </div>
      </div>
      <input
        onKeyPress={event => {
          if (event.key === "Enter") {
            searchEvent(event);
          }
        }}
        className="form-control"
        type="search"
        placeholder="Search for issues or repositories"
        aria-label="Search"
        style={{
          height: "30px",
          borderRadius: '0 10px 10px 0'
        }}
      />
    </div>
  );
}
