import React, {Component} from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    Image,
    Easing
} from 'react-native';
import logo from '../../assets/images/future.png' ;
import LinearGradient from 'react-native-linear-gradient';
const {width,height} = Dimensions.get("window");
class Splash extends Component{
    componentWillMount(){
        this.valLogo = new Animated.Value(height/2);
        console.log(this.props);
    }
    componentDidMount(){
        const animLogo=Animated.timing(
            this.valLogo,
            {
                duration:1000,
                toValue:-200,
                easing:Easing.in
            }
        )
        Animated.sequence([animLogo]).start((end)=> this.props.navigation.navigate('LoginScreen'));
    } 
    render(){
        const animSpinLogo =  this.valLogo.interpolate(
            {
            inputRange:[0,1,2,3,4],
            outputRange:['0deg','25deg','45deg','75deg','90deg']
            }
        ) 
        return( 
            <View style={styles.mainContainer}>
                <LinearGradient 
                        colors={['#EB8F70','#1F1505']} 
                        style={styles.mainContainer}>

                    <Animated.Image source={logo} style={{
                        width:width*2/3,
                        height:height/4,
                        alignSelf:'center', 
                        top:this.valLogo,
                        transform: [{rotateX: animSpinLogo},{ rotateY:animSpinLogo}]
                    }}/>
                </LinearGradient>
            </View>
        ) 
    }
}
const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
    // justifyContent:'center'
    },
    image:{
        width:width*2/3,
        height:height/4,
        alignSelf:'center',
    }
})
export default Splash;