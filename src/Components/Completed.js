import React from 'react';

class Completed extends React.Component{
    
    componentDidMount() {
        this.extractData(this.props.completed);
    }
    extractData = completed => {
        const values = Object.keys(completed);
        values.forEach(value => {
            if(completed[value]){
                completed[value].forEach(item => console.log(item))
            }
        });
    }
    render(){
        return 'hello';
    }
}

export default Completed;