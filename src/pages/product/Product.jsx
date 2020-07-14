import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductList from './Home.jsx'
import ProductDetail from './Detail.jsx'
import ProductAddUpdate from './AddUpdate.jsx'
import './Product.less'
class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" exact component={ProductList}></Route>
                <Route path="/product/detail/:id" component={ProductDetail}></Route>
                <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        );
    }
}

export default Product;