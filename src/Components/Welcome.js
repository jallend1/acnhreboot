import React from "react";

const Welcome = (props) => {
  return (
    <div className="welcome">
      <header id="logo">
        <h1>Animal Crossing: New Horizons</h1>
        <p>Collectible Guide</p>
      </header>
      <div className="center">
        <h2>The Features</h2>
        <img
          className="tom-nook"
          src="../images/TomNook.png"
          alt="My boy Tom Nook"
        ></img>
      </div>
      <main>
        <div className="feature-list">
          <ul className="collection with-header center">
            <li className="collection-header">
              <h4>Creature Features</h4>
            </li>
            <li className="collection-item">
              Show only creatures available today to help you on your quest to
              100% completion
            </li>
            <li className="collection-item">
              If not available today, see <em>when</em> these creatures are
              available
            </li>
            <li className="collection-item">
              Sort creatures by highest selling price so you can pay off that
              home loan a little faster
            </li>
            <li className="collection-item">
              Mark items as complete to add them to your personal collection
            </li>
            <li className="collection-item">
              Reveal <em>where</em> these creatures are located Rivers? Ocean?
              High-altitude lakes?
            </li>
          </ul>
          <ul className="collection with-header center">
            <li className="collection-header">
              <h4>Explore the nearly 400 villagers</h4>
            </li>
            <li className="collection-item">
              See if you share a birthday with any Animal Crossing villagers!
            </li>
            <li className="collection-item">
              Ability to sort by how many days until their birthday
            </li>
            <li className="collection-item">
              See which villagers are grumpy by nature, and which are peppy
            </li>
            <li className="collection-item">
              Show only Villagers of a certain animal type
            </li>
          </ul>
          <ul className="collection with-header center">
            <li className="collection-header">
              <h4>Other Tasks</h4>
            </li>
            <li className="collection-item">
              Listen to all of K.K. Slider's sweet jams!
            </li>
            <li className="collection-item">
              Find out which of K.K.'s songs are <em>not</em> available for
              purchase!
            </li>
            <li className="collection-item">
              Scope out which art has fake versions
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
