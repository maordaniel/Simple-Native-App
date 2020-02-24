import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import HomeScreen from '../screens/HomeScreen'
import {Transition} from "react-native-reanimated";
import DrawerComponent from "../components/DrawerComponent"
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen"

const MainNavigator = createStackNavigator({
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegistrationScreen,
},
    {
      transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
    initialRouteName: 'Home',defaultNavigationOptions: {header:false}}
);

const DrawerNavigator = createDrawerNavigator({
        Home: {screen: MainNavigator,  navigationOptions: {
        drawerLabel: 'Home',
      }}
},{ drawerWidth:170,contentComponent: DrawerComponent});


const AppNavigator = createSwitchNavigator({
    HOME: DrawerNavigator,
  }
);



const RootContainer = createAppContainer(AppNavigator);

export default RootContainer;



