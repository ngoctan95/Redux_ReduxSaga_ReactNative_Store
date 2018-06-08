import authen from './AuthenticationSaga';
import signUp from './SignUpSaga'
const rootSaga=function* rootSaga(){
    yield[
        authen(),
        signUp(),
    ]
};
export default rootSaga;