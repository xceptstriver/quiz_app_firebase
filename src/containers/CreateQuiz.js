import React, {useState} from 'react';
import {SafeAreaView, Text, ToastAndroid} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {COLORS} from '../constants/theme';
import {createQuiz} from '../generic/database';

const CreateQuiz = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSaveQuiz = async () => {
    //save to firestore
    try {
      const currQuizId = Math.floor(100000 + Math.random() * 9000).toString();
      await createQuiz(currQuizId, title, description);
      props.navigation.navigate('AddQuestion', {
        currQuizId,
        title,
      });
      setTitle('');
      setDescription('');
      ToastAndroid.show('Quiz Saved', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Something went wrong!!', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
      }}>
      <Text
        style={{
          marginVertical: 20,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: COLORS.black,
        }}>
        Create Quiz
      </Text>
      <Input
        labelText="Title"
        placeholderText="Enter Quiz Title"
        onChangeText={value => setTitle(value)}
        value={title}
      />
      <Input
        labelText="Description"
        placeholderText="Enter Quiz Description"
        onChangeText={value => setDescription(value)}
        value={description}
      />
      <Button labelText="Save Quiz" onSubmit={onSaveQuiz} />
      <Button
        labelText="navigate to Question"
        style={{marginVertical: 20}}
        onSubmit={() => {
          props.navigation.navigate('AddQuestion', {
            currQuizId: '101864',
            currQuizTitle: 'Demo Quiz',
          });
        }}
      />
    </SafeAreaView>
  );
};

export default CreateQuiz;
