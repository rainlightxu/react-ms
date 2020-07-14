import {INCREMENT,DECREMENT} from './actions-types.js'
export default function count(state = 1,action) {
    console.log("count()",state,action)
    switch(action.type) {
        case INCREMENT: {
            return state = state + action.number
        }
        case DECREMENT : {
            return state = state - action.number
        }
        default : {
            return state
        }
    }
}