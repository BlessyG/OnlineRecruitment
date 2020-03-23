/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Dropdown, Button } from 'semantic-ui-react';
import { skillLevel } from '../Employer/common.js'

export default class Skill extends React.Component {
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
        this.addSkill = this.addSkill.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
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

    addSkill() {
        var arr = [this.state.options]
        var data = [...arr, ...this.props.skillData]
        var updateData = {
            skills: [...data]
        }
        this.props.updateProfileData(updateData);       
        this.setState({
            showAddSection: false, options: { id: "", name: "", level: "" }
        });
    }
    handleUpdate(index, enteredName, enteredLevel, e) {
        e.preventDefault();
        var dataList = this.props.skillData;
        const list = dataList.map((item, j) => {
            if (j === index) {
                item.name = this.state.options.name ? this.state.options.name : enteredName;
                item.level = this.state.options.level ? this.state.options.level : enteredLevel;
                return item;
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
        var deleteSkil = this.props.skillData
        deleteSkil = deleteSkill.filter(item => id !== item.id)
        var updateData = {
            skills: [...deleteSkill]
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
                                        name="skill"
                                        placeholder="Add Skill"
                                        maxLength={12}
                                        onChange={this.handleChangeText}
                                        id="name"
                                    />
                                    <Dropdown
                                        name="skillLevel"
                                        search selection
                                        options={skillLevel}
                                        onChange={this.handleChange}
                                        placeholder="Skill Level"
                                        className="ui dropdown skill"
                                        id="level"
                                    />
                                    <button type="button" className="ui teal button" onClick={this.addSkill}>Add</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                                </div>
                            </div> : ""}
                        <Table stackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Skill</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell textalign='right'><button type="button" className="ui teal button" onClick={this.handleAddRecord}><Icon name="add" />Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.skillData.map((skillList, index) =>
                                    <Table.Row key={skillList.id} >
                                        <Table.Cell >
                                            {!this.state.showTableData && this.state.tableEditId == skillList.id ?
                                                <div className="ui sixteen wide column">
                                                    <input
                                                        type="text"
                                                        name="editSkill"
                                                        placeholder={skillList.name}
                                                        maxLength={12}
                                                        onChange={this.handleChangeText}
                                                        id="editName"
                                                    />
                                                </div> : <div className="ui sixteen wide column">{skillList.name}</div>}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {!this.state.showTableData && this.state.tableEditId == skillList.id ?
                                                <div className="ui sixteen wide column">
                                                    <Dropdown
                                                        name="editSkillLevel"
                                                        search selection
                                                        options={skillLevel}
                                                        onChange={this.handleChange}
                                                        placeholder={skillList.level}
                                                        className="ui dropdown editSkill"
                                                        id="editLevel"
                                                    /></div> : <div className="ui sixteen wide column">{skillList.level}</div>
                                            }
                                        </Table.Cell>
                                        <Table.Cell >
                                            {!this.state.showTableData && this.state.tableEditId == skillList.id ?
                                                <div className="ui sixteen wide column" textalign="left">
                                                    <Button basic color='blue' content='Update' onClick={(e) => this.handleUpdate(index, skillList.name, skillList.level, e)} />
                                                    <Button basic color='red' content='Cancel' onClick={this.closeEditTable} />
                                                </div> :
                                                <div className="div row" textalign='right'>
                                                    <div className="div column"><Icon name="pencil" id={skillList.id} onClick={this.editRecord} /></div>
                                                    <div className="div column"><Icon name="close" id={skillList.id} onClick={this.closeRecord} /></div>
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