import React from 'react';
import FilterVillagers from './FilterVillagers';

class Villagers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filtered: this.props.villagers,
            species: [],
            personalities: []
        }
}
    compileDropdowns = () => {                                              //Populates the select menus with species and personalities
        const villagers = this.props.villagers;
        const species = this.state.species;
        const personalities = this.state.personalities;
        villagers.forEach(villager => { 
            if(!species.includes(villager.species)){
                species.push(villager.species);
              }
              if(!personalities.includes(villager.personality)){
                personalities.push(villager.personality)
              }
            });
        this.setState({species, personalities})
    }

    componentDidMount = () => {
        this.compileDropdowns();
    }

    displaySelection = () => this.state.filtered.map(villager => this.displayVillagers(villager));

    displayVillagers = villager => {
        const {
            "file-name": fileName,
            "catch-phrase": catchPhrase,
            gender,
            personality,
            species,
            name: {"name-en": name},
            "birthday-string": birthday,
            collapsed
            } = villager;
            let isBirthday = false;
            const birthDate = this.fixBirthday(villager);
            if(birthDate.getMonth() === this.props.time.getMonth() && birthDate.getDate() === this.props.time.getDate()){
                isBirthday = true;
            }
            return(
            <div className="item" key={fileName}>
                <header className="itemhead" onClick={() => this.props.toggleCollapse(fileName)}>
                    <h3>{isBirthday ? `🎉${name}🎉` : name}</h3>
                    <img src={`./images/icons/${this.props.activeItem}/${fileName}.png`} alt={name} />
                    <h4>{catchPhrase}</h4>
                    <img src={collapsed ? './images/expand.png' : './images/collapse.png'} alt={collapsed ? 'Expand' : 'Collapse'} />
                </header>
                <div className={collapsed ? "details collapsed" : "details"}>
                    <img src={collapsed ? 'null' : `./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                    <p>Personality: {personality}</p>
                    <p>Gender: {gender}</p>
                    <p>Species: {species}</p>
                    <p>Birthday: {birthday}</p>
                </div>
            </div>
        )
    }
    
    filterSpecies = criteria => {
        let filteredResults = this.state.filtered;
        const desiredCriteria = criteria.target.value;
        const villagers = this.props.villagers;
        if(desiredCriteria === ''){
            filteredResults = villagers;
        }
        else if(criteria.target.name === 'species'){
          filteredResults = villagers.filter(villager => villager.species === desiredCriteria);
        }else if(criteria.target.name === 'personality'){
          filteredResults = villagers.filter(villager => villager.personality === desiredCriteria)
        }
        this.setState({filtered: filteredResults})
      }
    
    fixBirthday = villager => {                                         // Changes birthday from DD//MM into YYYY/MM/DD
        const originalBirthdayFormat = villager.birthday.split('/');
        const currentTime = new Date();
        const fixedBirthDate = currentTime.getFullYear() + ' ' + originalBirthdayFormat.reverse().join(' ');
        const birthDate = new Date(fixedBirthDate);
        return birthDate;
    }
    render(){
        return (
        <>
            <h2>{this.props.activeItem.toUpperCase()}</h2>
            <FilterVillagers 
                        changeSort={this.changeSort} 
                        activeItem = {this.state.activeItem} 
                        collapseAll = {this.collapseAll} 
                        expandAll = {this.expandAll} 
                        handleChange = {this.handleChange} 
                        handleReset = {this.handleReset}
                        species = {this.state.species}
                        filterSpecies = {this.filterSpecies}
                        personalities = {this.state.personalities}
            />
            {this.displaySelection()}
        </>
        )
    }
}

export default Villagers;