import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Animated, ActivityIndicator} from 'react-native';

import CustomSwipeListView from '../Components/CustomSwipeListView';
import Colors from '../assets/Colors';

import {Input, Button, Text} from 'react-native-elements';

import {connect} from 'react-redux';

import globalStyle from '../assets/style';

function CategoriesScreen({
  categories,
  categoriesLoading,
  getAllCategories,
  addCategory,
  deleteCategory,
  words,
}) {
  const pageWords = words.CategoriesScreen;

  const [errorMessage, setErrorMessage] = useState('');
  const [categorieInput, setCategorieInput] = useState('');

  const listRef = React.useRef();

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleAddCategorie = () => {
    // making sure the input isn't empty
    if (!categorieInput) {
      setErrorMessage(pageWords.err1);
      return;
    }

    addCategory(categories, categorieInput, listRef);
    setCategorieInput('');
  };

  // props to CustomList
  const keyExtractor = item => item.ID_CAT.toString();

  const handleDeleteCategorie = (id, index) => {
    deleteCategory(categories, id, index);
  };

  /*const handleEditCategorie = (id, index) => {
    const temp = [...categories];
    temp[index].editable = true;

    //editeCategorie(categories, id, index);
  };*/

  const renderItem = ({item, index}) => {
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{translateX: categories[index].xAnimVal}],
          },
        ]}>
        <Input
          editable={item.editable ? true : false}
          containerStyle={{height: 40}}
          inputContainerStyle={{borderBottomWidth: 0}}
          inputStyle={styles.text}
          value={item.DESCRIPTION_CAT}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        {categoriesLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <CustomSwipeListView
            listRef={listRef}
            listHeader={[pageWords.categories]}
            data={categories}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            delFunc={handleDeleteCategorie}
            //editFunc={handleEditCategorie}
          />
        )}
      </View>
      {categoriesLoading ? null : (
        <View style={styles.addCategorie}>
          <Input
            placeholder={pageWords.category}
            errorMessage={errorMessage}
            errorStyle={{textAlign: 'center'}}
            containerStyle={{height: 55}}
            inputStyle={styles.input}
            value={categorieInput}
            onChangeText={e => {
              setCategorieInput(e);
              setErrorMessage('');
            }}
          />
          <Button
            style={{flex: 1}}
            title={pageWords.addcategory}
            onPress={handleAddCategorie}
          />
        </View>
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    categoriesLoading: state.categories.categoriesLoading,
    categories: state.categories.categories,
    words: state.settings.words,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch({type: 'GET_ALL_CATEGORIES'}),
    addCategory: (categories, categorieDescription, listRef) =>
      dispatch({
        type: 'ADD_CATEGORY',
        payload: {categories, categorieDescription, listRef},
      }),
    deleteCategory: (categories, id, index) =>
      dispatch({
        type: 'DELETE_CATEGORY',
        payload: {categories, id, index},
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesScreen);

const styles = StyleSheet.create({
  ...globalStyle,
  addCategorie: {
    flex: 2,
    marginHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-evenly',
  },
  btnTitle: {
    color: Colors.Cornsilk,
  },
  input: {
    textAlign: 'center',
  },
});
