import {StackNavigator} from 'react-navigation';
import LoginScreen from '../components/Login/Login';
import SplashScreen from '../components/Splash/Splash';
import {
    Easing,
    Animated
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
    }
},
{
    transitionConfig: TransitionConfiguration
});