
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Select, Button, Icon, Table, Card, Input, Switch, Space, message } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { reqProducts, reqProductsByNameOrDesc, reqUpdateStatus } from '../../api';
import _ from 'lodash';

const { Option } = Select;
class Home extends Component {
    state = {
        list: [],
        listLoading: false,
        total: 0,
        searchType: "productName",
        searchText: "",
    }
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                key: 'status',
                render: (status) => {
                    return <Switch checkedChildren="在售" unCheckedChildren="已下架" checked={status === 1} />
                }
            },
            {
                title: '操作',
                key: 'action',
                align: "center",
                width: 300,
                render: (product) => {
                    const { status, _id } = product
                    return (
                        <div>
                            <Button type="text" onClick={() => this.updateStatus(_id, status)}>{status === 1 ? '下架' : '上架'}</Button>
                            <Button type="text" onClick={() => this.props.history.push("/product/detail/" + _id)}>详情</Button>
                            <Button type="text" onClick={() => this.props.history.push("/product/addupdate", product)}>修改</Button>
                        </div>
                    )
                }
            },
        ];
    }
    getProducts = async (pageNum, pageSize) => {
        this.setState({ listLoading: true })
        this.pageNum = pageNum
        this.pageSize = pageSize
        const { searchType, searchText } = this.state
        let res
        if (!this.isSearch) {
            res = await reqProducts(pageNum, pageSize)
        } else {
            res = await reqProductsByNameOrDesc({ pageNum, pageSize, searchType, searchText })
        }
        if (res.status === 0) {
            //获取商品列表成功
            console.log(res)
            this.setState({ listLoading: false })
            const list = res.data.list
            const total = res.data.total
            this.setState({ list, total })
        } else {
            message.error("获取商品列表失败")
        }
    }
    pageSizeChanged(page, size) {
        console.log(page, size)
        this.getProducts(page, size)
    }
    handFilter = async () => {
        const pageNum = 1
        const pageSize = 5
        this.isSearch = true
        this.getProducts(pageNum, pageSize)

    }
    updateStatus = _.throttle(async (productId, status) => {
        status = status === 1 ? 2 : 1
        const res = await reqUpdateStatus(productId, status)
        if (res.status === 0) {
            message.success("更新商品状态成功")
            this.getProducts(this.pageNum, this.pageSize)
        } else {
            message.error("更新商品状态失败")
        }
    }, 2000)

    componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {
        this.getProducts(1, 5);
    }
    render() {
        const { list, total, listLoading, searchText, searchType } = this.state
        const search = (
            <Space>
                <Select defaultValue={searchType} onChange={(value) => this.setState({ searchType: value })}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="请输入关键字" onPressEnter={this.handFilter} style={{ width: 200 }} value={searchText} onChange={(e) => this.setState({ searchText: e.target.value })} allowClear></Input>
                <Button type="primary" icon={<SearchOutlined></SearchOutlined>} onClick={this.handFilter}>搜索</Button>
            </Space>
        )
        const action = (<div>
            <Button type="primary" icon={<PlusOutlined></PlusOutlined>} onClick={() => this.props.history.push("/product/addupdate")}>新增商品</Button>
        </div>)

        return (
            <Card title={search} extra={action}>
                <Table rowKey="_id" bordered dataSource={list} columns={this.columns} loading={listLoading}
                    pagination={{
                        showTotal: total => `Total ${total} items`,
                        defaultPageSize: 5, defaultCurrent: 1,
                        current: this.pageNum,
                        showSizeChanger: true,
                        pageSizeOptions: ["2", "5", "10", "20"],
                        showQuickJumper: true, total: total,
                        onChange: this.getProducts,
                        onShowSizeChange: (page, size) => this.pageSizeChanged(page, size)
                    }} ></Table>
            </Card>
        );
    }
}

export default withRouter(Home);