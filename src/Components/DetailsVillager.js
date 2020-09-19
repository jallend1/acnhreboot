import React, { useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';
import { properCase } from '../utils';

const DetailsVillager = ({ villager }) => {
  const { markComplete, allItems } = useContext(ItemContext);
  const {
    'file-name': fileName,
    'catch-phrase': catchPhrase,
    name: { 'name-USen': name }
  } = villager;
  birthdayCalculations(villager);
  return (
    <React.Fragment key={fileName}>
      <div className="card villager center yellow lighten-3" key={fileName}>
        <header>
          <h3>{villager.isBirthday ? `🎉${name}🎉` : name}</h3>
          <img src={`../images/icons/villagers/${fileName}.png`} alt={name} />
          <h4>"{properCase(catchPhrase)}"</h4>
        </header>
        <main>
          <img src={`../images/villagers/${fileName}.png`} alt={name} />
          <p>Personality: {villager.personality}</p>
          <p>Gender: {villager.gender}</p>
          <p>Species: {villager.species}</p>
          <p>Birthday: {villager['birthday-string']}</p>
          <p>Days until birthday: {villager.birthdayDaysAway}</p>
        </main>
        <div>
          <label>
            <input
              type="checkbox"
              name="markcomplete"
              value={name}
              onChange={markComplete}
              checked={
                allItems.completed.findIndex(
                  (item) => item.name['name-USen'] === name
                ) !== -1
              }
            />
            <span>Mark Complete</span>
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

function birthdayCalculations(villager) {
  villager.isBirthday = false;
  const currentTime = new Date();
  const birthDate = fixBirthday(villager);
  if (
    birthDate.getMonth() === currentTime.getMonth() &&
    birthDate.getDate() === currentTime.getDate()
  ) {
    villager.isBirthday = true;
  }
  villager.birthdayDaysAway = Math.ceil(
    (birthDate - currentTime) / (1000 * 3600 * 24)
  );
  if (villager.birthdayDaysAway < 0) {
    villager.birthdayDaysAway += 365;
  }
}

function fixBirthday(villager) {
  // Changes birthday from DD//MM into YYYY/MM/DD
  const originalBirthdayFormat = villager.birthday.split('/');
  const currentTime = new Date();
  const fixedBirthDate =
    currentTime.getFullYear() +
    ' ' +
    originalBirthdayFormat.reverse().join(' ');
  const birthDate = new Date(fixedBirthDate);
  return birthDate;
}

export default DetailsVillager;
