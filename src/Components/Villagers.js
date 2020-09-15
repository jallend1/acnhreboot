import React from 'react';
import FilterVillagers from './FilterVillagers';
import { properCase } from '../utils';
import Popup from './Popup';
import { ItemContext } from '../contexts/ItemContext';

class Villagers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      species: [],
      personalities: [],
      searchSpecies: [],
      searchPersonality: [],
      searchBirthday: [],
      birthdayBoys: [],
      activeCard: ''
    };
  }
  static contextType = ItemContext;

  componentDidMount = () => {
    this.context.changeActiveItem('villagers');
    this.setState({ filtered: this.context.activeItems });
    this.birthdayCheck();
    this.compileDropdowns();
  };

  // componentDidUpdate = (prevProps) => {
  //   if (this.props.searchValue !== prevProps.searchValue) {
  //     this.filterVillagers();
  //   }
  //   if (this.props.activeItems !== prevProps.activeItems) {
  //     this.birthdayCheck();
  //     this.compileDropdowns();
  //   }
  // };

  activateCard = (cardID) => {
    this.setState({ activeCard: cardID });
  };
  birthdayCheck = () => {
    const birthdayBoys = [];
    this.context.allItems.villagers.forEach((villager) => {
      if (villager.isBirthday) {
        // If that matches local time, push them into birthday array
        birthdayBoys.push([
          villager.personality,
          villager.name['name-USen'],
          villager['catch-phrase'],
          villager['file-name'],
          villager['birthday-string']
        ]);
      }
    });
    this.setState({ birthdayBoys });
  };
  celebrateBirthday = () => {
    const birthdayBoys = this.state.birthdayBoys;
    if (birthdayBoys.length === 0) {
      return <p>No villagers are celebrating their birthday today</p>;
    } else
      return birthdayBoys.map((birthdayBoy) => {
        return (
          <div key={birthdayBoy[1]} className="birthdayboy">
            <img
              src={`./images/villagers/${birthdayBoy[3]}.png`}
              alt={birthdayBoy[1]}
            />
            <p>
              Happy birthday to the always {birthdayBoy[0]} {birthdayBoy[1]}!{' '}
              {properCase(birthdayBoy[2])}!{' '}
            </p>
          </div>
        );
      });
  };
  checkboxChange = (e) => {
    // Adds or removes advanced search options from search criteria
    if (e.target.name === 'species') {
      const params = this.state.searchSpecies;
      const type = e.target.value;
      if (e.target.checked === true) {
        params.push(type);
      } else if (e.target.checked === false) {
        const index = params.indexOf(type);
        params.splice(index, 1);
      }
      this.setState({ searchSpecies: params }, this.filterVillagers);
    } else if (e.target.name === 'personality') {
      const params = this.state.searchPersonality;
      const type = e.target.value;
      if (e.target.checked === true) {
        params.push(type);
      } else if (e.target.checked === false) {
        const index = params.indexOf(type);
        params.splice(index, 1);
      }
      this.setState({ searchPersonality: params }, this.filterVillagers);
    } else if (e.target.name === 'birthday') {
      const params = this.state.searchBirthday;
      const month = e.target.value;
      if (e.target.checked === true) {
        params.push(month);
      } else if (e.target.checked === false) {
        const index = params.indexOf(month);
        params.splice(index, 1);
      }
      this.setState({ searchBirthday: params }, this.filterVillagers);
    }
  };

  compileDropdowns = () => {
    //Populates the select menus with species and personalities
    const villagers = this.context.allItems.villagers;
    const species = this.state.species;
    const personalities = this.state.personalities;
    villagers.forEach((villager) => {
      if (!species.includes(villager.species)) {
        species.push(villager.species);
      }
      if (!personalities.includes(villager.personality)) {
        personalities.push(villager.personality);
      }
    });
    this.setState({ species, personalities });
  };

  displaySelection = () => {
    if (
      this.context.searchValue ||
      this.state.searchSpecies.length > 0 ||
      this.state.searchPersonality.length > 0 ||
      this.state.searchBirthday.length > 0
    ) {
      // If there's a search term, return the filtered array
      return this.state.filtered.map((villager) =>
        this.displayVillagers(villager)
      );
    } else {
      // If not, go with the original state
      return this.context.activeItems.map((villager) =>
        this.displayVillagers(villager)
      );
    }
  };

  displayVillagers = (villager) => {
    const {
      'file-name': fileName,
      'catch-phrase': catchPhrase,
      name: { 'name-USen': name }
    } = villager;
    villager.isBirthday = false;
    const currentTime = new Date();
    const birthDate = this.fixBirthday(villager);
    if (
      birthDate.getMonth() === currentTime.getMonth() &&
      birthDate.getDate() === currentTime.getDate()
    ) {
      villager.isBirthday = true;
    }
    villager.birthdayDaysAway = Math.ceil(
      (birthDate - currentTime.time) / (1000 * 3600 * 24)
    );
    if (villager.birthdayDaysAway < 0) {
      villager.birthdayDaysAway += 365;
    }
    return (
      <React.Fragment key={fileName}>
        <div className="card villager center" key={fileName}>
          <header>
            <h3>{villager.isBirthday ? `🎉${name}🎉` : name}</h3>
            <img
              src={`./images/icons/${this.context.activeItem}/${fileName}.png`}
              alt={name}
            />
            <h4>"{properCase(catchPhrase)}"</h4>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="markcomplete"
                  value={name}
                  onChange={this.context.markComplete}
                  checked={
                    this.context.allItems.completed.findIndex(
                      (item) => item.name['name-USen'] === name
                    ) !== -1
                  }
                />
                <span>Mark Complete</span>
              </label>
            </div>
            <i
              className="material-icons pointer"
              onClick={() => this.activateCard(fileName)}
            >
              more_horiz
            </i>
          </header>
        </div>
      </React.Fragment>
    );
  };

  closeDetails = () => {
    this.setState({ activeCard: '' });
  };

  filterVillagers = () => {
    let newResults = this.context.activeItems;
    const searchValue = this.context.searchValue;
    let searchSpecies = this.state.searchSpecies;
    let searchPersonality = this.state.searchPersonality;
    let searchBirthday = this.state.searchBirthday;
    if (searchValue) {
      newResults = newResults.filter((villager) =>
        villager.name['name-USen'].toLowerCase().includes(searchValue)
      );
    }
    if (searchSpecies.length > 0) {
      newResults = newResults.filter((villager) =>
        searchSpecies.includes(villager.species)
      );
    }
    if (searchPersonality.length > 0) {
      newResults = newResults.filter((villager) =>
        searchPersonality.includes(villager.personality)
      );
    }
    if (searchBirthday.length > 0) {
      newResults = newResults.filter((villager) => {
        const birthday = villager['birthday-string'].split(' ');
        return searchBirthday.includes(birthday[0]);
      });
    }
    if (
      searchValue === '' &&
      searchSpecies.length === 0 &&
      searchPersonality.length === 0 &&
      searchBirthday.length === 0
    ) {
      newResults = this.context.activeItems;
    }
    this.setState({ filtered: newResults });
  };

  fixBirthday = (villager) => {
    // Changes birthday from DD//MM into YYYY/MM/DD
    const originalBirthdayFormat = villager.birthday.split('/');
    const currentTime = new Date();
    const fixedBirthDate =
      currentTime.getFullYear() +
      ' ' +
      originalBirthdayFormat.reverse().join(' ');
    const birthDate = new Date(fixedBirthDate);
    return birthDate;
  };

  render() {
    return (
      <>
        <h2>{this.context.activeItem.toUpperCase()}</h2>
        <div id="birthdays">
          {this.context.activeItems.length > 0 ? (
            this.celebrateBirthday()
          ) : (
            <h5>Running through the calendar looking for birthdays</h5>
          )}
        </div>
        <FilterVillagers
          filterVillagers={this.filterVillagers}
          species={this.state.species}
          personalities={this.state.personalities}
          checkboxChange={this.checkboxChange}
        />
        <div id="villagers">
          {this.context.activeItems.length > 0 ? (
            this.displaySelection()
          ) : (
            <h3>Gathering all the villagers...</h3>
          )}
        </div>
        {this.state.activeCard ? (
          <Popup
            villagers={this.context.activeItems}
            activeCard={this.state.activeCard}
            closeDetails={this.closeDetails}
          />
        ) : null}
      </>
    );
  }
}

export default Villagers;
