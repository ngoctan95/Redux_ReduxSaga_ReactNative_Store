import {surl} from '../utils/Constant';
import firebase from 'firebase';
/**Define function for request api */
function request(url, method, isAsync){
    return new Promise((resolve,reject)=>{
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange=function Success(){
            if(this.readyState === xmlHttpRequest.DONE){
                // console.log(xmlHttpRequest.responseText);
                resolve(xmlHttpRequest.responseText);
            }
        };
        /**Open connection for requesting. */
        xmlHttpRequest.open(method,url,isAsync);
        xmlHttpRequest.send();
        xmlHttpRequest.onerror = function(err){
            reject(err);
        };
    });
}
/**Authorize firebase */
function _getAuthenticationSignIn(username,password){
    return new Promise((resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(username,password)
            .then(res=>{
                return res;
            })
            
            .then(responseJson=>{
                return responseJson;
            })
            .catch((err)=>{
                // console.log(err);
                reject(err);
            })
    })
}
export const requestAPI={
    getAuthenticationSignIn(username,password){
        return _getAuthenticationSignIn(username,password);
    },
    getProducts(){
        return request(surl,"GET",true);
    }
}