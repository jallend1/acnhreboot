import React from 'react';

class Music extends React.Component{
    displaySongs = song => {
        const {
            "file-name": fileName,
            "buy-price": buyPrice,
            "sell-price": sellPrice,
            name:{"name-en": name}
            } = song;
        return (
            <div className="song" key={fileName}>
                <h3>{name}</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                <p>Purchase Price: {buyPrice ? `${buyPrice} bells` : 'Not available for purchase.'}</p>
                <p>Sale Price: {sellPrice} bells</p>
            </div>
        )
    }
    render(){
        return ( 
            <>
                <h2>{this.props.activeItem.toUpperCase()}</h2>
                {this.props.music.map(song => this.displaySongs(song))}
            </>
        )
    }
}

export default Music;