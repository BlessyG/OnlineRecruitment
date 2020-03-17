import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Dropdown } from 'semantic-ui-react'

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const details = props.addressData ?
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
        debugger
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
            //popCities = countries[value].map(x => <option key={x} value={x}> {x}</option>);
            //popCities = Countries[value].map(x => {
            //    key = x.value;
            //    value = x.value;
            //})
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

        //countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        //countriesOptions = Object.keys(Countries).map((x) => { key: Countries[x]; value: Countries[x] });

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
                            defaultValue={selectedCountry ? selectedCountry : "Select a country"}
                        />
                    </div>

                    <div>
                        <label>City</label><br />
                        <Dropdown
                            name="city"
                            search selection
                            options={this.state.citiesOptions}
                            onChange={this.handleChangeCity}
                            defaultValue={selectedCity ? selectedCity : "Select a town or city"}
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

        const details = props.details ?
            Object.assign({}, props.details)
            : {
                name: "",
                email: "",
                phone: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let location = { city: '', country: '' }
        if (this.state.newContact && this.state.newContact.location) {
            location = this.state.newContact.location
        }

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Name"
                    name="name"
                    value={this.state.newContact.name}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your last name"
                    errorMessage="Please enter a valid name"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Email address"
                    name="email"
                    value={this.state.newContact.email}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter an email"
                    errorMessage="Please enter a valid email"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Phone number"
                    name="phone"
                    value={this.state.newContact.phone}
                    controlFunc={this.handleChange}
                    maxLength={12}
                    placeholder="Enter a phone number"
                    errorMessage="Please enter a valid phone number"
                />
                Location:
                <Location location={location} handleChange={this.handleChange} />
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let companyName = this.props.details ? this.props.details.name : ""
        let email = this.props.details ? this.props.details.email : ""
        let phone = this.props.details ? this.props.details.phone : ""
        let location = { city: '', country: '' }
        if (this.props.details && this.props.details.location) {
            location = this.props.details.location
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Name: {companyName}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                        <p> Location: {location.city}, {location.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}
