import React,{Component} from 'react';
import {
    TextInput,
    View,
    FlatList,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    ListView,
    Image,
    TouchableOpacity,
    Animated,Easing,
    AsyncStorage
} from 'react-native';
import {
    connectInfiniteHits,
    connectStats,
    connectMenu,
    connectRefinementList,
    // connectHierarchicalMenu
} from 'react-instantsearch/connectors';
import Icon from 'react-native-vector-icons/Ionicons'
// import {connectHierarchicalMenu} from 'react-instantsearch/src/connectors/connectHierarchicalMenu';
const {width,height} =Dimensions.get("window");
var imgList=[
    {
        'id':1,
        'name':'decoration',
        'url':require('../../assets/images/decoration.png')
    },
    {
        'id':2,
        'name':'rug',
        'url':require('../../assets/images/rug.png')
    },
    {
        'id':3,
        'name':'lighting',
        'url':require('../../assets/images/lighting.jpeg')
    },
    {
        'id':4,
        'name':'eating',
        'url':require('../../assets/images/eating.png')
    },
    {
        'id':5,
        'name':'winter',
        'url':require('../../assets/images/winter.png')
    },
    {
        'id':6,
        'name':'storage',
        'url':require('../../assets/images/storage.png')
    },
    {
        'id':7,
        'name':'kitchen',
        'url':require('../../assets/images/kitchen.jpg')
    },
    {
        'id':8,
        'name':'bathroom',
        'url':require('../../assets/images/bathroom.png')
    },
    {
        'id':9,
        'name':'cooking',
        'url':require('../../assets/images/cooking.png')
    },
    {
        'id':10,
        'name':'dining',
        'url':require('../../assets/images/dining.png')
    },
]
class Category extends Component{
    componentWillMount(){
        this.valAnimMainViewItem=new Animated.Value(0);
        this.valAnimImg =new Animated.Value(0);
        this.valAnimBtn=new Animated.Value(0);
        // AsyncStorage.sa
        console.log(this.props);
    }
    componentDidMount(){
        const animMainViewItem=Animated.timing(
            this.valAnimMainViewItem,{
                duration:1000,
                toValue:30,
                easing:Easing.linear,
            }
        )
        const animImg=Animated.timing(
            this.valAnimImg,{
                duration:1000,
                toValue:10,
                easing:Easing.linear,
            }
        )
        const animBtn=Animated.timing(
            this.valAnimBtn,{
                duration:1000,
                toValue:10,
                easing:Easing.linear,
            }
        )
        Animated.stagger(100,[animMainViewItem,animBtn,animImg]).start();
    }
    _onCategoryPressed=(item)=>{
        // console.log(item);
        // let menu='{category:"';
        // menu=menu+item.label+'"'+"}";
        // const menu =JSON.parse(string);
        // console.log(menu);
        this.props.refine(item.label);
    }
    _renderItem=(item, sectionID, rowID, highlightRow)=>{
        return(
            <TouchableOpacity style={styles.containerViewItem} onPress={()=>this._onCategoryPressed(item)}>
                <Animated.View style={{
                    flexDirection:'column',
                    padding:this.valAnimMainViewItem,
                    marginBottom:10,
                    backgroundColor:'#ffffff',
                    shadowColor:'#000000',
                    shadowOffset:{width:5,height:5},
                    shadowRadius:10,
                    borderRadius:10, 
                    borderColor:'#f4e7dd',
                    borderWidth:1,
                    width:width-60,
                    marginLeft:30,
                    marginRight:30,
                }}>
                    <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}> {item.label}</Text>
                    <Text style={{left:10}}>({item.count?item.count:0} products)</Text>
                </Animated.View>
                <Animated.Image style={{position:'absolute',left:this.valAnimImg,top:25,
                                    justifyContent:'center',alignItems:'center',alignSelf:'center',alignContent:'center',
                                    width:50, height:50,backgroundColor:'white',borderRadius:15,borderColor:'#f4e7dd',borderWidth:1}} 
                                    source={imgList[rowID].url} />
                 <Animated.View style={{right:this.valAnimBtn,position:'absolute',top:25,elevation:5,backgroundColor:'white',zIndex:10}}>
                    <TouchableOpacity>
                        <Icon color={"#e0be8b"} size={45} name={"ios-arrow-dropright"}/>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        )
    }
    onEndReached=()=>{
        if(this.props.items.hasMore!=null && this.props.items.hasMore){
            this.props.refine();
        }
    }
    render(){
        const ds=new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });
        console.log(this.props);
        return(
            
            <ListView 
            // style={{flex:0}}
                key={(item,index)=>index}
                enableEmptySections={true}
                renderRow={this._renderItem}
                dataSource={ds.cloneWithRows(this.props.items)}/>
                // < VirtualHierachicalMenu />
        )
    }
}
const styles=StyleSheet.create({
    // mainContainerItem:{
    //     position:'relative',
    //     borderColor:'#ffffff',
    //     backgroundColor:'transparent',
    //     flex:1,
    //     width:width,
    //     // borderRadius:10,
    //     // width:width-20,
    //     // marginLeft:10,
    //     // marginRight:10
    // },
    viewItem:{
        flexDirection:'column',
        padding:30,
        marginBottom:10,
        backgroundColor:'#ffffff',
        shadowColor:'#000000',
        shadowOffset:{width:5,height:5},
        shadowRadius:10,
        borderRadius:10,
        borderColor:'#f4e7dd',
        borderWidth:1,
        width:width-60,
        marginLeft:30,
        marginRight:30,
    },
    containerViewItem:{
        // width:width,
        
    }
})
// const VirtualHierachicalMenu=connectHierarchicalMenu(()=>null);
export default connectMenu(Category);