import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0
    }
    increment = () => {
        const count = this.state.count + this.refs.step.value * 1
        this.setState({ count })
    }
    decrement = () => {
        const count = this.state.count - this.refs.step.value * 1
        this.setState({ count })
    }
    incrementIfOdd = () => {
        let count = this.state.count
        if (count % 2 === 1) {
            count = this.state.count + this.refs.step.value * 1
            this.setState({ count })
        }
    }
    incrementAsync = () => {
        setTimeout(() => {
            const count = this.state.count + this.refs.step.value * 1
            this.setState({ count })
        }, 1000);
    }
    render() {
        const { count } = this.state
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
