import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImg } from '../../api';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    static propTypes = {
        imgs: PropTypes.array
    }
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: []
        // [{uid:this.props.initialImgs[0],name:this.props.initialImgs[0],
        // status:'done',url:'http://localhost:5000/upload/' + this.props.initialImgs[0]}]
        // [
        //     {
        //         uid: '-1',
        //         name: 'image.png',
        //         status: 'done',
        //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //       },
        // ],
    };
    getInitialImgs = () => {
        //较低级写法：
        /*
        let objArr = []
        this.props.initialImgs.forEach(item => {
            let obj = {}
            obj.uid = item
            obj.name = item
            obj.status = "done"
            obj.url = 'http://localhost:5000/upload/' + item
            objArr.push(obj)
        })
        this.setState({fileList:objArr})
        */
        //高级写法：
        const imgs = this.props.initialImgs
        console.log(imgs)
        if(imgs) {

            const fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: 'http://localhost:5000/upload/' + img
            }))
            this.setState({ fileList })
        }
    }
    componentWillMount() {
        this.getInitialImgs()
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = async ({ file, fileList }) => {
        console.log(file, fileList)
        let res
        if (file.status === "done") {
            //上传图片
            if (file.response.status === 0) {
                message.success("上传图片成功")
            } else {
                message.error("上传图片失败")
            }
        } else if (file.status === "removed") {
            //删除图片
            if (file.response) {
                res = await reqDeleteImg(file.response.data.name)
            } else {
                res = await reqDeleteImg(file.name)
            }
            if (res.status === 0) {
                message.success("删除图片成功")
            } else {
                message.error("删除图片失败")
            }
        }
        this.setState({ fileList })
    };
    render() {
        const getImgs = () => this.state.fileList.map(file => file.response.data.name)
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload"
                    name="image"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
