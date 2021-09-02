import React from "react";
import { Link } from "react-router-dom";

const Popup = ({ villagers, activeCard, closeDetails }) => {
  const villager = villagers.find(
    (villager) => villager["file-name"] === activeCard
  );
  const {
    "file-name": fileName,
    name: { "name-USen": name },
    "birthday-string": birthday,
  } = villager;
  return (
    <>
      <div className="villagerdetails active">
        <div className="popup">
          <button className="close" onClick={() => closeDetails(fileName)}>
            &times;
          </button>
          <h2>{name}</h2>
          <img src={`./images/villagers/${fileName}.png`} alt={name} />
          <p>Personality: {villager.personality}</p>
          <p>Gender: {villager.gender}</p>
          <p>Species: {villager.species}</p>
          <p>Birthday: {birthday}</p>
          <p>Days until birthday: {villager.birthdayDaysAway}</p>
          <Link to={`/details/${fileName}`}>
            <button>Go to {name}'s personal page</button>
          </Link>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Popup;
