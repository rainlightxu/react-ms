import React, { Component, useReducer } from 'react';
import { Form, Modal, Input, Select } from 'antd'
import { FormInstance } from 'antd/lib/form';
import { reqRoles } from '../../api';
const Option = Select.Option
class ModalAddUpdate extends Component {
    formRef = React.createRef();
    state = {
        roles: [],
        user: {}
    }
    getRoles = async () => {
        const res = await reqRoles()
        if (res.status === 0) {
            const roles = res.data
            this.setState({ roles })
        } else {
        }
    }
    getRolesOption = () => {
        return this.state.roles.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
    }
    componentWillMount() {
        this.setState({
            user: this.props.user
        })
    }
    componentDidMount() {
        this.getRoles()
        
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.user })
    }
    render() {
        const {user} = this.state
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    title={user._id ? "修改用户" : "添加用户"}
                    okText={user._id ? "Update" : "Create"}
                    cancelText="Cancel"
                    onCancel={this.props.onCancel}
                    onOk={() => {
                        this.formRef.current
                            .validateFields()
                            .then(values => {
                                this.formRef.current.resetFields();
                                this.props.onCreate(values);
                            })
                            .catch(info => {
                                this.formRef.current.resetFields();
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        ref={this.formRef}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            ...user
                        }}
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {!user._id ? <Form.Item name="password" label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}>
                            <Input.Password />
                        </Form.Item> : null}
                        <Form.Item name="phone" label="联系电话" rules={[
                            {
                                required: true,
                                message: '请输入联系电话',
                            }
                        ]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name="email" label="电子邮箱" rules={[
                            {
                                required: true,
                                message: '请输入电子邮箱',
                            },
                            {
                                type: 'email',
                                message: '电子邮箱格式不正确',
                            }
                        ]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name="role_id" label="所属角色" rules={[
                            {
                                required: true,
                                message: '请为用户分配角色',
                            },
                        ]}>
                            <Select >
                                <Option value="">---请选择---</Option>
                                {this.getRolesOption()}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default ModalAddUpdate;
