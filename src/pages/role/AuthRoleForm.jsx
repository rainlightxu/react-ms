import React, { Component } from 'react';
import { Input, Tree } from 'antd'
import menuList from '../../config/menuConfig.js'
const { TreeNode } = Tree
const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                    },
                ],
            },
        ]
    }
]
class AuthRoleForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedKeys:[]
        }
    }
    getCheckedKeys = () => this.state.checkedKeys
    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({checkedKeys})
    };
    getTreeNodes = (menuList) => {
        const treeNodes = menuList.reduce((pre,item) => {
            if(item.children) {
                item.children = item.children.reduce((pre,item) => {
                    pre.push({key:item.path,title:item.title})
                    return pre
                },[])
            }
            pre.push({key:item.path,title:item.title,children:item.children ? item.children : null})
            return pre
        },[])
        this.allTreeNodes = []
        const tree = {}
        tree.key = "all"
        tree.title = "平台权限"
        tree.children = treeNodes
        this.allTreeNodes.push(tree)
    }
    componentWillMount() {
        this.getTreeNodes(menuList)
        this.setState({
            checkedKeys:this.props.role.menus
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checkedKeys:nextProps.role.menus
        })
    }
    render() {
        const { role } = this.props
        const {checkedKeys} = this.state
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center',marginBottom:15 }}>
                    <label style={{ width: 100 }}>当前角色:</label>
                    <Input disabled value={role.name}></Input>
                </div>
                {/* 权限树 */}
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    treeData={this.allTreeNodes}
                />
            </div>
        );
    }
}

export default AuthRoleForm;
