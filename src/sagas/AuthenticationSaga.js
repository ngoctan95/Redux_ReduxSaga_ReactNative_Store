"use strict";
import * as actionsType from '../actions/types';
import { put, takeEvery,call} from 'redux-saga/effects';
import firebase from 'firebase';
import {requestAPI} from '../services/index';
import * as actions from '../actions/index';

export function* watchAuthenAsync(action){
    console.log(action);
    try{
        yield put(actions.loadingLoginRequest());
        let signinResponse = yield call(requestAPI.getAuthenticationSignIn,action.email,action.password)
        
        yield put(actions.loginSuccess(signinResponse))
    }catch(err){
        console.log("loi",err)
        yield put(actions.loginFail(err))
    }
}
const watchAuthen= function* watchAuthen(){
    yield takeEvery(actionsType.LOGIN_REQUEST,watchAuthenAsync)

}
export default watchAuthen;