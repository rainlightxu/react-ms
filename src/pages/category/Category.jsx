import React, { Component } from 'react';
import { Card, Button, Table, message, Modal, notification } from 'antd'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api/index.js'
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import AddUpdateForm from './subcomponent/AddUpdateForm.jsx'
class Category extends Component {

    state = {
        list: [],
        total: 0,
        listLoading: false,
        ModalStatus: 0, //0:不显示 1: 新增分类对话框 2: 编辑分类对话框
    }

    initColumns = () => {
        this.columns = [
            {
                title: '序号',
                width: 80,
                align:'center',
                render: (text, record, index) => `${index + 1}`
            },
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 500,
                align: "center",
                render: (category) => <Button type="primary" ghost icon={<EditOutlined />} onClick={() => { this.category = category; this.setState({ ModalStatus: 2 }) }}>编辑</Button>
            }
        ];
    }
    getCategorys = async () => {
        this.setState({ listLoading: true })
        const res = await reqCategorys()
        console.log(res)
        if (res.status === 0) {
            this.setState({ listLoading: false })
            const list = res.data
            const total = res.data.length
            this.setState({
                list,
                total
            })
        } else {
            message.error("获取分类列表失败")
        }
    }
    handleOk = async () => {
        //验证表单
        try {
            const values = await this.form.validateFields();
            console.log('Success:', values);
            if (this.state.ModalStatus === 1) {
                //发送ajax请求添加分类
                const res = await reqAddCategory(values.categoryName)
                console.log(res)
                if (res.status === 0) {
                    //添加成功
                    notification.success({
                        message: '成功',
                        description:
                            '添加分类成功',
                    });
                    //刷新页面
                    this.getCategorys();
                    //清空form表单
                    this.form.resetFields();
                    //关闭对话框
                    this.setState({ ModalStatus: 0 })
                } else {
                    //添加失败
                    message.error("添加失败")
                }
            } else {
                //发送ajax请求编辑分类
                const categoryId = this.category._id;
                const res = await reqUpdateCategory(categoryId, values.categoryName);
                if (res.status === 0) {
                    //修改成功
                    notification.success({
                        message: '成功',
                        description:
                            '修改分类成功',
                    });
                    //刷新页面
                    this.getCategorys();
                    //清空form表单
                    this.form.resetFields();
                    //隐藏对话框
                    this.setState({ ModalStatus: 0 })
                } else {
                    //修改失败
                    message.error("修改失败")
                }
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }

    }
    handleCancel = () => {
        //清空form表单
        this.form.resetFields();
        this.setState({ ModalStatus: 0 })
    }
    componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {
        this.getCategorys();
    }
    render() {
        const { list, ModalStatus, listLoading, total } = this.state
        const category = this.category || {}
        const action = (
            <Button type="primary" icon={<PlusOutlined></PlusOutlined>} onClick={() => { this.category = {}; this.setState({ ModalStatus: 1 }) }}>添加分类</Button>
        )
        return (
            <Card extra={action}  >
                <Table
                    rowKey="_id"
                    columns={this.columns}
                    dataSource={list}
                    bordered
                    loading={listLoading}
                    pagination={{ showTotal: total => `Total ${total} items`, defaultPageSize: 5, defaultCurrent: 1, showSizeChanger: true, pageSizeOptions: ["2", "5", "10", "20"], showQuickJumper: true, total: total }}
                    rowSelection={{ checkStrictly: true }}
                />
                <Modal
                    title={ModalStatus === 1 ? '新增分类' : '编辑分类'}
                    visible={ModalStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddUpdateForm setForm={form => this.form = form} categoryName={category.name}></AddUpdateForm>
                </Modal>
            </Card>
        );
    }
}
export default Category;
