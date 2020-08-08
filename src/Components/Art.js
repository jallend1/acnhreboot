import React from 'react';
import { properCase } from '../utils'

class Art extends React.Component{
    componentDidMount(){
        this.props.changeActiveItem(this.props.activeItem);
    }
    displayArt = art => {
        const {
            "file-name": fileName,
            name: {"name-USen": name},
            hasFake
            } = art;
        return(
            <div className="song" id="artwork" key={name}>
                <h3>{properCase(name)}</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt={name} />
                <div>
                    <input 
                        name="markcomplete"
                        type="checkbox"
                        value={name}
                        onChange={this.props.markComplete}
                        checked={this.props.completed[this.props.activeItem].includes(name)}
                    />
                    <label htmlFor="markcomplete">Mark complete?</label>
                </div>
                <p>Has a fake version? {hasFake ? 'Yes' : 'No'}</p>
            </div>
        )
    }
    render(){
        console.log(this.props.activeItem);
        console.log(this.props.allItems);
        return (
            <>
                <h2>Art</h2>
                <div id="artretail">
                    <p>Redd sells all art for 4980 bells</p>
                    <p>Nook buys all art for 1245 bells</p>
                </div>
                <div id="artdisplay">
                    {this.props.allItems[this.props.activeItem].map(art => this.displayArt(art))}
                </div>
            </>
        )
    }
}

export default Art;