import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

export const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('Logged In', ToastAndroid.SHORT);
    })
    .catch(err => {
      console.log('error signIn', err);
    });
};

export const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('Signed Up', ToastAndroid.SHORT);
    })
    .catch(err => {
      console.log('error signUp', err);
    });
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => {
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    })
    .catch(err => {
      console.log('catch err', err);
    });
};
