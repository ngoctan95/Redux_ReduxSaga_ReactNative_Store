import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,TextInput,
    Dimensions,
    Platform,
    Keyboard,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width,height} = Dimensions.get("window");
import logo from '../../assets/images/future.png';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import * as actions from '../../actions/Authentication';
import {connect} from 'react-redux';
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            isSecurePass:true,
            isShowUser:false,
            isShowPass:false,
            isCreateAccount:false,
            email:'tannn@nustechnology.com',
            password:'12345x@X'
        }
    }
    componentWillMount(){
        console.log(this.props);
        this.valMarTopLogo =new Animated.Value(-100);
        this.valVisibleUser=new Animated.Value(0);
        this.valVisiblePass=new Animated.Value(0); 
        this.valBtnSignIn=new Animated.Value(0);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.authenticationReducer!=null){
            const {email,password,error}=nextProps.authenticationReducer;
            if(error!=null){
                alert(error.message);
            }
            //tannn@nustechnology.com
        }
    }
    componentWillUpdate(nextProps){
        //console.log(nextProps);
    }
    componentDidMount(){
        const animMarTopLogo = Animated.timing(
            this.valMarTopLogo,
            {
                duration:1000,
                easing:Easing.circle,
                toValue:34
            }
        )
        const animVisibleUser=Animated.timing(
            this.valVisibleUser,
            {
                duration:100,
                easing:Easing.ease,
                toValue:1
            } 
        )
        const animVisiblePass=Animated.timing(
            this.valVisiblePass,
            {
                duration:100,
                easing:Easing.ease,
                toValue:1
            }
        )
        const animBtnSignIn=Animated.timing(
            this.valBtnSignIn,
            {
                duration:100,
                easing:Easing.in,
                toValue:1
            }
        )
        Animated.stagger(100,[animMarTopLogo,animVisibleUser,animVisiblePass,animBtnSignIn]).start();
    }
    _loginRequest=()=>{
        console.log(this.state);
        this.props.loginRequest(this.state.email,this.state.password);
    }
    _toggleIsSecurePass=()=>{
        this.setState({
            isSecurePass:!this.state.isSecurePass
        })
    }
    _toggleIsCreateAccount=()=>[
        this.setState({
            isCreateAccount:!this.state.isCreateAccount
        })
    ]
    render(){
        return(
            <ScrollView>
            <View style={styles.mainContainer}>
                <LinearGradient 
                        colors={['#EB8F70','#1F1505']} 
                        style={styles.linearGradient}>
                        <Animated.Image source={logo} style={{
                              marginTop:Platform.OS==="ios"?this.valMarTopLogo:0,
                              width:width*2/3,
                              height:height/4,
                              alignSelf:'center',
                              marginBottom:height/20,
                        }}/>
                        <Animated.View style={{
                            flexDirection:'row',
                            borderColor:'#4b4a6d',
                            marginTop:20,
                            borderRadius:5,
                            borderBottomWidth:1,
                            height:height/15,
                            marginLeft:10,
                            marginRight:10,
                            justifyContent:'flex-start',
                            alignItems:'center',
                            alignContent:'center',
                            opacity:this.valVisibleUser
                        }}> 
                            <View style={styles.viewIcon}>
                                <Icon name="ios-contact" size={40} ios="ios-contact" md="md-contact" />
                            </View>
                            <TextInput style={styles.textInput} placeholderTextColor={"#cccdd1"}
                                placeholder={"Email here"}
                                maxLength={30}
                                returnKeyType="next"
                                onSubmitEditing={()=>this.passInput.focus()}
                                onChangeText={(text)=>this.setState({ email:text})}/>
                        </Animated.View>
                        <Animated.View style={{
                            flexDirection:'row',
                            borderColor:'#4b4a6d',
                            marginTop:20,
                            borderRadius:5,
                            borderBottomWidth:1,
                            height:height/15,
                            marginLeft:10,
                            marginRight:10,
                            justifyContent:'flex-start',
                            alignItems:'center',
                            alignContent:'center',
                            opacity:this.valVisiblePass
                            // transform: [{rotateX: animVisiblePassword},{rotateY: animVisiblePassword}]
                            }}>
                            <View style={styles.viewIcon}>
                                <Icon name="ios-lock" size={40} ios="ios-lock" md="md-lock" />
                            </View>
                            <TextInput style={styles.textInput} placeholderTextColor={"#cccdd1"}
                                ref={(ref)=>{this.passInput=ref}}
                                placeholder={"Password here"}
                                maxLength={20}
                                onChangeText={(text)=>{this.setState({ password:text})}}
                                secureTextEntry={this.state.isSecurePass}
                                returnKeyType={this.state.isCreateAccount?"next":"done"}
                                onSubmitEditing={()=>{this.state.isCreateAccount?this.phoneInput.focus():null}}/>
                            <View style={{position:'absolute',left:width-50}} >
                                    <TouchableOpacity
                                        onPress={this._toggleIsSecurePass}>
                                        <Icon name={this.state.isSecurePass?"ios-eye-off":"ios-eye"}
                                                size={30} />
                                    </TouchableOpacity>
                            </View>
                        </Animated.View>
                        {this.state.isCreateAccount?
                            <Animated.View style={{
                                flexDirection:'row',
                                borderColor:'#4b4a6d',
                                marginTop:20,
                                borderRadius:5,
                                borderBottomWidth:1,
                                height:height/15,
                                marginLeft:10,
                                marginRight:10,
                                justifyContent:'flex-start',
                                alignItems:'center',
                                alignContent:'center',
                                opacity:this.valVisiblePass
                            }}>
                                <View style={styles.viewIcon}>
                                    <Icon name="ios-call" size={40} ios="ios-call" md="md-call" />
                                </View>
                                <TextInput style={styles.textInput} placeholderTextColor={"#cccdd1"}
                                    ref={(ref)=>{this.phoneInput=ref}}
                                    placeholder={"Your phone number here"}
                                    maxLength={20}
                                    secureTextEntry={this.state.isSecurePass}
                                    returnKeyType="done"/>
                            </Animated.View>
                            :
                            null
                        }
                        <Animated.View style={{
                            backgroundColor:'#f85c23',
                            marginLeft:10,
                            marginRight:10,
                            borderColor:'#f85c23',
                            borderRadius:10,
                            marginTop: height/15,
                            opacity:this.valBtnSignIn
                        }}>
                            <TouchableOpacity
                                disabled={this.props.authenticationReducer.isLoading}
                                onPress={!this.state.isCreateAccount?this._loginRequest:this._signUpRequest}>
                                {!this.props.authenticationReducer.isLoading?
                                <Text style={styles.btnSignIn}>{this.state.isCreateAccount?"Sign Up":"Sign In"}</Text>
                                :
                                <ActivityIndicator style={{justifyContent:'center',padding:17}} animating={this.props.authenticationReducer.isLoading}/>
                                }
                            </TouchableOpacity> 
                        </Animated.View>
                        <Animated.View style={{
                             marginLeft:10,
                             marginRight:10,
                             marginTop: height/10,
                             opacity:this.valBtnSignIn
                        }}> 
                            <TouchableOpacity 
                                onPress={this._toggleIsCreateAccount}>
                                <Text style={styles.btnCreate}>{this.state.isCreateAccount?"I got an account, let me sign in!":"Create Account"}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={{
                            marginLeft:10,
                            marginRight:10,
                            marginTop:2,
                            opacity:this.valBtnSignIn
                        }}>
                            <TouchableOpacity>
                                <Text style={styles.btnCreate}>Need help?</Text>
                            </TouchableOpacity>
                        </Animated.View>
                </LinearGradient>
                </View>
            </ScrollView>
        )
    }
}
const styles=StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    linearGradient:{
        flex:1,
        width:width,
        height:height
    },
    containerTextInput:{
        flexDirection:'row',
        borderColor:'#4b4a6d',
        marginTop:20,
        borderRadius:5,
        borderBottomWidth:1,
        height:height/10,
        marginLeft:10,
        marginRight:10,
        justifyContent:'flex-start',
        alignItems:'center',
        alignContent:'center'
    },
    labelInput:{
         padding:10,
        alignSelf:'center',
        justifyContent:'flex-start',
        alignItems:'center',
        color:'white'
    },
    textInput:{
        flex:5,
        alignItems:'center',
        color:'white',
        fontSize:17,
    },
    imgLogo:{
        top:this.valMarTopLogo,
        // marginTop:Platform.OS==="ios"?this.valMarTopLogo:0,
        width:width*2/3,
        height:height/4,
        alignSelf:'center',
        marginBottom:height/15,
    },
    viewIcon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5,
        marginTop:2,
        marginRight:20
    },
    btnSignIn:{
        justifyContent:'center',
        alignSelf:'center',
        color:'white',
        padding:17,
        fontSize:17
    },
    btnCreate:{
        justifyContent:'center',
        alignSelf:'center',
        color:'white',
        padding:2,
        fontSize:17
    },
    containerSignIn:{
        backgroundColor:'#f85c23',
        marginLeft:10,
        marginRight:10,
        borderColor:'#f85c23',
        borderRadius:10,
        marginTop: height/15
    },
    containerCreateAcc:{
        marginLeft:10,
        marginRight:10,
        marginTop: height/10,
    },
    containerNeedHelp:{
        marginLeft:10,
        marginRight:10,
        marginTop:2
    }
})
const mapStateToProps=({state,authenticationReducer})=>{
    console.log("login",authenticationReducer);
    return {
        state,
        authenticationReducer
    }
}
export default connect(mapStateToProps,actions)(Login);