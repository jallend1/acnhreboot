 import React from 'react';
 import { properCase } from '../utils';

class Creatures extends React.Component{
    displayItems = item => {
        const { price, 
                name: {"name-en": name},
                "museum-phrase": museumPhrase,
                "catch-phrase": catchPhrase,
                "file-name": fileName
                } = item;
        return (
            <div className="creature" key={fileName}>
                <h3>{properCase(name)}</h3>
                <h4>Nook's Price: {price || item.price} bells</h4>
                <h4 id="flick">Flick's Price: {item["price-flick"]} bells</h4>
                <h4 id="cj">CJ's Price: {item["price-cj"]} bells</h4>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                <p>{catchPhrase}</p>
                <p>Blathers' Take: {museumPhrase}</p>
            </div>
        )
            
    }
    render(){
        const activeItem = this.props.activeItem;
        return (
            <>
                <h2>{activeItem.toUpperCase()}</h2>
                {this.props[activeItem].map(item => this.displayItems(item))}
            </>
        )
    }
}

export default Creatures;