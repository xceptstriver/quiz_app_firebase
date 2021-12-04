import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import {COLORS} from '../constants/theme';
import {signOut} from '../generic/auth';
import {getQuizes} from '../generic/database';

const Home = props => {
  const [allQuizes, setAllQuizes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllQuizes();
  }, []);

  const getAllQuizes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizes();

    let tmpQuizData = [];
    await quizzes.docs.forEach(async quiz => {
      await tmpQuizData.push({id: quiz.id, ...quiz.data()});
    });
    await setAllQuizes([...tmpQuizData]);

    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          elevation: 4,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 20, color: COLORS.black}}>Quizz App!</Text>
        <Text
          onPress={signOut}
          style={{fontSize: 20, padding: 10, color: COLORS.error}}>
          LogOut
        </Text>
      </View>
      {/* Quiz List */}
      <FlatList
        data={allQuizes}
        onRefresh={getAllQuizes}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 20,
        }}
        renderItem={({item: quiz}) => (
          <View
            style={{
              padding: 20,
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              elevation: 2,
            }}>
            <View style={{flex: 1, paddingRight: 10}}>
              <Text style={{fontSize: 18, color: COLORS.black}}>
                {quiz.title}
              </Text>
              {quiz.description != '' ? (
                <Text style={{opacity: 0.5}}>{quiz.description}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('PlayQuiz', {
                  quizId: quiz.id,
                })
              }
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 50,
                backgroundColor: COLORS.primary + '20',
              }}>
              <Text style={{color: COLORS.primary}}>Play</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        labelText="Create Quiz"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 50,
          paddingHorizontal: 30,
        }}
        onSubmit={() => props.navigation.navigate('CreateQuiz')}
      />
    </SafeAreaView>
  );
};

export default Home;
