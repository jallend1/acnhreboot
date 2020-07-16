import React from 'react';
import Player from './Player';
import { useParams } from 'react-router-dom'

class Music extends React.Component{
    state = {
        activeSong: ''
    };

    displaySelection = () => {
        if(this.props.searchValue){                                                 // If there's a search term, return the filtered array
            return this.props.filtered.map(item => this.displaySongs(item))
        }
        else{                                                                       // If not, go with the original state
            return this.props.music.map(item => this.displaySongs(item))
        }
    }

    displaySongs = song => {
        const {
            "file-name": fileName,
            "buy-price": buyPrice,
            "sell-price": sellPrice,
            name:{"name-USen": name}
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
                <div id="songplayer">
                    <Player activeSong={this.state.activeSong} />
                </div>
                <div id="songdisplay">
                    {this.displaySelection()}
                </div>
            </>
        )
    }
}

export default Music;