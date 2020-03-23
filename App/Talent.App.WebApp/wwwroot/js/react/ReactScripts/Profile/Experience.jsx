/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Dropdown, Button } from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddSection: false,
            tableEditId: "",
            showTableData: true,
            options: {
                id: "",
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                responsibilities: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.closeEditTable = this.closeEditTable.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.closeRecord = this.closeRecord.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    handleAddRecord() {
        this.setState({ showAddSection: true });
    }   
    handleChange(event) {
        const id = event.target.id;
        var data = this.state.options
        data[id] = event.target.value
        this.setState({
            options: data
        })
    }
    closeEdit() {
        this.setState({ showAddSection: false });
    }

    addExperience() {
        var arr = [this.state.options]
        var data = [...arr, ...this.props.experienceData]
        var updateData = {
            experience: [...data]
        }
        this.props.updateProfileData(updateData);
        this.setState({
            showAddSection: false, options: { id: "", company: "", position: "",startDate:"",endDate:"",responsibilities:"" }
        });
    }
    handleUpdate(index, enteredName, enteredLevel, e) {
        e.preventDefault();
        var dataList = this.props.experienceData;
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
        var deleteLang = this.props.experienceData
        deleteLang = deleteLang.filter(item => id !== item.id)
        var updateData = {
            experience: [...deleteLang]
        }
        this.props.updateProfileData(updateData);
        this.setState({ showTableData: true });
    }
    handleDateChange(event) {
        console.log("Date : " + event.target.value);
        //this.setState({ enteredDate: event.target.value });
    }
    render() {
        debugger
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        {this.state.showAddSection ?
                            <div >
                                <div className='row'>
                                    Company:<br />
                                    <input type="text" name="company" placeholder="Company" maxLength={80} onChange={this.handleChange} id="company" />
                                    Position:<br />
                                    <input type="text" name="position" placeholder="Position" maxLength={50} onChange={this.handleChange} id="position" />
                                </div>
                                <div className='row'>
                                    Start Date:<br />
                                    <div className="ui calendar" >
                                        <div className="ui input">
                                            <input type="date" name="start" value={this.state.value} onChange={this.handleChange} id="startDate"/>
                                        </div>
                                    </div>
                                    End Date:<br />
                                    <div className="ui calendar" >
                                        <div className="ui input">
                                            <input type="date" name="start" value={this.state.value} onChange={this.handleChange} id="endDate"/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    Responsibilities:<br />
                                    <input type="text" name="responsibilities" placeholder="Responsibilities" maxLength={100} onChange={this.handleChange} id="responsibilities" />
                                </div>
                                <div className='row'>
                                    <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                                </div>
                            </div> : ""}
                        <Table stackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>
                                    <Table.HeaderCell textalign='right'><button type="button" className="ui teal button" onClick={this.handleAddRecord}><Icon name="add" />Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.experienceData.map((experienceList, index) => {
                                !this.state.showTableData && this.state.tableEditId == experienceList.id ?
                                    <div >
                                        <div className='row'>
                                            Company:<br />
                                            <input type="text" name="company" placeholder="Company" maxLength={80} onChange={this.handleChange} id="company" value={experienceList.company} />
                                            Position:<br />
                                            <input type="text" name="position" placeholder="Position" maxLength={50} onChange={this.handleChange} id="position" value={experienceList.position} />
                                        </div>
                                        <div className='row'>
                                            Start Date:<br />
                                            <div className="ui calendar" >
                                                <div className="ui input">
                                                    <input type="date" name="start" value={experienceList.start} onChange={this.handleDateChange} id="startDate"/>
                                                </div>
                                            </div>
                                            End Date:<br />
                                            <div className="ui calendar" >
                                                <div className="ui input">
                                                    <input type="date" name="end" value={experienceList.end} onChange={this.handleDateChange} id="endDate" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            Responsibilities:<br />
                                            <input type="text" name="responsibilities" placeholder="Responsibilities" maxLength={12} onChange={this.handleChange} id="responsibilities" value={experienceList.responsibilities} />
                                        </div>
                                        <div className="row" textalign="left">
                                            <button type="button" className="ui teal button" onClick={(e) => this.handleUpdate(index, experienceList.name, experienceList.level, e)}>Update</button>
                                            <button type="button" className="ui button" onClick={this.closeEditTable}>Cancel</button>
                                        </div>
                                    </div>
                                    :
                                    <Table.Row key={experienceList.id} >
                                        <Table.Cell >
                                            <div className="ui sixteen wide column">{experienceList.company}</div>}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="ui sixteen wide column">{experienceList.position}</div>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <div className="ui sixteen wide column">{experienceList.startDate}</div>}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="ui sixteen wide column">{experienceList.endDate}</div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="ui sixteen wide column">{experienceList.responsibilities}</div>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <div className="div row" textalign='right'>
                                                <div className="div column"><Icon name="pencil" id={experienceList.id} onClick={this.editRecord} /></div>
                                                <div className="div column"><Icon name="close" id={experienceList.id} onClick={this.closeRecord} /></div>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                }
                                )}
                            </Table.Body>
                        </Table>
                    </React.Fragment>
                </div>
            </div>
        )

    }
}