import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Menu, Button } from 'antd'
import './Sidebar.less';
import Logo from '../../assets/images/logo.png';
import MenuList from '../../config/menuConfig.js'
import storageUtils from '../../utils/storageUtils.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import example from './example.less'
import { connect } from 'react-redux'
import { setHeaderTitle } from '../../store/actions';
const { SubMenu } = Menu;
class Sidebar extends Component {
    constructor(props) {
        super(props)
    }
    hasPermission = (item) => {
        const username = this.props.user.username
        const menus = this.props.user.role.menus
        if (username === 'admin' || item.public || menus.indexOf(item.path) != -1) {
            return true
        } else if (item.children) {
            let citem = item.children.find(citem => menus.indexOf(item.path) != -1)
            return !!citem
        }
        return false
    }
    getMenuNodes = (MenuList) => {
        return MenuList.map(item => {
            const selectedKey = this.props.location.pathname;
            if (this.hasPermission(item)) {
                if (!item.children) {
                    if(item.path === selectedKey || selectedKey.indexOf(item.path) === 0) {
                        const headerTitle = []
                        headerTitle.push(item.title)
                        this.props.setHeaderTitle(headerTitle)
                    }
                    return (
                        <Menu.Item key={item.path} icon={item.icon}>
                            <Link to={item.path} onClick={() => { this.linkClicked(item) }}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    
                    // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
                    const cItem = item.children.find(cItem => selectedKey.includes(cItem.path))
                    if (cItem) {
                        this.openKey = item.path
                    }
                    return (
                        <SubMenu key={item.path} icon={item.icon} title={item.title}>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }

        })
    }
    linkClicked = (item) => {
        const headerTitle = []
        headerTitle.push(item.title)
        this.props.setHeaderTitle(headerTitle)
    }
    isCollapsed = (collapsedFlag) => {
        if (collapsedFlag) {
            return (
                // null
                <Link to="/home" className="sidebar-logo">
                    {/* <img src={Logo} alt="logo"></img> */}
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"></img>
                </Link>
            )
        } else {
            return (
                <Link to="/home" className="sidebar-logo">
                    {/* <img src={Logo} alt="logo"></img> */}
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"></img>
                    <h1>后台管理系统</h1>
                </Link>
                // <h1>后台管理系统</h1>

            )
        }
    }
    // 在render函数之前执行一次
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(MenuList)
    }
    // 在render函数之后执行
    componentDidMount() {

    }
    render() {
        let selectedKey = this.props.location.pathname;
        if (selectedKey.includes("/product")) {
            selectedKey = "/product"
        }
        return (
            <div className="sidebar">
                <ReactCSSTransitionGroup transitionAppearTimeout={500} transitionName={example} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {/* <Link to="/home" className="sidebar-logo">
                    <img src={Logo} alt="logo"></img>
                    <h1>后台管理系统</h1>
                </Link> */}
                    {this.isCollapsed(this.props.isCollapsed)}
                </ReactCSSTransitionGroup>
                <Menu
                    //注意：defaultSelectedKeys和selectedKeys的区别，前者只匹配第一次路由，后者执行两次
                    selectedKeys={[selectedKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}

                    {/* <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/home">
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="2" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="3" icon={<BarsOutlined />} ><Link to="/category">品类管理</Link></Menu.Item>
                        <Menu.Item key="4" icon={<GoldOutlined />} ><Link to="/product">商品管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                    <Link to="/user">
                            用户管理
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<UserSwitchOutlined />}>
                    <Link to="/role">
                            角色管理
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<ProfileOutlined />}>
                    <Link to="/order">
                            订单管理
                    </Link>
                    </Menu.Item>
                    <SubMenu key="8" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="9" icon={<BarChartOutlined />} ><Link to="/charts/bar">柱形图</Link></Menu.Item>
                        <Menu.Item key="10" icon={<LineChartOutlined />} ><Link to="/charts/line">折线图</Link></Menu.Item>
                        <Menu.Item key="11" icon={<PieChartOutlined />} ><Link to="/charts/pie">饼状图</Link></Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div >
        );
    }
}
export default connect(
    state => ({
        user:state.user
    }),
    {
        setHeaderTitle
    }
)(withRouter(Sidebar));
