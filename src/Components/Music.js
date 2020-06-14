import React from 'react';
import Player from './Player';

class Music extends React.Component{
    state = {
        activeSong: ''
    };

    displaySongs = song => {
        const {
            "file-name": fileName,
            "buy-price": buyPrice,
            "sell-price": sellPrice,
            name:{"name-en": name}
            } = song;
        return (
            <div className="item song" key={fileName}>
                <h3>{name}</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} data-song={fileName} alt={name} onClick={this.playSong}/>
                <p>Purchase Price: {buyPrice ? `${buyPrice} bells` : 'Not available for purchase.'}</p>
                <p>Sell Value: {sellPrice} bells</p>
            </div>
        )
    }
    
    playSong = e => {
        const activeSong = e.target.dataset.song;
        this.setState({activeSong})
    }

    render(){
        return ( 
            <>
                <h2>{this.props.activeItem.toUpperCase()}</h2>
                <Player activeSong={this.state.activeSong} />
                <div id="songdisplay">
                    {this.props.music.map(song => this.displaySongs(song))}
                </div>
            </>
        )
    }
}

export default Music;