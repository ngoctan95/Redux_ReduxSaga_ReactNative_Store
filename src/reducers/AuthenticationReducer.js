import * as actions from '../actions/types';
const INITSTATE={
    email:'',
    password:'',
    isLoggedIn:false,
    error:'',
    userInfo:null,
    isLoading:false
}

export default (state = INITSTATE,action)=>{
    switch(action.type){
        case actions.LOGIN_REQUEST:{
            return{
                email:action.email,
                password:action.password,
            }
        }
        case actions.LOADING_REQUEST:{
            return{
                isLoading:action.isLoading,
            }
        }
        case actions.LOGIN_SUCCESS:{
            return{
                ...state,
                isLoggedIn:true,
                userInfo:action.userInfo,
                isLoading:false
            }
        }
        case actions.LOGIN_FAIL:{
            return{
                ...state,
                error:action.error,
                isLoading:false
            }
        }
        
        default:
        return state
    }
}