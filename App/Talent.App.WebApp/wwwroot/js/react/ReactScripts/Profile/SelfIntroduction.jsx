/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this);
    };

    handleChange(event) {
        event.preventDefault();
        const details = {
            summary: this.props.summary,
            description: this.props.description
        }
        let data = Object.assign({}, details);
        var eventName = event.target.name;
        var eventValue = event.target.value;
        data[eventName] = eventValue;          
        this.props.updateWithoutSave(data);
    }
    updateData(event) {
        event.preventDefault();
        const data = {
            summary: this.props.summary,
            description: this.props.description
        }
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
                        <input type="text" name="summary" placeholder="Please provide a short summary about yourself"
                            maxLength={150} onChange={this.handleChange} id="summary" defaultValue={this.props.summary} />
                    </div>
                    <p>Summary must be no more than 150 characters.</p>
                
                    <div className="field" >
                        <textarea maxLength={600} minLength={1} name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.props.description} onChange={this.handleChange}></textarea>
                    </div>
                    <p>Description must be between 150-600 characters.</p>
                    <button type="button" className="ui right floated teal button" onClick={this.updateData}>Save</button>
                </div>
                
            </React.Fragment>
        )
    }
}


