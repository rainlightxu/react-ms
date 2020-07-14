import React, { Component } from 'react';
import PropTypes from 'prop-types'
class Counter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
    }
    increment = () => {
        const count = this.props.count + this.refs.step.value * 1
        this.props.increment(count)
    }
    decrement = () => {
        const count = this.props.count - this.refs.step.value * 1
        this.props.decrement(count)
    }
    incrementIfOdd = () => {
        let count = this.props.count
        if (count % 2 === 1) {
            count = this.props.count + this.refs.step.value * 1
            this.props.increment(count)
        }
    }
    incrementAsync = () => {
        const count = this.props.count + this.refs.step.value * 1
        this.props.incrementAsync(count)
    }
    render() {
        const count = this.props.count
        return (
            <div style={{ height: '100%' }}>
                <div>
                    <h3>click {count} times</h3>
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
