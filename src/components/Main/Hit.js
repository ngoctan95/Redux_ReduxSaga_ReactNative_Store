import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,
    FlatList
} from 'react-native';
import {
    connectInfiniteHits
} from 'react-instantsearch/connectors';
class Hit extends Component{
    constructor(props){
        super(props);

    }
    componentWillMount(){

    }
    onEndReached=()=>{
        if(this.props.hasMore){
            this.props.refine();
        }
    }
    componentDidMount(){
        // this.props._onCount(9);
    }
    componentWillUpdate(){
        // this.props._onCount(9);
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        //this.props._onCount(nextProps.hits.length);
    }
    _renderItem(item, sectionID, rowID, highlightRow){
        // console.log(item);
        return(
            <View style={{padding:20}}>
                <Text>{rowID}+{item.name}</Text>
                <Text style={{fontStyle:'italic',fontWeight:'bold'}}>Category: {item.category}</Text>
            </View>
        )
    }
    render(){
        // console.log(this.props);
        const ds=new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });
        return(
            // <View style={{flex:1,position:'absolute'}}>
            //     {this.props.isHitShow? 

                <ListView 
                    style={{position:'absolute',flex:1}}
                    dataSource={ds.cloneWithRows(this.props.hits)}
                    renderRow={this._renderItem}
                    key={(item,index)=>index.toString()}
                    contentContainerStyle={{flex:1}}
                    //onEndReached={this.onEndReached}
                    enableEmptySections={true}
                    scrollEnabled={true}
                    />
                    // :null
            //     }
            // </View>
        )
    }
}
export default connectInfiniteHits(Hit);