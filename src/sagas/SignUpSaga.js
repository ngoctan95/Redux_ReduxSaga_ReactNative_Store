import * as actionTypes from '../actions/types';
import {
    put,call,takeEvery
} from 'redux-saga/effects';
import {requestAPI} from '../services/index';
import  * as actions from '../actions/index';

export function* watchSignUpAsync(action){
    try{
        yield put(actions.loadingRequest());
        let responseResult= yield call(requestAPI.signUpNewAccount,action.email,action.password);
        yield put(actions.signUpSuccess(responseResult));
    }catch(err){
        yield put(actions.signUpFail(err));
    }
}
const watchSignUp = function* watchSignUp(){
    yield takeEvery(actionTypes.SIGNUP_REQUEST,watchSignUpAsync);
}
export default watchSignUp;
