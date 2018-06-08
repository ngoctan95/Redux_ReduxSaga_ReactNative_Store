import {combineReducers} from 'redux';
import auth from './AuthenticationReducer';
import signUp from './SignUpReducer';
export default combineReducers({
    auth,
    signUp,
})