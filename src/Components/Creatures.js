 import React from 'react';
 import Filter from './Filter';
 import { properCase } from '../utils';

class Creatures extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filtered: this.props[this.props.activeItem],
            searchValue: ''
        }
    }
    alternateBuyer = item => {                                                      // Shows Flick prices for bugs, CJ for fish
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
        const northernMonths = availability["month-northern"]
        const currentMonth = this.props.time.getMonth();
        if(availability.isAllYear){                                                     // All year? Available
            return true;
        }
        if(northernMonths === currentMonth){                                            // If available one month, and that month is now? Available
            return true;
        }
        if(northernMonths.includes('&')){                                               // If available to ranges of months, compares current month to first range, and then second
            const twoRanges = northernMonths.split('&');
            const rangeOne = twoRanges[0].split('-');
            const rangeTwo = twoRanges[1].split('-');
            if(currentMonth >= rangeOne[0] && currentMonth <= rangeOne[1]){
                return true;
            }
            else if(currentMonth >= rangeTwo[0] && currentMonth <= rangeTwo[1]){
                return true;
            }else{
                return false;
            }
        }
        const monthsArray = northernMonths.split('-');
        if(currentMonth >= monthsArray[0] && currentMonth <= monthsArray[1]){
            return true;
        }            
        return false;
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
    displaySelection = () => {
        if(this.state.searchValue){                                                 // If there's a search term, return the filtered array
            return this.state.filtered.map(item => this.displayItems(item))
        }
        else{                                                                       // If not, go with the original state
            return this.props[this.props.activeItem].map(item => this.displayItems(item))
        }
    }

    displayItems = item => {  
        const { price, 
            name: {"name-en": name},
            "museum-phrase": museumPhrase,
            "catch-phrase": catchPhrase,
            "file-name": fileName,
            availability,
            collapsed
        } = item;
        const availableToday = this.calculateAvailability(availability);
            return (
                <div className="item" key={fileName}>
                    <header className="itemhead" onClick={() => this.props.toggleCollapse(fileName)}>
                        <h3>{properCase(name)}</h3>
                        <h4>{price || item.price} bells</h4> 
                        <img src={
                            this.props.activeItem === 'fossils' ? `./images/icons/fossil.png` 
                            : `./images/icons/${this.props.activeItem}/${fileName}.png`} alt="{name}"
                        />
                        <img src={collapsed ? './images/expand.png' : './images/collapse.png'} alt={collapsed ? 'Expand' : 'Collapse'} id="expandtoggle"/>
                        <img src={availableToday? './images/available.png' : './images/unavailable.png'} alt={availableToday ? 'Available' : 'Unavailable'}/>
                    </header>
                    <div className={collapsed ? "collapsed details" : "details"}>
                        <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
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
          const filteredData = currentData.filter(item => item.name["name-en"].toLowerCase().includes(searchTerm));
          this.setState({filtered: filteredData});
        }
        else{
          this.setState({
            searchValue: '',
            filtered: this.props[this.props.activeItem]
          });
        }
      }
    render(){
        const activeItem = this.props.activeItem;
        return (
            <>
            <Filter 
                collapseAll = {this.props.collapseAll} 
                expandAll = {this.props.expandAll} 
                handleChange = {this.handleChange} 
                handleReset = {this.props.handleReset}
                changeSort = {this.props.changeSort}
            />                
                <h2>{activeItem.toUpperCase()}</h2>
                {this.displaySelection()}
            </>
        )
    }
}

export default Creatures;