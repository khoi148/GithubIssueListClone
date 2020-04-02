import React, { Component } from "react";
import IssueRow from "./IssueRow.js";
import RepoRow from "./RepoRow.js";
import Pagination from "react-bootstrap/Pagination";

export default class ListOfResults extends Component {
  //this.props. repos | issues | displayWhat {repo: false, issue: false}

  constructor() {
    super();
    this.state = {
      arrayOfPages: []
    };
  }

  paginationClick = event => {
    let pageNum = event.target.id; //id
    console.log(pageNum);
    this.props.pageSwitch(pageNum, this.props.displayWhat);
  };

  setButtons = props => {
    let array = [];
    let upperLimit = 5 * Math.ceil(props.page / 5);
    let base = upperLimit - 4;

    let totalCount =
      props.displayWhat.issue === true
        ? props.issues.total_count
        : props.repos.total_count;
    let maxPage = Math.ceil(totalCount / this.props.perPage);
    if (maxPage !== NaN) maxPage = 1;
    console.log("Max Page", maxPage);
    if (upperLimit > maxPage) upperLimit = maxPage;
    if (base > maxPage || maxPage === undefined) upperLimit = base;

    for (let x = base; x <= upperLimit; x++) {
      array.push(x);
    }
    return array;
  };

  componentDidMount() {
    this.setState({ arrayOfPages: this.setButtons(this.props) });
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log(this.state.page, this.state.arrayOfPages[4], nextProps.page);
    // console.log("nextProps", nextProps.issues, "currProps", this.props.issues);
    if (
      nextProps.page > this.state.arrayOfPages[4] ||
      nextProps.page < this.state.arrayOfPages[0] ||
      nextProps.issues !== this.props.issues ||
      nextProps.repos !== this.props.repos
    ) {
      this.setState({
        arrayOfPages: this.setButtons(nextProps)
      });
    }
  }

  render() {
    let totalCountRender =
      this.props.displayWhat.repo === true
        ? this.props.repos.total_count
        : this.props.issues.total_count;
    return (
      <div className="mt-4">
        <div className="row">
          <div
            className="d-flex p-3"
            style={{
              backgroundColor: "lightgray",
              width: "100%",
              borderRadius: "10px"
            }}
          >
            <div className="col-3 d-flex flex-column">
              <span className="text-secondary">
                total {this.props.displayWhat.issue === true ? "issue" : "repo"}{" "}
                results: {totalCountRender}
              </span>
              {(this.props.issues.items !== undefined ||
                this.props.repos.items !== undefined) && (
                <span className="text-secondary">
                  on page: {this.props.page}
                </span>
              )}
            </div>
            <div className="col-9 d-flex justify-content-end">
              <div className="btn-group p-0 ml-2" style={{ height: "30px" }}>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Author
                  </button>
                  <div className="dropdown-menu">
                    <div>Notifications</div>
                    <a className="dropdown-item" href="#">
                      Not watching
                    </a>
                    <a className="dropdown-item" href="#">
                      Releases only
                    </a>
                    <a className="dropdown-item" href="#">
                      Watching
                    </a>
                    <a className="dropdown-item" href="#">
                      Ignoring
                    </a>
                  </div>
                </div>
              </div>
              <div className="btn-group p-0 ml-2" style={{ height: "30px" }}>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Label
                  </button>
                  <div className="dropdown-menu">
                    <div>Notifications</div>
                    ....
                  </div>
                </div>
              </div>
              <div className="btn-group p-0 ml-2" style={{ height: "30px" }}>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort
                  </button>
                  <div className="dropdown-menu">
                    <div>Notifications</div>
                    ....
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.props.issues.items !== undefined &&
            this.props.displayWhat.issue === true &&
            this.props.issues.items.map(item => {
              return <IssueRow issue={item} />;
            })}

          {this.props.repos.items !== undefined &&
            this.props.displayWhat.repo === true &&
            this.props.repos.items.map(item => {
              return (
                <RepoRow
                  repo={item}
                  token={this.props.token}
                  apiSearchIssuesMethod={input =>
                    this.props.apiSearchIssuesMethod(input)
                  }
                />
              );
            })}
        </div>

        {(this.props.issues.items !== undefined ||
          this.props.repos.items !== undefined) && (
          <div className="mt-4">
            <Pagination>
              <Pagination.Item
                id={"prev-5"}
                onClick={event => this.paginationClick(event)}
              >
                {"<<"}
              </Pagination.Item>
              <Pagination.Item
                id={"prev"}
                onClick={event => this.paginationClick(event)}
              >
                {"<"}
              </Pagination.Item>
              {this.state.arrayOfPages.length !== 0 &&
                this.state.arrayOfPages.map((item, index) => {
                  return (
                    <Pagination.Item
                      id={`${item}`}
                      onClick={event => this.paginationClick(event)}
                    >
                      {item}
                    </Pagination.Item>
                  );
                })}
              <Pagination.Ellipsis />
              {/* <Pagination.Ellipsis />
            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>}  */}
              {this.props.page + 5 <=
                Math.ceil(totalCountRender / this.props.perPage) && (
                <Pagination.Item
                  id={this.props.page + 5}
                  onClick={event => this.paginationClick(event)}
                >
                  {this.props.page + 5}
                </Pagination.Item>
              )}
              <Pagination.Item
                id={"next"}
                onClick={event => this.paginationClick(event)}
              >
                {">"}
              </Pagination.Item>
              <Pagination.Item
                id={"next-5"}
                onClick={event => this.paginationClick(event)}
              >
                {">>"}
              </Pagination.Item>
            </Pagination>
          </div>
        )}
      </div>
    );
  }
}
