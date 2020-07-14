import React, { Component } from 'react';
import CarouselCom from './Carousel.jsx'
import Counter from './Counter.jsx';
import CounterWithRedux from './CounterWithRedux.jsx';
import CounterContainer from './containers/CounterContainer.jsx';
import store from '../../redux/store.js'
import { Provider } from 'react-redux'
class Order extends Component {

    render() {
        return (
            <div>
                <CarouselCom />
                <Counter></Counter>
                <CounterWithRedux store={store}></CounterWithRedux>
                <Provider store={store}>
                    <CounterContainer></CounterContainer>
                </Provider>
            </div>
        );

    }
}
store.subscribe(() => {
    console.log("refresh()")
})
export default Order;
