import React from 'react';

class Filter extends React.Component{
    render(){
        return (
            <>
                <input type="text" placeholder="Search for item..."></input>
                <form onChange={this.props.changeSort} >
                    <input type="radio" id="alpha" name="sortby" value="alpha" defaultChecked />
                    <label htmlFor="alpha">Alphabetical</label>
                    <input type="radio" id="nook" name="sortby" value="nook" />
                    <label htmlFor="nook">Nook Price </label>
                </form>
            </>
        )
    }
}

export default Filter;