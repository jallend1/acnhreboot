import React from "react";
import Creature from "./Creature";

class Creatures extends React.Component {
  componentDidMount() {
    this.props.changeActiveItem(this.props.match.params.creature);
  }
  displayPrice = (item) => {
    if (this.props.sortBy === "cj") {
      return <h6>{item["price-cj"]} bells</h6>;
    } else if (this.props.sortBy === "flick") {
      return <h6>{item["price-flick"]} bells</h6>;
    } else {
      return <h6>{item.price} bells</h6>;
    }
  };

  render() {
    return (
      <div className="container">
        <h2>{this.props.activeItem.toUpperCase()}</h2>
        <div className="items">
          {/* {this.props.activeItems.map((item) => this.displayItems(item))} */}
          {this.props.activeItems.map((item) => (
            <Creature
              item={item}
              displayPrice={this.displayPrice}
              activeItem={this.props.activeItem}
              key={item.name["name-USen"]}
              time={this.props.time}
              markComplete={this.props.markComplete}
              completed={this.props.completed}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Creatures;
