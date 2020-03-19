/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Dropdown } from 'semantic-ui-react';
import { languageLevel } from '../Employer/common.js'

export default class Language extends React.Component {
    constructor(props) {
        super(props); 
        const langDetails = this.props.languageData ?
            Object.assign({}, props.languageData)
            : []
        this.state = {
            showAddSection: false,
            options: {
                id:"",
                name: "",
                level: ""
            },
            languageList: langDetails            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }
    handleAddRecord() {
        this.setState({ showAddSection: true });
    }
    handleChange(event, objReference) {          
        const id = event.target.id;
        //var data = [...this.state.options];
        var data = this.state.options;
        const name = objReference.name;
        let value = objReference.value;        
        data["level"] = value;
        this.setState({
            options: data
        })
    }
    handleChangeText(event) {        
        const id = event.target.id;
        //var data = [...this.state.options]
        var data = this.state.options
        data[event.target.id] = event.target.value
        this.setState({
            options: data
        })
    }
    closeEdit() {
        this.setState({ showAddSection: false });
    }
    
    addLanguage() {
                
        //var data = Object.assign({}, this.state.languageList, this.state.options, this.props.languageData) 
        var arr = [this.state.options]
        var data = [...arr,...this.props.languageData]        
        var updateData = {
            languages:  [...data]
        }
        this.props.updateProfileData(updateData)
        this.setState({
            languageList: [...data], showAddSection:false
        });
    }
    render() {
        //const finalList = this.state.languageList;       
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        {this.state.showAddSection ?
                            <div className='row'>
                            <div className="ui sixteen wide column">
                                <input
                                    type="text"
                                    name="language"
                                    placeholder="Add Language"
                                    maxLength={12}
                                    onChange={this.handleChangeText}
                                    id="name"
                                />
                                <Dropdown
                                    name="languageLevel"
                                    search selection
                                    options={languageLevel}
                                    onChange={this.handleChange}
                                    placeholder="Language Level"
                                    className="ui dropdown language"
                                    id="level"
                                />
                                <button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                            </div> 
                            </div> : ""}
                        <Table stackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Language</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'><button type="button" className="ui teal button" onClick={this.handleAddRecord}><Icon name="add" />Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.languageData.map((langList) =>
                                    <Table.Row key={langList.id}>
                                        <Table.Cell>{langList.name}</Table.Cell>
                                        <Table.Cell>{langList.level}</Table.Cell>
                                        <Table.Cell textAlign='right'><button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button></Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </React.Fragment>
                </div>
            </div>
        )

    }
}