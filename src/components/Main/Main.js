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
    connectHierarchicalMenu,
  } from 'react-instantsearch/connectors';
import {InstantSearch} from 'react-instantsearch/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from './Category';
import Hit from './Hit';
import HierrachicalMenu from './Hierrachical';

const {width,height} = Dimensions.get("window");
class Main extends Component{
    constructor(props){
        super(props);
        this.state=({
            searchState:this.props.searchState?this.props.searchState:{},
            endAnimatedView:false,
            count:0,
            isHitShow:false
        })
    }
    _onSearchStateChange=(nextState)=>{
        const newSearchState={...this.state.searchState,...nextState};
        // console.log(this.state);
        // console.log(nextState);
        var a=JSON.stringify(nextState);
        this.setState({
            searchState: {...this.state.searchState,...nextState},
            isHitShow:true
        })
        console.log(this.state.searchState);
    }
    _onCount=(countTotal)=>{
        this.setState({
            count:countTotal
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
    componentWillReceiveProps(nextProps){
        console.log("main_will_receive",nextProps);
    }
    _onPressIconLeftHeader=()=>{
        this.setState({
            isHitShow:!this.state.isHitShow,
            endAnimatedView:!this.state.endAnimatedView
        });
        console.log(this.state);
    }
    render(){
        console.log(this.state.searchState);
        // console.log("state search",this.state.searchState);
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

                    <TouchableOpacity style={{marginTop:Platform.OS==="ios"?34:0,marginLeft:10}}
                        onPress={()=>{
                            this.setState({ 
                                isHitShow:!this.state.isHitShow,
                                // endAnimatedView:!this.state.endAnimatedView
                                })}
                            }>
                        <Icon name={!this.state.isHitShow?"ios-menu":"ios-backspace-outline"} size={25} style={{padding:10}}/>
                    </TouchableOpacity>
                    
                </Animated.View>
                <Text style={{color:'black'}}>{this.state.count}</Text>
                <View style={styles.backgroundAnimated}>
                        <InstantSearch
                                appId="latency"
                                apiKey="6be0576ff61c053d5f9a3225e2a90f76"
                                indexName="ikea"
                                onSearchStateChange={this._onSearchStateChange}
                                searchState={this.state.searchState}>
                                {this.state.endAnimatedView 
                                &&
                                    !this.state.isHitShow?
                                <Category attribute="category" onSearchStateChange={this._onSearchStateChange}/>
                                :
                                <Hit _onCount={this._onCount} isHitShow={this.state.isHitShow}/>
                                }

                                
                                <VirtualRefinementList attribute="type"/>
                                <VirtualMenu attribute="category" />
                                />
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
        // flex:1,
        position:'absolute',
        // overflow:'hidden',
        top:75,
        bottom:0,
        borderRadius:10
    }
})
const VirtualRefinementList = connectRefinementList(() => null);
const VirtualMenu=connectMenu(()=>null);
// const VirtualHierachicalMenu=connectHierarchicalMenu(()=>null);
export default Main;