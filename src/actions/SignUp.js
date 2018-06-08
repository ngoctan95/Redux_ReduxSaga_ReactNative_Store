import {
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from './types';

export const signUpRequest=(email,password)=>{
    return{
        type:SIGNUP_REQUEST,
        email,
        password
    }
}
export const signUpFail=(error)=>{
    return{
        type:SIGNUP_FAIL,
        error
    }
}
export const signUpSuccess=(data)=>{
    return{
        type:SIGNUP_SUCCESS,
        data
    }
}