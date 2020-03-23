/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Dropdown, Button } from 'semantic-ui-react';
import { languageLevel } from '../Employer/common.js'
export default class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddSection: false,
            tableEditId: "",
            showTableData: true,
            options: {
                id: "",
                name: "",
                level: ""
            }         
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
       // this.handleUpdate = this.handleUpdate.bind(this);
        this.closeEditTable = this.closeEditTable.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.closeRecord = this.closeRecord.bind(this);
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
        data["name"] = event.target.value
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
        var data = [...arr, ...this.props.languageData]
        var updateData = {
            languages: [...data]
        }
        this.props.updateProfileData(updateData)
        //this.setState({
        //    languageList: [...data], showAddSection:false,options
        //});
        this.setState({
            showAddSection: false, options: { id: "", name: "", level: "" }
        });
    }
    handleUpdate(index, enteredName, enteredLevel,e) {
        debugger
        e.preventDefault();
        var dataList = this.props.languageData;
        const list = dataList.map((item, j) => {
            if (j === index) {
                item.name = this.state.options.name ? this.state.options.name : enteredName;
                item.level = this.state.options.level ? this.state.options.level : enteredLevel;
                return item ;
            } else {
                return item;
            }
        });
        this.props.updateProfileData(list);
        this.setState({ showTableData: true });
    }
    closeEditTable() {
        this.setState({ showTableData: true });
    }
    editRecord(event) {
        var selectedId = event.target.id;
        this.setState({ showTableData: false, tableEditId: selectedId });
    }
    closeRecord(event) {        
        event.preventDefault();
        var id = event.target.id;
        var deleteLang = this.props.languageData
        deleteLang = deleteLang.filter(item => id !== item.id)
        var updateData = {
            languages: [...deleteLang]
        }
        this.props.updateProfileData(updateData);
        this.setState({ showTableData: true });
    }
    render() {
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
                                    <Table.HeaderCell textalign='right'><button type="button" className="ui teal button" onClick={this.handleAddRecord}><Icon name="add" />Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.languageData.map((langList, index) =>
                                    <Table.Row key={langList.id} >
                                        <Table.Cell >
                                            {!this.state.showTableData && this.state.tableEditId == langList.id ?
                                                <div className="ui sixteen wide column">
                                                    <input
                                                        type="text"
                                                        name="editlanguage"
                                                        placeholder={langList.name}
                                                        maxLength={12}
                                                        onChange={this.handleChangeText}
                                                        id="editName"
                                                    />
                                                </div> : <div className="ui sixteen wide column">{langList.name}</div>}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {!this.state.showTableData && this.state.tableEditId == langList.id ?
                                                <div className="ui sixteen wide column">
                                                    <Dropdown
                                                        name="editlanguageLevel"
                                                        search selection
                                                        options={languageLevel}
                                                        onChange={this.handleChange}
                                                        placeholder={langList.level}
                                                        className="ui dropdown editLanguage"
                                                        id="editLevel"
                                                    /></div> : <div className="ui sixteen wide column">{langList.level}</div>
                                            }
                                        </Table.Cell>
                                        <Table.Cell >
                                            {!this.state.showTableData && this.state.tableEditId == langList.id ?
                                                <div className="ui sixteen wide column" textalign="left">
                                                    <Button basic color='blue' content='Update' onClick={(e)=>this.handleUpdate(index,langList.name,langList.level,e)} />
                                                    <Button basic color='red' content='Cancel' onClick={this.closeEditTable} />
                                                </div> :
                                                <div className="div row" textalign='right'>
                                                    <div className="div column"><Icon name="pencil" id={langList.id} onClick={this.editRecord} /></div>
                                                    <div className="div column"><Icon name="close" id={langList.id} onClick={this.closeRecord} /></div>
                                                </div>
                                            }
                                        </Table.Cell>
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