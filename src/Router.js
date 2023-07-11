import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import colors from './styles/colors';

import Login from './Pages/AuthPages/Login';
import Register from './Pages/AuthPages/Register';

import Home from './Pages/StackPages/Home';
import Schedules from './Pages/StackPages/Schedules';
import Seats from './Pages/StackPages/Seats';
import Details from './Pages/StackPages/Details';
import Payment from './Pages/StackPages/Payment';
import PaymentSuccess from './Pages/StackPages/PaymentSuccess';
import MyTickets from './Pages/StackPages/MyTickets';

const Stack = createStackNavigator();

const LoginPages = () => {
  return (
    <Stack.Navigator screenOptions={LoginPagesOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Router = () => {
  const [userSession, setUserSession] = useState();
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={RouterOptions}>
        {!userSession ? (
          <Stack.Screen name="LoginPages" component={LoginPages} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
        <Stack.Screen name="Schedules" component={Schedules} />
        <Stack.Screen name="Seats" component={Seats} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="MyTickets" component={MyTickets} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;

const LoginPagesOptions = () => ({
  headerShown: false,
});

const RouterOptions = () => ({
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
});
