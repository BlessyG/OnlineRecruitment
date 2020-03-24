import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { Radio } from 'semantic-ui-react';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSection: false,
            newData: {
                status: '',
                availableDate:''
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, { value }) {
        const data = Object.assign({}, this.state.newData)
        data["status"] = value
        this.setState({
            newData: data
        })
        var updateData = {
            jobSeekingStatus: data
        }
        this.props.saveProfileData(updateData);
    }
    
    render() {
        debugger
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <Form>
                        <Form.Field>
                            Current Status <b>{this.state.value}</b>
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Actively looking for a job'
                                name='radioGroup'
                                value='1'
                                checked={this.props.status.status === '1'}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Not looking for a job at the moment'
                                name='radioGroup'
                                value='2'
                                checked={this.props.status.status === '2'}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Currently employed but open to offers'
                                name='radioGroup'
                                value='3'
                                checked={this.props.status.status === '3'}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Will be available on later date'
                                name='radioGroup'
                                value='4'
                                checked={this.props.status.status === '4'}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>
                </div>
            </div>
        )
    }
}