import React from 'react'
import {connect} from 'react-redux'
import CounterWithReactRedux from '../components/CounterWithReact-Redux.jsx'
import { increment,decrement,incrementAsync } from '../../../redux/actions.js'

//低级写法
// const mapStateToProps = (state) => ({
//     count:state
// })
// const mapDispatchToProps = (dispatch) => ({
//     increment:(number) => {dispatch(increment(number))},
//     decrement:(number) => {dispatch(decrement(number))}
// })
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CounterWithReactRedux)

//高级写法
export default connect(
    state => ({count:state}),
    {increment,decrement,incrementAsync}
)(CounterWithReactRedux)