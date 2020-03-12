/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { Description } from './Description.jsx';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        
    };

    



    render() {
        return (
            <Description
                updateStateData={this.props.description}
            />
        )
    }
}



