 import React from 'react';
 import { properCase } from '../utils';

class Creatures extends React.Component{
    alternateBuyer = item => {                                                      // Shows Flick prices for bugs, CJ for fish
        if(this.props.activeItem === 'bugs'){
            return <h4 id="flick">Flick's Price: {item["price-flick"]} bells</h4>
        }else if(item["price-cj"]){
            return <h4 id="cj">CJ's Price: {item["price-cj"]} bells</h4>
        }
    }
    calculateAvailability = availability => {
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
    annualAvailability = availability => {
        return (
            <>
                <p>Northern Hemisphere: {availability["month-northern"]}</p>
                <p>Southern Hemisphere: {availability["month-southern"]}</p>
            </>
        )
    }  
    displaySelection = () => {
        if(this.props.searchValue){                                                 // If there's a search term, return the filtered array
            return this.props.filtered.map(item => this.displayItems(item))
        }
        else{                                                                       // If not, go with the original state
            return this.props.creatures.map(item => this.displayItems(item))
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
                        {this.props.activeItem === 'fossils' ? null : this.calculateAvailability(availability)}
                    </div>
                </div>
        )        
    }
    render(){
        const activeItem = this.props.activeItem;
        return (
            <>
                <h2>{activeItem.toUpperCase()}</h2>
                {this.displaySelection()}
            </>
        )
    }
}

export default Creatures;