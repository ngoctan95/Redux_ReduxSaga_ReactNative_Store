import React, {Component} from 'react';
import  {
    connectHierarchicalMenu
} from 'react-instantsearch/connectors';
import {
    View,
} from 'react-native';
class HierrachicalMenu extends Component{
    render(){
        console.log(this.props);
        return(
            <View>
                
            </View>
        )
    }
}
export default connectHierarchicalMenu(HierrachicalMenu);