import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {COLORS} from '../constants/theme';
import {signUp} from '../generic/auth';

const SignUp = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = () => {
    if (email != '' && password != '' && confirmPassword != '') {
      signUp(email, password);
    } else {
      alert('Passwords did not match');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          color: COLORS.white,
          fontWeight: 'bold',
          marginVertical: 32,
        }}>
        Sign Up
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
        secureTextEntry={true}
      />
      <Input
        labelText="Confirm Password"
        placeholderText="Enter your password again"
        onChangeText={value => setConfirmPassword(value)}
        value={confirmPassword}
        secureTextEntry={true}
      />
      <Button labelText="Sign Up" onSubmit={onSubmit} style={{width: '100%'}} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>Already have an account?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.primary}}
          onPress={() => props.navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
