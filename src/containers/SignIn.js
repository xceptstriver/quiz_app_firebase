import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {COLORS} from '../constants/theme';
import {signIn} from '../generic/auth';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (email != '' && password != '') {
      signIn(email, password);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: 'bold',
          marginVertical: 32,
        }}>
        Sign In
      </Text>
      <Input
        labelText="Email"
        placeholderText="Enter your email"
        onChangeText={value => setEmail(value)}
        value={email}
        keyboardType={'email-address'}
      />
      <Input
        labelText="Password"
        placeholderText="Enter your password"
        onChangeText={value => setPassword(value)}
        value={password}
        keyboardType={'password'}
        secureTextEntry={true}
      />

      <Button labelText="Submit" onSubmit={onSubmit} style={{width: '100%'}} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>Don't have an account?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.primary}}
          onPress={() => props.navigation.navigate('SignUp')}>
          Create account
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
