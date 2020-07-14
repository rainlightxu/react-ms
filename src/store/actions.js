import {reqLogin} from '../api/index'
import storageUtils from '../utils/storageUtils'
import {
    SET_HEADER_TITLE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './actions-types'

export const setHeaderTitle = (headerTitle) => ({type:SET_HEADER_TITLE,data:headerTitle})

export const loginSuccess = (user) => ({type:LOGIN_SUCCESS,user})
export const loginFail = (msg) => ({type:LOGIN_FAIL,msg})

export const logout = () => {
    storageUtils.removeUser()
    return {type:LOGOUT}
}

export function login(username,password) {
    return async dispatch => {
        const res = await reqLogin(username,password)
        if(res.status === 0) {
            const user = res.data
            dispatch(loginSuccess(user))
            storageUtils.saveUser(user);
        } else {
            const msg = res.msg
            dispatch((loginFail(msg)))
        }
    }
}
