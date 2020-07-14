import React from 'react'
import {
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    UserSwitchOutlined,
    ProfileOutlined,
    UserOutlined,
    GoldOutlined,
    BarsOutlined,
    AppstoreOutlined,
    HomeOutlined
} from '@ant-design/icons';
const menuList = [
    {title:"首页",icon:<HomeOutlined />,path:"/home",public:true},
    {title:"商品",icon:<AppstoreOutlined />,path:"/goods",children:[
        {title:"品类管理",icon:<BarsOutlined />,path:"/category"},
        {title:"商品管理",icon:<GoldOutlined />,path:"/product"}
    ]},
    {title:"用户管理",icon:<UserOutlined />,path:"/user"},
    {title:"角色管理",icon:<UserSwitchOutlined />,path:"/role"},
    {title:"订单管理",icon:<ProfileOutlined />,path:"/order"},
    {title:"图形图表",icon:<AreaChartOutlined />,path:"/charts",children:[
        {title:"柱形图",icon:<BarChartOutlined />,path:"/charts/bar"},
        {title:"折线图",icon:<LineChartOutlined />,path:"/charts/line"},
        {title:"饼状图",icon:<PieChartOutlined />,path:"/charts/pie"}
    ]},

]

export default menuList