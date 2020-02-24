import React from 'react';
import {View, TouchableOpacity, Platform, StyleSheet, Button} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


function AppBar(props) {
    return(
        <View style={{...styles.arrow}} >
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Icon
                name={Platform.OS === 'ios' ? "ios-menu" : "md-menu" }
                onPress={() => props.navigation.openDrawer()}
                size={30}/>
            </TouchableOpacity>
        </View>
    )
}

export default AppBar;


const styles = StyleSheet.create({
   arrow:{
       alignItems: "flex-start",
       paddingLeft: 20,
       marginBottom:10,

   }
});
