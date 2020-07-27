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
            <div className="song" id="artwork" key={name}>
                <h3>{properCase(name)}</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt={name} />
                <p>Has a fake version? {hasFake ? 'Yes' : 'No'}</p>
            </div>
        )
    }
    render(){
        return (
            <>
                <h2>Art</h2>
                <div id="artretail">
                    <p>Redd's Selling price on all paintings: 4980 bells</p>
                    <p>Nook's Buying price on all paintings: 1245 bells</p>
                </div>
                <div id="artdisplay">
                    {this.props[this.props.activeItem].map(art => this.displayArt(art))}
                </div>
            </>
        )
    }
}

export default Art;