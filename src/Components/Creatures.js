 import React from 'react';
 import { properCase } from '../utils';

class Creatures extends React.Component{
    alternateBuyer = item => {
        if(this.props.activeItem === 'bugs'){
            return <h4 id="flick">Flick's Price: {item["price-flick"]} bells</h4>
        }else if(item["price-cj"]){
            return <h4 id="cj">CJ's Price: {item["price-cj"]} bells</h4>
        }
    }
    displayItems = item => {
        const { price, 
            name: {"name-en": name},
                "museum-phrase": museumPhrase,
                "catch-phrase": catchPhrase,
                "file-name": fileName,
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
                            <p>🦉 Blathers' Take 🦉</p>
                            <p>{museumPhrase}</p>
                        </div>
                    </div>
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