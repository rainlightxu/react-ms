import React, { Component } from 'react';
import { PageHeader, Card, Form, Input, Button, Select, message, InputNumber, notification } from 'antd'
import { reqCategorys, reqAddProduct,reqUpdateProduct } from '../../api/index.js'
import UploadImg from '../../components/upload-image/UploadImg.jsx'
import RichTextEditor from '../../components/rich-text-editor/RichTextEditor.jsx'
const Option = Select.Option
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 8 },
};
class AddUpdate extends Component {
    formRef = React.createRef();
    uploadRef = React.createRef();
    editorRef = React.createRef();
    constructor(props) {
        super(props)
    }
    state = {
        categorys: [],
        product: this.props.location.state || {}
    }
    validatePrice = (rule, value) => {
        if (value < 0) {
            return Promise.reject('商品价格应该大于0')
        }
        return Promise.resolve()
    }
    getCategorys = async () => {
        const res = await reqCategorys()
        console.log(res)
        if (res.status === 0) {
            const categorys = res.data
            this.setState({ categorys })
        } else {
            message.error("获取分类列表失败")
        }
    }
    componentDidMount() {
        this.getCategorys();
    }
    onFinish = async values => {
        console.log('Success:', values);
        const {name,desc,price,categoryId} = values
        let imgs = this.uploadRef.current.state.fileList.map(file => {
            if(file.response) {
                return file.response.data.name
            } else {
                return file.name
            }
        })
        console.log(imgs,"--imgs")
        const detail = this.editorRef.current.getDetail()
        console.log(detail)
        let product = {name,desc,price,categoryId,imgs:imgs,detail}
        let res
        if(this.isUpdate) {
            product = Object.assign({},product,{_id:this.state.product._id})
            res = await reqUpdateProduct(product)
        } else {
            res = await reqAddProduct(product)
        }
        if (res.status === 0) {
            console.log(res)
            notification.success({
                message: "成功",
                description: this.isUpdate ? "修改商品成功" : "添加商品成功"
            })
            if(this.isUpdate) {
                //更新product
                this.setState({product})
                this.props.history.replace("/product")

            } else {
                //重置表单
                this.formRef.current.resetFields();
                //imgs置空//detail置空
                this.setState({product:{}})
                this.props.history.replace("/product")

            }
        } else {
            message.error(this.isUpdate ? "修改商品失败" : "修改商品失败")
        }
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const { categorys, product } = this.state
        this.isUpdate = !!product._id
        const title = (
            <PageHeader
                className="site-page-header"
                onBack={() => this.props.history.goBack()}
                title={this.isUpdate ? "修改商品" : "新增商品"}
            />
        )
        return (
            <Card title={title} className="detail">
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    initialValues={{
                        name: product.name,
                        desc: product.desc,
                        price: product.price,
                        categoryId: product.categoryId || '',
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[{ required: true, message: '请输入商品名称!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="商品描述"
                        name="desc"
                        rules={[{ required: true, message: '请输入商品描述!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name="price"
                        rules={[{ required: true, message: '请输入商品价格!' }, { validator: this.validatePrice }]}
                    >
                        <Input type="number" addonAfter="元" />
                        {/* <InputNumber min={1} max={10} /> */}
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name="categoryId"
                        rules={[{ required: true, message: '请选择商品分类!' }]}
                    >
                        <Select>
                            <Option value=''>---请选择---</Option>
                            {categorys.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="商品图片"
                    >
                        <UploadImg ref={this.uploadRef} initialImgs={product.imgs}/>
                    </Form.Item>
                    <Form.Item
                        label="商品详情"
                        wrapperCol={ {span:20} }
                    >
                        <RichTextEditor ref={this.editorRef} initialImgs={product.detail} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default AddUpdate;
