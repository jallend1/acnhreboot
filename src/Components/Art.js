import React from 'react';
import { properCase } from '../utils'

class Art extends React.Component{
    displayArt = art => {
        const {
            "file-name": fileName,
            name: {"name-en": name},
            "buy-price": buyPrice,
            "sell-price": sellPrice,
            hasFake
        } = art;
        console.log(art);
        return(
            <div className="creature" key={name}>
                <h3>{properCase(name)}</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} />
                <div className="details">
        <p>Purchase Price: {buyPrice}</p>
        <p>Sell Price: {buyPrice}</p>
        <p>Has a fake version? {hasFake ? 'Yes' : 'No'}</p>
                </div>
            </div>
        )
    }
    render(){
        return (
            <>
                <h2>Art</h2>
                {this.props[this.props.activeItem].map(art => this.displayArt(art))}
            </>
        )
    }
}

export default Art;