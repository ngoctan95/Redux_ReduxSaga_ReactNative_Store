import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    connectSearchBox,
    connectInfiniteHits,
    connectRefinementList,
    connectStats,
    connectMenu,
    connectSortBy,
    connectRange,
    connectCurrentRefinements,
  } from 'react-instantsearch/connectors';
import {InstantSearch} from 'react-instantsearch/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from './Category';
import Hit from './Hit';

const {width,height} = Dimensions.get("window");
class Main extends Component{
    constructor(props){
        super(props);
        this.state=({
            searchState:this.props.searchState?this.props.searchState:{
                menu:{category: "Decoration"}
            },
            endAnimatedView:false,
        })
    }
    componentWillMount(){
        console.log("main",this.props);
        this.valAnimViewBackground = new Animated.Value(0);
    }
    componentDidMount(){
        const animViewBackground = Animated.timing(
            this.valAnimViewBackground,
            {
                duration:750,
                toValue:width/3,
                easing:Easing.linear
            }
        )
        Animated.parallel([animViewBackground]).start((end)=>{
            this.setState({
                endAnimatedView:true
            })
        });
    }
    componentWillUpdate(nextProps){
        console.log(nextProps);
    }
    render(){
        console.log(this.props);
        console.log("state search",this.state.searchState);
        return(
            <View style={styles.mainContainer}>
                <Animated.View style={{
                    position:'absolute',
                    //right:this.valAnimViewBackground,
                    flex:1,
                    width:this.valAnimViewBackground,
                    height:height,
                    justifyContent:'flex-start',
                    backgroundColor:'#6abd45',
                }}>
                    <TouchableOpacity style={{marginTop:Platform.OS==="ios"?34:0,marginLeft:10}}>
                        <Icon name="ios-menu" size={25} style={{padding:10}}/>
                    </TouchableOpacity>
                    
                </Animated.View>
                <View style={styles.backgroundAnimated}>
                        <InstantSearch
                                appId="latency"
                                apiKey="6be0576ff61c053d5f9a3225e2a90f76"
                                indexName="ikea"
                                searchState={this.state.searchState}>
                                {/* This make the sense for animated in sequence */}
                                {this.state.endAnimatedView?
                                <Category attribute="category" />:null
                                }
                                <Hit />
                                <VirtualRefinementList attribute="type"/>
                        </InstantSearch>
                    </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#ffffff',
        overflow:'hidden',
        height:height*2
    },
    backgroundAnimated:{
        flex:1,
        position:'absolute',
        top:75,
        bottom:0,
        borderRadius:10
    }
})
const VirtualRefinementList = connectRefinementList(() => null);
export default Main;