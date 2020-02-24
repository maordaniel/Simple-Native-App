import React from 'react';
import {View, TouchableOpacity, Platform, Text, ScrollView} from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from "../styles/AppStyle";
import {connect} from 'react-redux';
import {GetData} from "../services/api";
import {logout} from "../redux/actions/auth_actions";


function DrawerComponent(props) {
    const { navigate } = props.navigation;

    const logout = async () =>{
        await GetData('/logout');
        props.logout();
    };
    return(
    <ScrollView>
        <View style={[  { backgroundColor: '#d4eaff' }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                <Avatar size='medium' rounded icon={{ name: 'user', type: 'font-awesome', size: 30 }}/>
                <Text style={{...styles.h1,fontSize:15, marginTop: '3%',
                    fontFamily: Platform.OS === 'ios' ? null : 'sans-serif-condensed'}}>Hey
                    {props.auth.username ? ` ${props.auth.username} 👋` : " Guest 👋"}
                </Text>
                {!props.auth.isLogged?
                    <Text style={{...styles.h1,fontSize:15, marginTop: '13%', marginBottom: '10%',
                        fontFamily: Platform.OS === 'ios' ? null : 'sans-serif-condensed'}}
                      onPress={()=> navigate('Login')}>Login</Text>
                    :
                    <Text style={{...styles.h1,fontSize:12, marginTop: '13%', marginBottom: '10%',
                        fontFamily: Platform.OS === 'ios' ? null : 'sans-serif-condensed'}}
                      onPress={()=> logout()}>
                        Logout
                    </Text>
                }
            </View>
        </View>
        <TouchableOpacity onPress={()=> navigate('Home')}>
            <View style={{paddingLeft:10,flexDirection:'row',marginTop: '10%'}}>
                <Avatar size='small' rounded icon={{ name: 'home', type: 'font-awesome', size: 20 }}/>
                <Text style={{...styles.h1,fontSize:15,top:5}} >Home</Text>
            </View>
        </TouchableOpacity>
    </ScrollView>
    )
}

const mapStateToProps = state => {
    return{
        auth: state.auth_reducers
    }
};


export default connect(mapStateToProps,{logout})(DrawerComponent);
