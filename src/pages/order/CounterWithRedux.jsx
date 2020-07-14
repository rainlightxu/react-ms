import React, { Component } from 'react';
import {increment,decrement} from '../../redux/actions.js'
import PropTypes from 'prop-types'
class Counter extends Component {
    static propTypes = {
        store:PropTypes.object.isRequired
    }
    increment = () => {
        const count = this.props.store.getState() + this.refs.step.value * 1
        this.props.store.dispatch(increment(count))
    }
    decrement = () => {
        const count = this.props.store.getState() - this.refs.step.value * 1
        this.props.store.dispatch(decrement(count))
    }
    incrementIfOdd = () => {
        let count = this.props.store.getState()
        if (count % 2 === 1) {
            count = this.props.store.getState() + this.refs.step.value * 1
            this.props.store.dispatch(increment(count))
        }
    }
    incrementAsync = () => {
        setTimeout(() => {
            const count = this.props.store.getState() + this.refs.step.value * 1
            this.props.store.dispatch(increment(count))
        }, 1000);
    }
    render() {
        const  count  = this.props.store.getState()
        return (
            <div style={{ height: '100%' }}>
                <div>
                    <h3>click {this.props.store.getState()} times</h3>
                    <select ref="step">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                    <button onClick={this.incrementAsync}>increment async</button>
                </div>
            </div>
        );
    }
}
export default Counter;
