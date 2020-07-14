import React, { PureComponent } from 'react';
import { Button, Card, Table, message, Modal, Space, Tag, Popconfirm } from 'antd'
import { formateDate } from '../../utils/dateUtils';
import { reqUsers, reqAddUser,reqUpdateUser,reqDeleteUser } from '../../api'
import ModalAddUpdate from './ModalAddUpdate.jsx'
class User extends PureComponent {
    state = {
        users: [],
        user:{},
        roles: [],
        ModalAddUpdateVisible: false
    }
    columns = [
        {
            title: '用户名称',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '用户角色',
            dataIndex: 'role_id',
            key: 'role_id',
            render: (role_id) => {
                const role = this.state.roles.find(item => role_id === item._id)
                return <Tag color="success">{role.name}</Tag>
            }
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '电子邮箱',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: formateDate
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            render: (user) => (
                <Space>
                    <Button type="primary" ghost onClick={() => this.setState({ModalAddUpdateVisible:true,user})}>编辑</Button>
                    <Popconfirm
                        title="确定删除此用户?"
                        onConfirm={() => this.confirm(user._id)}
                        onCancel={this.cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="primary" ghost>删除</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]
    getUsers = async () => {
        const res = await reqUsers()
        if (res.status === 0) {
            message.success("获取用户列表成功")
            this.setState({ users: res.data.users, roles: res.data.roles })
        } else {
            message.error(res.msg)
        }
    }
    onCreate = async values => {
        console.log('Received values of form: ', values);
        let res
        if(!this.state.user._id) {
            //发送请求添加用户
            res = await reqAddUser(values)

        } else {
            //发送请求更新用户
            values._id = this.state.user._id
            res = await reqUpdateUser(values)
            this.setState({user:{}})
        }
        if (res.status === 0) {
            message.success(this.state.user._id ? "修改用户成功" : "添加用户成功")
            this.setState({ ModalAddUpdateVisible: false });
            this.getUsers()
        } else {
            message.error(res.msg)
        }
    };
    //确认删除用户
    confirm  = async (userId) =>{
        console.log(userId);
        const res = await reqDeleteUser(userId)
        if(res.status === 0) {
            message.success('删除用户成功');
            this.getUsers()
        } else {
            message.error(res.msg)
        }
    }
    //取消删除用户
    cancel(e) {
        console.log(e);
        message.info('已取消删除');
    }
    componentDidMount() {
        this.getUsers()
    }
    render() {
        const { users,user } = this.state
        const action = (
            <Button type="primary" onClick={() => this.setState({ ModalAddUpdateVisible: true })}>添加用户</Button>
        )
        return (
            <Card title={action}>
                <Table bordered dataSource={users} rowKey="_id" columns={this.columns} ></Table>
                <ModalAddUpdate 
                user={user}
                visible={this.state.ModalAddUpdateVisible}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ModalAddUpdateVisible: false,user:{} });
                    }}
                    ></ModalAddUpdate>
            </Card>
        );
    }
}

export default User;
