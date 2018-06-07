import {
    LOGIN_REQUEST,
    LOADING_LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT_REQUEST,
    LOADING_LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from './types';

/**Login section */
export const loginRequest=(email,password)=>{
    return {
        type:LOGIN_REQUEST,
        email:email,
        password:password
    }
};

export const loginSuccess=(data)=>{
    return{
        type: LOGIN_SUCCESS,
        data
    }
};
export const loadingLoginRequest=(isLoading)=>{
    return{
        type:LOADING_LOGIN_REQUEST,
        isLoading:true
    }
}
export const loginFail=(error)=>{
    return{
        type:LOGIN_FAIL,
        error
    }
};

/**Logout section */
export const logoutRequest=(token)=>{
    return {
        type:LOGOUT_REQUEST,
        token
    }
};
export const logoutSuccess=({res})=>{
    return {
        type:LOGOUT_SUCCESS,
        res
    }
}