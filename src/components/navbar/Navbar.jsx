import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import './Navbar.less'
import storageUtils from '../../utils/storageUtils.js'
import { Modal, Button, Space, Breadcrumb } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MenuList from '../../config/menuConfig.js'
import { formateDate } from '../../utils/dateUtils.js'
import { reqWeather } from '../../api/index.js'
import LinkButton from '../link-button'
import { connect } from 'react-redux'
import {logout} from '../../store/actions'
const { confirm } = Modal;
class Navbar extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: "",
        weather: ""
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);
        this.getWeatherInfo();
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    logout = () => {
        confirm({
            title: 'Do you Want to log out?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                console.log('OK');
                // storageUtils.removeUser();
                // this.props.history.replace("/login")
                this.props.logout()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    getBreadCrumb = (MenuList) => {
        const pathname = this.props.location.pathname;
        const breadList = []
        MenuList.map(item => {
            if (!item.children) {
                if (pathname.includes(item.path)) {
                    breadList.push(<Breadcrumb.Item key={item.path}><Link to={item.path}>{item.title}</Link></Breadcrumb.Item>)
                }
            } else {
                item.children.find(cItem => {
                    if (pathname.includes(cItem.path)) {
                        breadList.push(<Breadcrumb.Item key={item.path}><Link to={item.path}>{item.title}</Link></Breadcrumb.Item>)
                        breadList.push(<Breadcrumb.Item key={cItem.path}><Link to={cItem.path}>{cItem.title}</Link></Breadcrumb.Item>)
                    }
                })
            }
        })
        return breadList
    }
    getBreadCrumbFromStore = () => {

        const breadList = this.props.headerTitle
        breadList.map(item => {
            return (<Breadcrumb.Item key={item}><Link to={item}>{item}</Link></Breadcrumb.Item>)
        })
        return breadList
    }
    getWeatherInfo = async () => {
        const { dayPictureUrl, weather } = await reqWeather("上海")
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    render() {
        const username = this.props.user.username;

        const { dayPictureUrl, weather } = this.state;
        return (
            <div className="navbar">
                <div className="navbar-top">
                    <span>Hello, {username} &nbsp;&nbsp;</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="navbar-bottom">
                    <div className="navbar-bottom-left">
                        <Breadcrumb separator=">">

                            {/* {this.getBreadCrumb(MenuList)} */}
                            {this.getBreadCrumbFromStore()}
                        </Breadcrumb>
                    </div>
                    <div className="navbar-bottom-right">

                        <span>{this.state.currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"></img>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        user:state.user,
        headerTitle: state.headerTitle
    }),
    {logout}
)(withRouter(Navbar))
