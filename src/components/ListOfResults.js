import React, { Component } from "react";
import IssueRow from "./IssueRow.js";
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
    // console.log("issues count", props.issues);
    if (upperLimit > props.issues.total_count)
      upperLimit = props.issues.total_count;

    if (
      base > props.issues.total_count ||
      props.issues.total_count === undefined
    )
      upperLimit = base;
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
    console.log("nextProps", nextProps.issues, "currProps", this.props.issues);
    if (
      nextProps.page > this.state.arrayOfPages[4] ||
      nextProps.page < this.state.arrayOfPages[0] ||
      nextProps.issues !== this.props.issues
    ) {
      this.setState({
        arrayOfPages: this.setButtons(nextProps)
      });
    }
  }

  render() {
    return (
      <div>
        <div
          className="row mt-2"
          style={{ border: "1px solid grey", borderRadius: "10px" }}
        >
          <div
            className="d-flex p-3"
            style={{
              backgroundColor: "lightgray",
              width: "100%",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            }}
          >
            <div className="col-3 d-flex flex-column">
              <span className="text-secondary">
                Total results: {this.props.issues.total_count}
              </span>
              {this.props.issues.items !== undefined && (
                <span className="text-secondary">
                  On Page: {this.props.page}
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
            this.props.issues.items.map(item => {
              return <IssueRow issue={item} />;
            })}
        </div>

        {this.props.issues.items !== undefined && (
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
              {this.props.page + 15 <=
                Math.floor(
                  this.props.issues.total_count / this.props.perPage
                ) && (
                <Pagination.Item
                  id={this.props.page + 15}
                  onClick={event => this.paginationClick(event)}
                >
                  {this.props.page + 15}
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
