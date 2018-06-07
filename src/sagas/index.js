import authen from './AuthenticationSaga';
const rootSaga=function* rootSaga(){
    yield[
        authen()
    ]
};
export default rootSaga;