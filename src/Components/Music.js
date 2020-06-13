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
            <div className="item song" key={fileName}>
                <h3>{name}</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} data-song={fileName} alt={name} onClick={this.props.playSong}/>
                <audio id={fileName}>
                    <source src={`./kk/${fileName}.mp3`} type="audio/mpeg" />
                </audio>
                <p>Purchase Price: {buyPrice ? `${buyPrice} bells` : 'Not available for purchase.'}</p>
                <p>Sell Value: {sellPrice} bells</p>
            </div>
        )
    }
    render(){
        return ( 
            <>
                <h2>{this.props.activeItem.toUpperCase()}</h2>
                <div id="songdisplay">
                    {this.props.music.map(song => this.displaySongs(song))}
                </div>
            </>
        )
    }
}

export default Music;