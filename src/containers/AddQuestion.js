import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {COLORS} from '../constants/theme';
import {createQuestion} from '../generic/database';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddQuestion = props => {
  const [currQuizId, setCurrQuizId] = useState(props.route.params.currQuizId);
  const [currQuizTitle, setCurrQuizTitle] = useState(
    props.route.params.currQuizTitle,
  );
  const [imageUri, setImageUri] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const saveQuestion = async () => {
    if (
      question == '' ||
      correctAnswer == '' ||
      optionTwo == '' ||
      optionThree == '' ||
      optionFour == ''
    ) {
      return;
    }
    let currQuestionId = Math.floor(100000 + Math.random() * 9000).toString();

    //Upload Image
    let imageUrl = '';

    if (imageUri != '') {
      const reference = storage().ref(
        `/images/questions/${currQuizId}_${currQuestionId}`,
      );

      await reference.putFile(imageUri).then(() => {
        console.log('Image Uploaded');
      });
      imageUrl = await reference.getDownloadURL();
    }

    await createQuestion(currQuizId, currQuestionId, {
      question,
      correct_answer: correctAnswer,
      incorrect_answers: [optionTwo, optionThree, optionFour],
      imageUrl,
    });
    ToastAndroid.show('Question Saved', ToastAndroid.SHORT);

    setQuestion('');
    setCorrectAnswer('');
    setOptionTwo('');
    setOptionThree();
    setOptionFour();
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({assets}) => {
        if (assets && assets.length > 0) {
          setImageUri(assets[0].uri);
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: COLORS.black,
            }}>
            Add Question
          </Text>
          <Text style={{textAlign: 'center', marginBottom: 20}}>
            For {currQuizTitle}
          </Text>
          <Input
            labelText="Add Question"
            placeholderText="enter Question"
            onChangeText={val => setQuestion(val)}
            value={question}
          />
          {/* Image Upload */}
          {imageUri == '' ? (
            <TouchableOpacity
              onPress={selectImage}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                backgroundColor: COLORS.primary + '20',
              }}>
              <Text style={{opacity: 0.5, color: COLORS.primary}}>
                +add Images
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{uri: imageUri}}
              resizeMode={'cover'}
              style={{width: '100%', height: 200, borderRadius: 5}}
            />
          )}

          <View style={{marginTop: 30}}>
            <Input
              labelText="Correct Answer"
              onChangeText={val => setCorrectAnswer(val)}
              value={correctAnswer}
            />
            <Input
              labelText="Option 2"
              onChangeText={val => setOptionTwo(val)}
              value={optionTwo}
            />
            <Input
              labelText="Option 3"
              onChangeText={val => setOptionThree(val)}
              value={optionThree}
            />
            <Input
              labelText="Option 4"
              onChangeText={val => setOptionFour(val)}
              value={optionFour}
            />
            <Button labelText="Save Question" onSubmit={saveQuestion} />
            <Button
              labelText="Done & Go Home"
              isPrimary={false}
              onSubmit={() => {
                setCurrQuizId('');
                props.navigation.navigate('Home');
              }}
              style={{
                marginVertical: 20,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddQuestion;
