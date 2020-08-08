 import React from 'react';
 import Filter from './Filter';
 import { properCase } from '../utils';

class Creatures extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filtered: this.props.creatures,
            searchValue: ''
        }
    }
    alternateBuyer = item => {                                                      // In item details, shows Flick prices for bugs, CJ for fish
        if(this.props.activeItem === 'bugs'){
            return <h4 id="flick">Flick's Price: {item["price-flick"]} bells</h4>
        }else if(item["price-cj"]){
            return <h4 id="cj">CJ's Price: {item["price-cj"]} bells</h4>
        }
    }
    annualAvailability = availability => {
        return (
            <>
                <p>Northern Hemisphere: {availability["month-northern"]}</p>
                <p>Southern Hemisphere: {availability["month-southern"]}</p>
            </>
        )
    }  
    
    calculateAvailability = availability => {
        const northernMonths = availability["month-array-northern"]
        const currentMonth = this.props.time.getMonth() + 1;            // API keeps months according to calendar, JS starts at 0;
        return northernMonths.includes(currentMonth);                   // If current month is incluced in array of availibility, true
    }

    componentDidMount(){
        this.props.changeActiveItem(this.props.activeItem);
    }
    
    displayAvailability = availability => {
        return (
        <div>
            <h4>Availability</h4>
            <div>Time: {availability.isAllDay ? 'Available all day' : availability.time}</div>
            <div>Months: {availability.isAllYear ? 'Available year-round' : this.annualAvailability(availability)}</div>
            <p>Location: {availability.location}</p>
            <p>Rarity: {availability.rarity}</p>
        </div>
        )
    }

    displayPrice = item => {
        if(this.props.sortBy === 'cj'){
            return <h4>{item["price-cj"]} bells</h4> 
        }
        else if(this.props.sortBy === 'flick'){
            return <h4>{item["price-flick"]} bells</h4>
        }
        else{
            return <h4>{item.price} bells</h4> 
        }
    }
    
    displaySelection = () => {
        if(this.state.searchValue || this.state.availableToday){                                                 // If there's a search term, return the filtered array
            return this.state.filtered.map(item => this.displayItems(item))
        }
        else{                                                                       // If not, go with the original state
            return this.props.creatures.map(item => this.displayItems(item))
        }
    }

    displayItems = item => {  
        let availableToday;
        const { name: {"name-USen": name},
            "museum-phrase": museumPhrase,
            "catch-phrase": catchPhrase,
            "file-name": fileName,
            availability,
            collapsed
        } = item;
        if(this.props.activeItem === 'fossils'){
            availableToday = true;
        }
        else{
            availableToday = this.calculateAvailability(availability);
        }
        item.availableToday = availableToday;
        return (
            <div className="item" key={fileName}>
                <header className="itemhead" >
                    <input 
                        type="checkbox" 
                        name="markcomplete" 
                        value={name} 
                        onChange={this.props.markComplete} 
                        checked={this.props.completed[this.props.activeItem].includes(name)}                    // If item included in Completed, renders the box to the page already checked
                    />
                    <h3>{properCase(name)}</h3>
                    {this.displayPrice(item)}
                    <img src={
                        this.props.activeItem === 'fossils' ? `./images/icons/fossil.png` 
                        : `./images/icons/${this.props.activeItem}/${fileName}.png`} alt="{name}"
                        />
                    <img 
                        src={collapsed ? './images/expand.png' : './images/collapse.png'} 
                        alt={collapsed ? 'Expand' : 'Collapse'} 
                        id="expandtoggle" 
                        onClick={() => this.props.toggleCollapse(fileName, this.props.activeItem)}
                        />
                    <img 
                        src={availableToday ? './images/available.png' : './images/unavailable.png'} 
                        alt={availableToday ? 'Available' : 'Unavailable'} />
                </header>
                <div className={collapsed ? "collapsed details" : "details"}>
                    <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt={name} />
                    {this.alternateBuyer(item)}
                    <p>{catchPhrase}</p>
                    <div>        
                        <p>
                            <span role="img" aria-label="owl emoji">🦉</span> Blathers' Take <span role="img" aria-label="owl emoji">🦉</span>
                        </p>
                        <p>{museumPhrase}</p>
                    </div>
                    {this.props.activeItem === 'fossils' ? null : this.displayAvailability(availability)}
                </div>
            </div>
        )        
    }
    handleChange = e => {
        if(e.currentTarget.value){
            const searchTerm = e.currentTarget.value.toLowerCase();
            this.setState({searchValue: searchTerm});
            const currentData = this.props[this.props.activeItem];
            const filteredData = currentData.filter(item => item.name["name-USen"].toLowerCase().includes(searchTerm));
            this.setState({filtered: filteredData});
        }
        else{
            this.setState({
            searchValue: '',
            filtered: this.props[this.props.activeItem]});
        }
    }
    showAvailable = e => {
        if(e.target.checked){
            const currentState = this.props[this.props.activeItem];
            const filtered = currentState.filter(item => item.availableToday);
            this.setState({filtered, availableToday: true});
        }
        else{
            this.setState({filtered: this.props[this.props.activeItem], availableToday: false});
        }
    }

    render(){
        const activeItem = this.props.activeItem;
        return (
            <>
                <Filter 
                    activeItem = {this.props.activeItem}
                    collapseAll = {this.props.collapseAll} 
                    expandAll = {this.props.expandAll} 
                    handleChange = {this.handleChange} 
                    handleReset = {this.props.handleReset}
                    changeSort = {this.props.changeSort}
                    showAvailable = {this.showAvailable}
                />                
                    <h2>{activeItem.toUpperCase()}</h2>
                    {this.displaySelection()}
            </>
        )
    }
}

export default Creatures;