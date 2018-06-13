import {StackNavigator} from 'react-navigation';
import LoginScreen from '../components/Login/Login';
import SplashScreen from '../components/Splash/Splash';
import MainScreen from '../components/Main/Main';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {
    Easing,
    Animated,
    TouchableOpacity
} from 'react-native';

let TransitionConfiguration = () => {
    return {
        screenInterpolator: (sceneProps) => {

            const {position, scene} = sceneProps;
            const {index} = scene;

            return MyTransition(index, position);
        }
    }
};
let MyTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange: [1, 1, 1],
    }); 

    const scaleY = position.interpolate({
        inputRange,
        outputRange: ([1, 1, 1]), 
    });

    return {
        opacity,
        transform: [
            {scaleY}
        ]
    };
};
export default StackNavigator({
    SplashScreen:{
        screen:SplashScreen,
        navigationOptions:{
            header:null,
        },
    },
    LoginScreen:{
        screen:LoginScreen,
        navigationOptions:{
            header:null, 
        }
    },
    MainScreen:{
        screen:MainScreen,
        navigationOptions:{
             header:null,
            title:'Main',
            
            // headerTrasnsparent:true,
        }
    }
},
{
    transitionConfig: TransitionConfiguration
});