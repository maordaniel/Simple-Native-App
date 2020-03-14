import React, {useState} from 'react';
import {
    Text,
    StatusBar,
    SafeAreaView,
    Button,
    ScrollView,
} from 'react-native';
import styles from "../styles/AppStyle";
import {connect} from 'react-redux';
import AppBox from "../components/AppBox";
import {TextField} from "react-native-material-textfield";
import {PostData} from "../services/api";
import RNAlert from "@qiqi715/react-native-alert/src/Alert"
import {login,username,authLoginDetails} from "../redux/actions/auth_actions";
import AppBar from "../components/AppBar";


function LoginScreen(props) {
    const { navigate } = props.navigation;
    const [phoneNumber,setPhoneNumber] = useState('');
    const [successPhoneNumber,setSuccessPhoneNumber] = useState(false);
    const [errorPhone,setErrorPhone] = useState('');
    const [password,setPassword] = useState('');
    const [errorPassword,setErrorPassword] = useState('');
    const [successPassword,setSuccessPassword] = useState(false);


    const login = async ()=>{
        if (!successPhoneNumber) {
            setErrorPhone('Phone number is invalid');
        }
        if (!password) {
            setErrorPassword('Please fill in a blank field');
            setSuccessPassword(false);
        }else if (!successPassword){
            setErrorPassword('The password should be a minimum 8 characters');
        }
        if (successPhoneNumber && successPassword){
            setErrorPassword('');
            try{
                const data ={_id:phoneNumber, Password:password};
                const res = await PostData('/login',data);
                if(res.status === 201){
                    props.login();
                    props.username(res.data['name']);
                    props.authLoginDetails(data);
                    RNAlert.alert(
                    res.data['alert'],
                    '',
                    [
                    {
                      text: 'Ok',
                      onPress: () => navigate('Home'),
                    },
                    ],
                    );
                }else {
                    RNAlert.alert(
                    res.data,
                    '',
                    [
                    {
                      text: 'סגור',
                      onPress: () => console.log('canceled'),
                    },
                      ],
                    );
                }
            }catch (e) {
                console.log(e);
            }
        }
    };
    return(
         <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.screen} >
            <ScrollView>
                <AppBar navigation={props.navigation}/>
                <AppBox>
                    <Text style={styles.h1}>Login</Text>
                    <TextField
                    label="Phone Number:"
                    value={phoneNumber}
                    onChangeText={ (phone) => {
                        if (
                            phone.length === 10 &&
                            /^\d+$/.test(phone) &&
                            (phone.startsWith("050") ||
                            phone.startsWith("051") ||
                            phone.startsWith("052") ||
                            phone.startsWith("053") ||
                            phone.startsWith("054") ||
                            phone.startsWith("055") ||
                            phone.startsWith("058"))
                        ){
                            setSuccessPhoneNumber(true);
                            setPhoneNumber(phone);
                            setErrorPhone('');
                        }else {
                            setErrorPhone('');
                            setSuccessPhoneNumber(false);
                        }
                    }}
                    error={errorPhone}
                    baseColor={'#66788A'}
                    tintColor={'black'}
                />
                    <TextField
                    label='Password:'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={ (text) => {
                        setPassword(text);
                        if (text.length < 8){
                            setSuccessPassword(false);
                        }else {
                            setSuccessPassword(true);
                        }
                        setErrorPassword('');
                    }}
                    error={errorPassword}
                    baseColor={'#66788A'}
                    tintColor={'black'}
                />
                <Button title={'Login'} onPress={()=> login()}/>
                <Text style={{margin:10, color:'red'}} onPress={()=> navigate('Register')}>
                    Don't have an account yet? Click here to sign up!
                </Text>
                </AppBox>
            </ScrollView>
        </SafeAreaView>
        </>
    )
}


const mapStateToProps = state => {
    return{
        auth: state.auth_reducers
    }
};

export default connect(
    mapStateToProps,{
        login,
        username,
        authLoginDetails
    })(LoginScreen);
