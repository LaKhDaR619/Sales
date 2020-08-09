import {put, call} from 'redux-saga/effects';
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from '../../BL/dbRequests';
import {Alert, Animated, Dimensions} from 'react-native';

const animation = (val, toval, dur, cb) => {
  return Animated.timing(val, {
    toValue: toval,
    duration: dur,
    useNativeDriver: true,
  }).start(cb);
};

export function* getAllCategoriesSaga(action) {
  yield put({type: 'SET_CATEGORIES_LOADING'});

  const newAction = yield call(async () => {
    try {
      const categories = await getAllCategories();

      const finalCategories = categories.map(element => {
        // duplicationg some values for item picker and adding the animation value
        element = {
          ...element,
          xAnimVal: new Animated.Value(0),
          id: element.ID_CAT,
          name: element.DESCRIPTION_CAT,
        };
        return element;
      });

      return {
        type: 'GET_CATEGORIES_SUCCESS',
        payload: {categories: finalCategories},
      };
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Geting The Categories');
      return {type: 'GET_CATEGORIES_FAILED'};
    }
  });

  yield put(newAction);
}

export function* addCategorySaga(action) {
  console.log(action.payload);
  const {categories, categorieDescription, listRef} = action.payload;

  const newAction = yield call(async () => {
    try {
      const insertId = await addCategory(categorieDescription);

      const newData = [
        {
          ID_CAT: insertId,
          DESCRIPTION_CAT: categorieDescription,
          id: insertId,
          name: categorieDescription,
          xAnimVal: new Animated.Value(Dimensions.get('window').width - 150),
        },
        ...categories,
      ];

      // Scrolling to The Top of ListView
      listRef.current._listView.scrollToOffset({
        animated: true,
        offset: 0,
      });

      // Animating The add
      animation(newData[0].xAnimVal, 0, 500);

      return {type: 'ADD_CATEGORY_SUCCESS', payload: {categories: newData}};
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Adding This Category');
      return {type: 'ADD_CATEGORY_FAILED'};
    }
  });

  yield put(newAction);
}

export function* deleteCategorySaga(action) {
  const {id, index, categories} = action.payload;

  const newAction = yield call(async () => {
    try {
      const rowsAffected = await deleteCategory(id);

      if (rowsAffected) {
        // awaiting the animation with a promise
        return await new Promise((resolve, reject) => {
          animation(categories[index].xAnimVal, -450, 500, () => {
            // deleting from the list after the animation is over
            const newData = [...categories];
            newData.splice(index, 1);

            resolve({
              type: 'DELETE_CATEGORY_SUCCESS',
              payload: {categories: newData},
            });
          });
        });
      } else {
        Alert.alert('There was a Problem Deleting This Category');
        return {type: 'DELETE_CATEGORY_FAILED'};
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.startsWith('FOREIGN KEY')) {
        Alert.alert(
          'There Are Products Linked to This Category, Please delete Them First',
        );
      } else Alert.alert('There was a Problem Deleting This Category');
      return {type: 'DELETE_CATEGORY_FAILED'};
    }
  });

  yield put(newAction);
}
