import React from 'react';

class Filter extends React.Component{
    render(){
        return (
            <>
                <input type="text" placeholder="Search for item..."></input>
                <div id="filters">
                    <form onChange={this.props.changeSort} >
                        <input type="radio" id="alpha" name="sortby" value="alpha" defaultChecked />
                        <label htmlFor="alpha">Alphabetical</label>
                        <input type="radio" id="nook" name="sortby" value="nook" />
                        <label htmlFor="nook">Nook Price </label>
                    </form>
                    <form onChange={this.props.changeSort}>
                        <input type="radio" id="ascending" name="order" value="ascending" defaultChecked />
                        <label htmlFor="ascending">Ascending</label>
                        <input type="radio" id="descending" name="order" value="descending" />
                        <label htmlFor="descending">Descending</label>
                    </form>
                    <div>
                        <button onClick={this.props.collapseAll}>Collapse All</button>
                        <button onClick={this.props.expandAll}>Expand All</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Filter;