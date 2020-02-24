import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'#d4eaff',
        direction:'ltr'
    },
    boxContainer:{
        height: 100,
        justifyContent: 'center',
        margin:10,
        direction:'ltr'
    },
    h1:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 0.996,
        color: '#66788A',
        textAlign:'right',
        flexDirection:'row-reverse'
    },
    h2:{
        textAlign:'left',
        top:5,
        left:'30%',
        color:'rgba(42,47,57,0.75)',
        textShadowColor:'rgba(102,120,138,0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontSize:30
    },
    icon_background:{
        position: 'absolute',
        left: 20,
        width: 45,
        height:45
    },
    icon:{
        position: 'absolute',
        width: 18,
        height: 18,
        left: 33
    },

});

export default styles;
