 import React from 'react';

class Creatures extends React.Component{
    displayItems = item => {
        const { price, 
                name: {"name-en": name},
                "museum-phrase": museumPhrase,
                "catch-phrase": catchPhrase,
                "file-name": fileName
                } = item;
        return (
            <div key={fileName}>
                <h2>{name}</h2>
                <h3>Nook's Value: {price} bells</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} />
                <p>{catchPhrase}</p>
                <p>Blathers' Take: {museumPhrase}</p>
            </div>
        )
            
    }
    render(){
        const activeItem = this.props.activeItem;
        return (
            <>
                <h1>{activeItem.toUpperCase()}</h1>
                {this.props[activeItem].map(item => this.displayItems(item))}

            </>
        )
    }
}

export default Creatures;