import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    connectInfiniteHits
} from 'react-instantsearch/connectors';
class Hit extends Component{
    render(){
        console.log(this.props);
        return(
            <View>
                
            </View>
        )
    }
}
export default connectInfiniteHits(Hit);