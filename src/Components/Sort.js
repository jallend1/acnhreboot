import React from 'react';

class Sort extends React.Component{
    render(){
        return (
            <div>
                <form onChange={this.props.changeSort} >
                    <input type="radio" id="alpha" name="sortby" value="alpha" defaultChecked />
                    <label htmlFor="alpha">Alphabetical</label>
                    <input type="radio" id="nook" name="sortby" value="nook" />
                    <label htmlFor="nook">Nook Price </label>
                </form>
            </div>
        )
    }
}

export default Sort;