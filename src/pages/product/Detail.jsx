import React, { Component } from 'react';
import { Card, message, PageHeader, List, Typography } from 'antd';
import { reqProductDetailById, reqCategoryById } from '../../api';
const { Item } = List
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            info: {}
        }
    }
    getProductDetailById = async (pid) => {
        const res = await reqProductDetailById(pid)
        if (res.status === 0) {
            console.log(res)
            const info = res.data
            this.setState({ info })
            return Promise.resolve({ status: 0 })
        } else {
            message.error("获取商品详情失败")
            return Promise.resolve({ status: 1 })
        }
    }
    getCategoryById = async (cid) => {
        const res = await reqCategoryById(cid)
        if (res.status === 0) {
            console.log(res)
            const categoryName = res.data.name
            this.setState({ info: Object.assign({}, this.state.info, { categoryName }) })
        }
    }
    async componentDidMount() {
        // 根据商品id获取商品信息用then
        // this.getProductDetailById(this.state.id).then(res => {
        //     console.log(res)
        //     if(res.status === 0) {
        //         //根据分类id获取分类信息
        //         this.getCategoryById(this.state.info.categoryId)
        //     }
        // })
        // 根据商品id获取商品信息用await
        const res = await this.getProductDetailById(this.state.id)
        if (res.status === 0) {
            console.log(res)
            //根据分类id获取分类信息
            this.getCategoryById(this.state.info.categoryId)
        }
    }
    handleImgsForShow = (imgs) => {
        // const imgList = ['image-1593494216913.jpg','image-1593525212866.png','image-1593524916789.png','image-1593516184647.jpg','image-1593516276792.png','image-1593524779848.png']
        if(imgs) {

            return imgs.map(img => <img key={img} src={"http://localhost:5000/upload/" + img} alt="img"></img>)
        } else {
            return null
        }
        
    }
    render() {
        const { id, info } = this.state
        const title = (
            <PageHeader
                className="site-page-header"
                onBack={() => this.props.history.goBack()}
                title="商品详情"
            />
        )
        return (
            <Card title={title} className="detail">
                <List
                    bordered
                >
                    <Item className="item"><span className="detail-item-key">商品名称：</span><span className="detail-item-value">{info.name}</span></Item>
                    <Item className="item"><span className="detail-item-key">商品描述：</span><span className="detail-item-value">{info.desc}</span></Item>
                    <Item className="item"><span className="detail-item-key">商品价格：</span><span className="detail-item-value">￥{info.price}</span></Item>
                    <Item className="item"><span className="detail-item-key">商品分类：</span><span className="detail-item-value">{info.categoryName}</span></Item>
                    <Item className="item"><span className="detail-item-key">商品图片：</span><span className="detail-item-value">{this.handleImgsForShow(info.imgs)}</span></Item>
                    <Item className="item"><span className="detail-item-key">商品详情：</span><span className="detail-item-value" dangerouslySetInnerHTML={{ __html: info.detail }}></span></Item>
                </List>
            </Card>
        );
    }
}

export default Detail;
