/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const linkedAccounts = props.linkedAccounts ? Object.assign({}, props.linkedAccounts) : {
            linkedIn: "",
            github: ""
        }
        this.state = {
            showEditSection: false,
            newLinkedAccounts: linkedAccounts
        }
        this.openEdit = this.openEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }
    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newLinkedAccounts: linkedAccounts
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.linkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newLinkedAccounts: data
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newLinkedAccounts)
        console.log("Social Media data to save "+data)
        this.props.saveProfileData(data)
        this.closeEdit();
    }

    closeEdit() {
        this.setState({
            showEditSection:false
        })
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
               
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newLinkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid linkedIn url"
                />

                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newLinkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid github url"
                />

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let linkedIn = this.props.linkedAccounts ? `${this.props.linkedAccounts.linkedIn}` : ""
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>linkedIn: {linkedIn} github: {github}</p>
                        <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                    </React.Fragment>
                    
                </div>
            </div>
        )
    }

}