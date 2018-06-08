import * as actionTypes from '../actions/types';
const INITIALSTATE={
    isLoading:false,
    userName:'',
    passWord:'',
    error:'',
    userInfo:'',
    isLoading:false,
};
export default (state=INITIALSTATE,action)=>{
    switch(action.type){
        case actionTypes.SIGNUP_REQUEST:{
            return{
                isLoading:true,
                userName:action.userName,
                passWord:action.passWord
            }
        }
        case actionTypes.LOADING_REQUEST:{
            return{
                isLoading:action.isLoading,
            }
        }
        case actionTypes.SIGNUP_FAIL:{
            return{
                error:action.error,
                isLoading:false
            }
        }
        case actionTypes.SIGNUP_SUCCESS:{
            return{
                userInfo:action.data,
                isLoading:false
            }
        }
        default:
        return state;
    }
}