import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd';
import storageUtils from '../../utils/storageUtils'
import logo_login from './images/Unilever.png'
import './Login.less'
import { reqLogin } from '../../api/index.js'
import { connect } from 'react-redux'
import { login } from '../../store/actions'
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    if (!errorInfo.values.username) {
        message.error("请输入用户名")
    }
    if (!errorInfo.values.password) {
        message.error("请输入密码")
    }

};
const layout = {
    // labelCol: { span: 8 },
    wrapperCol: { span: 24 },

};
class Login extends Component {
    constructor(props) {
        super(props);
    }
    onFinish = async values => {
        console.log('Success:', values);
        this.props.login(values.username,values.password)
        /*
        //发ajax请求
        const res = await reqLogin(values.username, values.password)
        if (res.status != 0) {
            return message.error(res.msg)
        }
        
        let user = res.data;
        // localStorage.setItem("user_key", JSON.stringify(user));
        storageUtils.saveUser(user);
        message.success("登录成功");
        this.props.history.replace("/");
        // this.props.history.push("/")
        */
    }
    render() {
        // const user = JSON.parse(localStorage.getItem("user_key") || '{}')
        // const user = storageUtils.getUser();
        const user = this.props.user
        if (user._id) {
            return <Redirect to="/"></Redirect>
        } else {
            this.props.user.msg ? message.error(this.props.user.msg) : console.log("")
        }
        return (
            <div className="login">
                {/* <div className="login-header">
                    <img src={logo} width="100px" height="100px" className="logo" alt="logo"></img>
                    <h1>后台管理系统</h1>
                </div> */}
                <div className="login-content">
                    <img src={logo_login} width="100px" height="100px" className="logo" alt="logo"></img>
                    <div className="login-form">
                        <Form
                            {...layout}
                            name="basic"
                            ref="formRef"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                            onFinishFailed={onFinishFailed}
                            labelAlign="left"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '用户名不能为空' }, {
                                    min: 4, message: "用户名不能小于4位"
                                }, { max: 12, message: "用户名不能大于12位" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是字母，数字，下划线组成" }]}
                            >

                                <Input prefix={<UserOutlined></UserOutlined>} placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                initialValue=""
                                rules={[({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        value = value.trim();
                                        if (!value) {
                                            return Promise.reject("密码不能为空");

                                        } else if (value.length < 4) {
                                            return Promise.reject("密码不能小于6位");
                                        } else if (value.length > 12) {
                                            return Promise.reject("密码不能大于12位");
                                        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                                            return Promise.reject("密码只能是字母数字和下划线组合");
                                        }
                                        else {
                                            return Promise.resolve();
                                        }
                                    },
                                }),]}
                            >
                                <Input.Password prefix={<LockOutlined></LockOutlined>} placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
        user:state.user
    }),
    { login }
)(Login)
