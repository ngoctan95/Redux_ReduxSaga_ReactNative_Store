import AuthenticationReducer from '../reducers/AuthenticationReducer';
import SignUpReducer from '../reducers/SignUpReducer';

import firebase from 'firebase';
import createSagaMiddleware from 'redux-saga';
import {
    put,
    take,
    call
} from 'redux-saga/effects';
import logger from 'redux-logger';
import { compose, applyMiddleware,createStore, combineReducers } from 'redux';
import Sagas from '../sagas/index'

/**Middleware */
const sagaMiddleware = createSagaMiddleware();
/**Create middleware*/
const middleWare=[sagaMiddleware,logger];

/**Create initialize firebase */
firebase.initializeApp ({
    apiKey: "AIzaSyDp3OznL6zkBtsC7H8NWSoy-Q-9EfsQ-q4",
    authDomain: "test-1e152.firebaseapp.com",
    databaseURL: "https://test-1e152.firebaseio.com",
    projectId: "test-1e152",
    storageBucket: "test-1e152.appspot.com",
    messagingSenderId: "832931310283"
  });

  /**Add redux firebase to compose. */
const createStoreWithFirebase=compose(applyMiddleware(...middleWare))(createStore);

/**Combine reducers to one */
let rootReducer=combineReducers({
    signUpReducer:SignUpReducer,
    authenticationReducer:AuthenticationReducer,
   
})

const initialState={};
export default createStoreWithFirebase(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(Sagas);
