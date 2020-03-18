import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Dropdown } from 'semantic-ui-react';
import { nationality } from '../Employer/common.js'

export class Address extends React.Component {
    constructor(props) {
        super(props)
        
        const details = this.props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: '',
                street: '',
                postCode: null,
                suburb: '',
                city: '',
                country: ''
            }
        this.state = {
            showEditSection: false,
            newAddress: details,
            citiesOptions: []
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.handleChangeCountry = this.handleChangeCountry.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newAddress)
        var updateData = {
            address: data
        }
        this.props.saveProfileData(updateData)
        this.closeEdit();
    }
    handleChangeCountry(event, objReference) {        
        var data = Object.assign({}, this.state.newAddress);
        //required
        const name = objReference.name;
        let changedValue = objReference.value;
        var popCities = [];
        data[name] = changedValue;
        if (name == "country") {
            data["city"] = "";
        }
        if (changedValue != null) {
            popCities = _.map(Countries[changedValue], (state, index) => ({
                key: state,
                text: state,
                value: state,
            }))
            console.log(popCities);
        }
        this.setState({
            newAddress: data, citiesOptions: popCities
        })
    }
    handleChangeCity(event, objReference) {
        var data = Object.assign({}, this.state.newAddress);
        const name = objReference.name;
        let value = objReference.value;
        data[name] = value;
        this.setState({
            newAddress: data
        })
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let countriesOptions = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;
        countriesOptions = _.map(Countries, (state, index) => ({
            key: index,
            text: index,
            value: index,
        }))
        return (
            <div className='ui sixteen wide column'>
                <div className='row'>
                    <ChildSingleInput
                        inputType="text"
                        label="Number"
                        name="number"
                        value={this.state.newAddress.number}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your house number"
                        errorMessage="Please enter a valid Number"
                    />
                    <ChildSingleInput
                        inputType="text"
                        label="Street"
                        name="street"
                        value={this.state.newAddress.street}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your street name"
                        errorMessage="Please enter a valid street name"
                    />
                    <ChildSingleInput
                        inputType="text"
                        label="Suburb"
                        name="suburb"
                        value={this.state.newAddress.suburb}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter an suburb"
                        errorMessage="Please enter a valid suburb"
                    />
                </div>
                <div className='row'>
                    <div>
                        <label>Country</label><br />
                        <Dropdown
                            name="country"
                            search selection
                            options={countriesOptions}
                            onChange={this.handleChangeCountry}
                            placeholder={selectedCountry ? selectedCountry : "Select a country"}
                        />
                    </div>

                    <div>
                        <label>City</label><br />
                        <Dropdown
                            name="city"
                            search selection
                            options={this.state.citiesOptions}
                            onChange={this.handleChangeCity}
                            placeholder={selectedCity ? selectedCity : "Select a town or city"}
                        />
                    </div>
                <ChildSingleInput
                    inputType="text"
                    label="Post Code"
                    name="postCode"
                    value={this.state.newAddress.postCode}
                    controlFunc={this.handleChange}
                    maxLength={12}
                    placeholder="Enter a post code"
                    errorMessage="Please enter a valid post code"
                />
            </div>
            <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div >
        )
    }

    renderDisplay() {

        let address = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}


export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        
        const details = props.nationalityData ? Object.assign({}, props.nationalityData)
            : {
                nationality: ""
            }
        this.state = {
            newData: details
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, { value }) {
        const data = Object.assign({}, this.state.newData)
        data["nationality"] = value
        this.setState({
            newData: data
        })
        this.props.saveProfileData(data)
    }

    render() {
        
        let nationalityOptions = [];
        nationalityOptions = _.map(nationality, (state, index) => ({
            key: state,
            text: state,
            value: state,
        }))
        let nationalityData = this.state.newData.nationality;
        return (

            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                <Dropdown
                    name="nationality"
                    search selection
                    options={nationalityOptions}
                    onChange={this.handleChange}
                            placeholder={nationalityData ? nationalityData : "Select your Nationality"}
                        />
                    </React.Fragment>
                </div>
                </div>
        )
    }    
}
