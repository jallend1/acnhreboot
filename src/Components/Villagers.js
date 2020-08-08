// TODO: When starting directly at /villagers, Villagers with birthdays do not display

import React from 'react';
import Filter from './Filter';
import FilterVillagers from './FilterVillagers';
import { properCase } from '../utils';

class Villagers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filtered: this.props.allItems.villagers,
            species: [],
            personalities: [],
            searchTerm: '',
            searchSpecies: [],
            searchPersonality: [],
            searchBirthday: [],
            birthdayBoys: []
            }
    }

    birthdayCheck = () => {
        const birthdayBoys = [];
        this.props.allItems.villagers.forEach(villager => {
            const birthDate = this.fixBirthday(villager);                                                                   // Changes each birthdate in API from DD/MM to MM/DD
            if(birthDate.getMonth() === this.props.time.getMonth() && birthDate.getDate() === this.props.time.getDate()){   // If that matches local time, push them into birthday array
                birthdayBoys.push(
                    [
                        villager.personality, 
                        villager.name["name-USen"], 
                        villager["catch-phrase"],
                        villager["file-name"], 
                        villager["birthday-string"]
                    ]);
            }
        })
        this.setState({birthdayBoys});
    }
    celebrateBirthday = () => {
        const birthdayBoys = this.state.birthdayBoys;
        if (birthdayBoys.length === 0){
            return <p>No villagers are celebrating their birthday today</p>
        }
        else return birthdayBoys.map(birthdayBoy => {
            return (
                <div key={birthdayBoy[1]} className="birthdayboy">
                    <img src={`./images/villagers/${birthdayBoy[3]}.png`} alt={birthdayBoy[1]} />
                    <p>Happy birthday to the always {birthdayBoy[0]} {birthdayBoy[1]}! {properCase(birthdayBoy[2])}!  </p>
                </div>
            )
        });
    }
    checkboxChange = e => {                                                 // Adds or removes advanced search options from search criteria
        if(e.target.name === 'species'){
            const params = this.state.searchSpecies;
            const type = e.target.value;
            if(e.target.checked === true){
                params.push(type);
            }
            else if(e.target.checked === false){
                const index = params.indexOf(type);
                params.splice(index, 1);
            }
            this.setState({searchSpecies: params }, this.filterVillagers);    
        }
        else if(e.target.name === 'personality'){
            const params = this.state.searchPersonality;
            const type = e.target.value;
            if(e.target.checked === true){
                params.push(type);
            }
            else if(e.target.checked === false){
                const index = params.indexOf(type);
                params.splice(index, 1);
            }
            this.setState({searchPersonality: params }, this.filterVillagers);
        }
        else if(e.target.name === 'birthday'){
            const params = this.state.searchBirthday;
            const month = e.target.value;
            if(e.target.checked === true){
                params.push(month);
            }
            else if(e.target.checked === false){
                const index = params.indexOf(month);
                params.splice(index, 1);
            }
            this.setState({searchBirthday: params}, this.filterVillagers)
        }
    }

    compileDropdowns = () => {                                              //Populates the select menus with species and personalities
        const villagers = this.props.allItems.villagers;
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
        const currentTime = new Date();
        this.props.changeActiveItem('villagers');
        this.setState({time: currentTime});
        this.compileDropdowns();
        this.birthdayCheck();
    }

    displaySelection = () => {
        if(this.state.searchTerm || this.state.searchSpecies.length > 0 || this.state.searchPersonality.length > 0 || this.state.searchBirthday.length > 0){            // If there's a search term, return the filtered array
            return this.state.filtered.map(villager => this.displayVillagers(villager))
        }
        else{                                                                                                                   // If not, go with the original state
            return this.props.allItems.villagers.map(villager => this.displayVillagers(villager))
        }
    }

    displayVillagers = villager => {
        const {
            "file-name": fileName,
            "catch-phrase": catchPhrase,
            gender,
            personality,
            species,
            name: {"name-USen": name},
            "birthday-string": birthday,
            collapsed
            } = villager;
            let isBirthday = false;
            const birthDate = this.fixBirthday(villager);
            if(birthDate.getMonth() === this.props.time.getMonth() && birthDate.getDate() === this.props.time.getDate()){
                isBirthday = true;
            }
            villager.birthdayDaysAway = Math.ceil((birthDate - this.props.time) / (1000 * 3600 * 24));
            if(villager.birthdayDaysAway < 0){
                villager.birthdayDaysAway += 365;
            }
            return(
            <div className="item" key={fileName}>
                <header className="itemhead">
                    <h3>{isBirthday ? `🎉${name}🎉` : name}</h3>
                    <img src={`./images/icons/${this.props.activeItem}/${fileName}.png`} alt={name} />
                    <h4>{catchPhrase}</h4>
                    <img 
                        src={collapsed ? './images/expand.png' : './images/collapse.png'} 
                        alt={collapsed ? 'Expand' : 'Collapse'} 
                        onClick={() => this.props.toggleCollapse(fileName, this.props.activeItem)}
                        />
                    <input 
                        type="checkbox" 
                        name="markcomplete" 
                        value={name} 
                        onChange={this.props.markComplete} 
                        checked={this.props.completed.villagers.includes(name)} 
                    />
                </header>
                <div className={collapsed ? "details collapsed" : "details"}>
                    <img src={collapsed ? 'null' : `./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                    <p>Personality: {personality}</p>
                    <p>Gender: {gender}</p>
                    <p>Species: {species}</p>
                    <p>Birthday: {birthday}</p>
                    <p>Days until birthday: {villager.birthdayDaysAway}</p>
                </div>
            </div>
        )
    }
    
    filterVillagers = criteria => {
        let newResults = this.props.allItems.villagers;
        const searchTerm = this.state.searchTerm;
        let searchSpecies = this.state.searchSpecies;
        let searchPersonality = this.state.searchPersonality;
        let searchBirthday = this.state.searchBirthday;
        if(searchTerm){
            newResults = newResults.filter(villager => villager.name["name-USen"].toLowerCase().includes(searchTerm));
        }
        if(searchSpecies.length > 0){
            newResults = newResults.filter(villager => searchSpecies.includes(villager.species));
        }
        if(searchPersonality.length > 0){
            newResults = newResults.filter(villager => searchPersonality.includes(villager.personality));
        }
        if(searchBirthday.length > 0){
            newResults = newResults.filter(villager => {
                const birthday = villager["birthday-string"].split(' ');
                return searchBirthday.includes(birthday[0]);
            });
        }
        if(!searchTerm && searchSpecies.length === 0 && searchPersonality.length === 0 && searchBirthday.length === 0){
            newResults = this.props.allItems.villagers;
        }
        this.setState({filtered: newResults});

    }
    
    fixBirthday = villager => {                                         // Changes birthday from DD//MM into YYYY/MM/DD
        const originalBirthdayFormat = villager.birthday.split('/');
        const currentTime = this.props.time;
        const fixedBirthDate = currentTime.getFullYear() + ' ' + originalBirthdayFormat.reverse().join(' ');
        const birthDate = new Date(fixedBirthDate);
        return birthDate;
    }

    handleChange = e => {
        if(e.currentTarget.value){
            let searchTerm = this.state.searchTerm;
            const newSearchParams = e.currentTarget.value.toLowerCase();
            searchTerm = newSearchParams
            this.setState({searchTerm}, this.filterVillagers());
        }
        else{
            this.setState({
                filtered: this.props.allItems.villagers
            });
        }
    }
    render(){
        return (
        <>
            <h2>{this.props.activeItem.toUpperCase()}</h2>
            <div id="birthdays">
                {this.celebrateBirthday()}
            </div>
            <Filter 
                activeItem = 'villagers'
                handleChange = {this.handleChange}
                handleReset = {this.props.handleReset}
                collapseAll = {this.props.collapseAll}
                expandAll = {this.props.expandAll}
                changeSort = {this.props.changeSort}
            />
            <FilterVillagers 
                filterVillagers = {this.filterVillagers}
                searchCriteria = {this.state.searchCriteria}
                species = {this.state.species}
                personalities = {this.state.personalities}
                checkboxChange = {this.checkboxChange}
            />
            {this.displaySelection()}
        </>
        )
    }
}

export default Villagers;