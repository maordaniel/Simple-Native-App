import React, {useState} from 'react';
import {
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Button,
} from 'react-native';
import styles from "../styles/AppStyle";
import AppBox from "../components/AppBox";
import {PostData} from "../services/api";
import {connect} from "react-redux";
import {login,username,authLoginDetails} from "../redux/actions/auth_actions";
import {TextField} from "react-native-material-textfield";
import RNAlert from "@qiqi715/react-native-alert/src/Alert"
import AppBar from "../components/AppBar";


function RegistrationScreen(props) {
    const { navigate } = props.navigation;
    const [phoneNumber,setPhoneNumber] = useState('');
    const [errorPhone,setErrorPhone] = useState('');
    const [successPhoneNumber,setSuccessPhoneNumber] = useState(false);
    const [fullName,setFullName] = useState('');
    const [errorName,setErrorName] = useState('');
    const [password,setPassword] = useState('');
    const [errorPassword,setErrorPassword] = useState('');
    const [successPassword,setSuccessPassword] = useState(false);

    const register = async ()=>{
        if (!fullName) {
            setErrorName('Please fill in a blank field');
        }
        if (!successPhoneNumber) {
                setErrorPhone('Phone number is invalid');
        }
         if (!password) {
            setErrorPassword('Please fill in a blank field');
            setSuccessPassword(false);
        }else if (!successPassword){
            setErrorPassword('The password should be a minimum 8 characters');
        }
        if (successPhoneNumber && successPassword && fullName){
            setErrorPassword('');
            const registerData ={ _id:phoneNumber, Name:fullName, Password:password};
            const loginData ={ _id:phoneNumber, Password:password};
            const res1 = await PostData('/register',registerData);
            if (res1.status === 201) {
                const res2 = await PostData('/login',loginData);
                if(res2.status === 201) {
                    props.login();
                    props.username(res2.data['name']);
                    props.authLoginDetails(loginData);
                }
                RNAlert.alert(
                    res1.data,
                    '',
                    [
                        {
                            text: 'close',
                            onPress: () => navigate('Home'),
                        },
                    ],
                );
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
                    <Text style={styles.h1}>Register</Text>
                     <TextField
                    label='Full Name:'
                    value={fullName}
                    onChangeText={ (text) => {
                        setFullName(text);
                        setErrorName('');
                    }}
                    error={errorName}
                    // textColor={'#66788A'}
                    baseColor={'#66788A'}
                    tintColor={'black'}
                    />
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
                        // textColor={'#66788A'}
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
                        // textColor={'#66788A'}
                        baseColor={'#66788A'}
                        tintColor={'black'}
                    />
                    <Button title={'Register'} onPress={()=> register()}/>
                    <Text style={{margin:10, color:'red'}} onPress={()=> navigate('Login')}>
                    Already have an account ? Click here to login!
                    </Text>
                </AppBox>
            </ScrollView>
        </SafeAreaView>
        </>
    )
}

const mapStateToProps = state =>{
    return{
        auth: state.auth_reducers
    }
};

export default connect(mapStateToProps,
    {login,
    username,
    authLoginDetails})
    (RegistrationScreen);
