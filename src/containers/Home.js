import React from 'react';
import {Text} from 'react-native';
import {signOut} from '../generic/auth';

const Home = () => {
  return (
    <>
      <Text>Home Screen</Text>
      <Text onPress={signOut}>LOGOUT</Text>
    </>
  );
};

export default Home;
