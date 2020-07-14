import React from 'react';
import { properCase } from '../utils'

class Art extends React.Component{
    displayArt = art => {
        const {
            "file-name": fileName,
            name: {"name-USen": name},
            "buy-price": buyPrice,
            "sell-price": sellPrice,
            hasFake
            } = art;
        return(
            <div className="item" id="artwork" key={name}>
                <header>
                    <h3>{properCase(name)}</h3>
                    <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt={name} />
                </header>
                <div className="details">
                    <p>Redd's Selling Price: {buyPrice}</p>
                    <p>Nook's Buying Price: {sellPrice}</p>
                    <p>Has a fake version? {hasFake ? 'Yes' : 'No'}</p>
                </div>
            </div>
        )
    }
    render(){
        return (
            <>
                <h2>Art</h2>
                <div id="artdisplay">
                    {this.props[this.props.activeItem].map(art => this.displayArt(art))}
                </div>
            </>
        )
    }
}

export default Art;