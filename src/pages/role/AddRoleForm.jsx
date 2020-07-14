import React, { Component } from 'react';
import {Input} from 'antd'
class AddRoleForm extends Component {
    constructor(props) {
        super(props)
    }
    state = {
    }
    componentDidMount() {
    }
    render() {
        return (
            <div style={{display:'flex',alignItems:'center'}}>
                <label style={{width:100}}>角色名称：</label>
                <Input ref="roleName"/>
            </div>
        );
    }
}

export default AddRoleForm;
