import React, {useEffect} from 'react';
import {
    Text,
    SafeAreaView,
    StatusBar
} from "react-native";
import {PostData} from "../services/api"
import styles from "../styles/AppStyle";
import {connect} from 'react-redux';
import AppBar from "../components/AppBar";
import RNAlert from "@qiqi715/react-native-alert/src/Alert"
import {login, username} from "../redux/actions/auth_actions";
import AppBox from "../components/AppBox";



function HomeScreen(props) {
    useEffect(() =>{
        networkConnection()
        },[]);

    const networkConnection = async() => {
        try {
            if (props.auth.authLoginDetails !== null){
                const res = await PostData('/login', props.auth.authLoginDetails);
                if(res.status === 201){
                    props.login();
                    props.username(res.data['name']);
                }
            }
        }catch {
          RNAlert.alert(    'No internet connection!',
          'Please try again..',
                      [
           {text: 'Try again', onPress: () => networkConnection()},
            {text: 'Cancel', onPress: () => console.log('cancel Pressed')},
              ],
            );
        }
    };
    return(
        <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.screen}>
            <AppBar navigation={props.navigation}/>
            {props.auth.isLogged ?
                <AppBox>
                    <Text style={{textAlign:'center'}}>Welcome back {props.auth.username}</Text>
                </AppBox>
                : null
            }
        </SafeAreaView>
        </>
    )
}


const mapStateToProps = state => {
    return{
        auth: state.auth_reducers
    }
};


export default connect(mapStateToProps, {login, username})(HomeScreen);
