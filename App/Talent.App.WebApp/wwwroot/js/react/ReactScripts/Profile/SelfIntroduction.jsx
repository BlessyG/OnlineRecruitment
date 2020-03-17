/* Self introduction section */
import React, { Component } from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        const details = {
            summary: this.props.summary ? this.props.summary : "",
            description: this.props.description ? this.props.description : ""
            }
        this.state = {
            stateDetails: details
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this);
    };

    handleChange(event) {  
        
        let data = Object.assign({}, this.state.stateDetails);
        data[event.target.name] = event.target.value;
        this.setState({
            stateDetails: data
        })          
    }
    updateData() {
        const data = Object.assign({}, this.state.stateDetails)
        this.props.updateProfileData(data)
    }

    render() {

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>
                <div className="ten wide column">
                    <div className="field" >                        
                        <ChildSingleInput
                            inputType="text"
                            label=""
                            name="summary"
                            value={this.props.summary}
                            controlFunc={this.handleChange}
                            maxLength={150}
                            placeholder="Please provide a short summary about yourself"
                            errorMessage="Please enter a summary"
                        />
                    </div>
                    <p>Summary must be no more than 150 characters.</p>
                
                    <div className="field" >
                        <textarea maxLength={600} minLength={150} name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.props.description} onChange={this.handleChange}></textarea>
                    </div>
                    <p>Description must be between 150-600 characters.</p>
                    <button type="button" className="ui right floated teal button" onClick={this.updateData}>Save</button>
                </div>
                
            </React.Fragment>
        )
    }
}

