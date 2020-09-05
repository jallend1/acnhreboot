import React from "react";
import { properCase } from "../utils";

class Completed extends React.Component {
  componentDidMount() {
    this.props.changeActiveItem("completed");
    // Populates items when page is linked to, but not when going directly to URL
    this.props.populateComplete();
  }

  componentDidUpdate() {
    // TODO The below line breaks it, but Completed items are not being loaded when going directly to /completed. The problem lies in populateComplete!
    // this.props.populateComplete();
  }

  displayCompleted = () => {
    return this.props.allItems.completed.map((item) => {
      return (
        <div key={item.key}>
          <p>{properCase(item.name["name-USen"])}</p>
          <img
            src={item.fileLocation}
            alt={`Icon of ${item.name["name-USen"]}`}
          ></img>
        </div>
      );
    });
  };

  render() {
    return (
      <>
        <div className="item center">{this.displayCompleted()}</div>
      </>
    );
  }
}

export default Completed;
