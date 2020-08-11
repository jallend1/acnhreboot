import React from "react";
import { properCase } from "../utils";

class Completed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedDetails: []
    };
  }
  componentDidMount() {
    this.props.populateComplete();
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
        <div className="item">{this.displayCompleted()}</div>
      </>
    );
  }
}

export default Completed;
