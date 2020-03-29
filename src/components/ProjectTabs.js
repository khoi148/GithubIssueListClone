import React from "react";

export default function ProjectTabs(props) {
  return (
    <div className="mt-2 pl-3" style={{zIndex: '0'}}>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option1" defaultChecked /> Code
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option2" /> Issues
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option3" /> Pull Requests
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option4" /> Actions
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option5" /> Project
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option6" /> Wiki
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option7" /> Security
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option7" /> Insights
        </label>
      </div>
    </div>
  );
}
