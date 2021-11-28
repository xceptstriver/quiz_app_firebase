import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../containers/Home';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import auth from '@react-native-firebase/auth';

const AppStack = createStackNavigator();

const Routes = () => {
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = async user => {
    await setCurrUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }

  const AuthStackNavigator = () => {
    return (
      <>
        <AppStack.Screen name="SignIn" component={SignIn} />
        <AppStack.Screen name="SignUp" component={SignUp} />
      </>
    );
  };

  const HomeStackNavigator = () => {
    return <AppStack.Screen name="Home" component={Home} />;
  };

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {currUser ? HomeStackNavigator() : AuthStackNavigator()}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
