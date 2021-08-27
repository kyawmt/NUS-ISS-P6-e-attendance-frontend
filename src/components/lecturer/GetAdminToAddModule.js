import React, { Component } from 'react';

class GetAdminToAddModule extends Component {

    constructor(props){
        super(props);
    
    this.backhome = this.backhome.bind(this);
    }

    backhome(event){
        this.props.history.push(`/lecturer/home`)
    }


    render() {
        return (
            <div>

                <p>Error. No module found. Please contact admin for more info.</p>

                <div>
                <button
                className="btn btn-primary" onClick= {this.backhome}> Back </button>
                </div>
            </div>
        );
    }
}

export default GetAdminToAddModule;