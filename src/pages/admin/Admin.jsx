import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils'
import { Layout } from 'antd'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Navbar from '../../components/navbar/Navbar.jsx'
import './Admin.less'
import Home from '../home/Home.jsx'
import Category from '../category/Category.jsx'
import Pie from '../charts/Pie.jsx'
import Bar from '../charts/Bar.jsx'
import Line from '../charts/Line.jsx'
import Product from '../product/Product.jsx'
import Role from '../role/Role.jsx'
import User from '../user/User.jsx'
import Order from '../order/Order.jsx'
import {connect} from 'react-redux'

const { Header, Footer, Sider, Content } = Layout;
class Admin extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        // const user = JSON.parse(localStorage.getItem("user_key") || '{}')
        // const user = storageUtils.getUser();
        const user = this.props.user
        if (!user._id) {
            return <Redirect to="/login"></Redirect>
        }

        return (
            <Layout style={{ height: '100%' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Sidebar isCollapsed={this.state.collapsed}></Sidebar>
                </Sider>
                <Layout>
                    <Header className="header">
                        <Navbar></Navbar>
                    </Header>
                    <Content style={{backgroundColor:'white',margin:'20px'}}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/order" component={Order}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </Content>
                    <Footer className="footer">
                        Made with ❤ by Mike
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({
        user:state.user,
    }),
    {}
)(Admin)