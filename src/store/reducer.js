import {combineReducers} from 'redux'
import StorageUtils from '../utils/storageUtils.js'
import {
    SET_HEADER_TITLE,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './actions-types'

const initHeaderTitle = ['首页']
function headerTitle(state = initHeaderTitle,action) {
    console.log(state)
    switch(action.type) {
        case SET_HEADER_TITLE:{
            return action.data
        }
        default:{
            return state
        }
    }
}

const initUser  = StorageUtils.getUser()
function user(state = initUser,action) {
    console.log(state)

    switch(action.type) {
        case LOGIN_SUCCESS: {
            return action.user
        }
        case LOGIN_FAIL: {
            return {...state,msg:action.msg}
        }
        case LOGOUT: {
            return {}
        }
        default:{
            return state
        }
    }
}

export default combineReducers({
    headerTitle,
    user
})