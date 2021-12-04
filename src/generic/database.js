import firestore from '@react-native-firebase/firestore';

export const createQuiz = (currQuizId, title, description) => {
  return firestore().collection('Quizzes').doc(currQuizId).set({
    title,
    description,
  });
};

export const createQuestion = (currQuizId, currQuestionId, question) => {
  return firestore()
    .collection('Quizzes')
    .doc(currQuizId)
    .collection('QNA')
    .doc(currQuestionId)
    .set(question);
};

export const getQuizes = () => {
  return firestore().collection('Quizzes').get();
};

export const getQuizById = currQuizId => {
  return firestore().collection('Quizzes').doc(currQuizId).get();
};

export const getQuestionsByQuizId = currQuizId => {
  return firestore()
    .collection('Quizzes')
    .doc(currQuizId)
    .collection('QNA')
    .get();
};
