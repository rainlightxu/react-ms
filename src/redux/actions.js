
import {INCREMENT,DECREMENT} from './actions-types.js'

export const increment = (number) => ({ type: INCREMENT, number: number })

export const decrement = (number) => ({ type: DECREMENT, number: number })

export function incrementAsync (number) {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment(number))
        }, 1000);
    }
}