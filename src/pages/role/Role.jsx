import React, { Component } from 'react';
import { reqRoles, reqAddRole,reqUpdateRole } from '../../api';
import { formateDate } from '../../utils/dateUtils.js'
import { message, Card, Button, Table, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddRoleForm from './AddRoleForm';
import AuthRoleForm from './AuthRoleForm';
import storageUtils from '../../utils/storageUtils.js';
class Role extends Component {
    addRoleFormRef = React.createRef()
    authRoleTreeRef = React.createRef()
    state = {
        roles: [],
        role: {},
        ModalAddvisible: false,
        ModalAuthvisible: false,
    }
    columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: formateDate
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            key: 'auth_time',
            render: formateDate
        },
        {
            title: '授权用户',
            dataIndex: 'auth_name',
            key: 'auth_name',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (role) => {
                const { menus, name } = role
                return (
                    < Button type="primary" ghost onClick={() => {
                        this.setState({ ModalAuthvisible: true, role })
                    }
                    }> 分配权限</Button >
                )
            }
        },
    ]
    getRoles = async () => {
        const res = await reqRoles()
        if (res.status === 0) {
            //获取角色列表成功
            message.success("获取角色列表成功")
            this.setState({ roles: res.data })
        } else {
            message.error(res.msg)
        }
    }
    handleAddOk = async () => {
        console.log(this.addRoleFormRef.current.refs.roleName.state.value, "--roleName")
        const roleName = this.addRoleFormRef.current.refs.roleName.state.value

        if (!roleName) {
            return message.info("角色名称不能为空哦")
        }
        const res = await reqAddRole(roleName)
        if (res.status === 0) {
            //添加成功
            message.success("添加角色成功啦")
            this.setState({ ModalAddvisible: false })
            this.getRoles()
        } else {
            message.error(res.msg)
        }
    }
    handleAddCancel = () => {
        const roleName = this.addRoleFormRef.current.refs.roleName.state.value
        if(roleName) {
            this.addRoleFormRef.current.refs.roleName.state.value = ''
        }
        this.setState({ ModalAddvisible: false })
    }
    handleAuthOk = async () => {
        const checkedKeys = this.authRoleTreeRef.current.getCheckedKeys()
        console.log(checkedKeys)
        const {_id} =  this.state.role 
        const role = {
            _id,
            menus:checkedKeys,
            auth_name:storageUtils.getUser().username,
            auth_time:Date.now()
        }
        //发送请求
        const res = await reqUpdateRole(role)
        if(res.status === 0) {
            //分配角色成功
            message.success("分配角色成功")
            this.setState({ ModalAuthvisible: false })
            this.getRoles()
        } else {
            message.error(res.msg)
        }
    }
    handleAuthCancel = () => {

        this.setState({ ModalAuthvisible: false })
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, role } = this.state
        const action = (
            <Button type="primary" icon={<PlusOutlined></PlusOutlined>} onClick={() => this.setState({ ModalAddvisible: true })}>添加角色</Button>
        )
        return (
            <Card title={action}>
                <Table bordered dataSource={roles} rowKey="_id" columns={this.columns}></Table>
                <Modal
                    title="添加角色"
                    visible={this.state.ModalAddvisible}
                    onOk={this.handleAddOk}
                    onCancel={this.handleAddCancel}
                >
                    <AddRoleForm ref={this.addRoleFormRef}></AddRoleForm>
                </Modal>
                <Modal
                    title="分配权限"
                    visible={this.state.ModalAuthvisible}
                    onOk={this.handleAuthOk}
                    onCancel={this.handleAuthCancel}
                >
                    <AuthRoleForm ref={this.authRoleTreeRef} role={role}></AuthRoleForm>
                </Modal>
            </Card>
        );
    }
}

export default Role;
