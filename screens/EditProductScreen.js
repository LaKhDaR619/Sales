import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ActivityIndicator, Alert} from 'react-native';

import {Input, Button, CheckBox, Text} from 'react-native-elements';

import MyDropPicker from '../Components/MyDropPicker';

import {connect} from 'react-redux';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import BarCodeScan from '../Components/BarCodeScan';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../Components/Header';

function EditProductScreen({
  navigation,
  // categories
  categories,
  categoriesLoading,
  getAllCategories,
  // products
  products,
  editProduct,
  route,
  words,
}) {
  const pageWords = words.addProductScreen;

  const [barCode, setBarCode] = useState('');

  const [selectedCat, setSelectedCat] = useState();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [inputs, setInputs] = useState({
    label: '',
    price: '',
    qte: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    label: '',
    price: '',
    qte: '',
  });

  const [showCam, setShowCam] = useState(false);
  const [torch, setTorch] = useState(false);

  const [id, setId] = useState();
  const [index, setIndex] = useState();

  useFocusEffect(
    React.useCallback(() => {
      route.params.firstRender = false;
      setSelectedCat(route.params.selectedCat);
      setSelectedLabel(route.params.selectedLabel);
      setBarCode(route.params.barcode);
      setInputs(route.params.inputs);
      setId(route.params.id);
      setIndex(route.params.index);
    }, [route]),
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    console.log('route.params');
    console.log(route.params);
  });

  // input Stuff
  const checkInputs = () => {
    // made this because if i set the state to many times in a row it will only take the last one
    let tempErrors = {
      label: '',
      price: '',
      qte: '',
    };

    // label
    if (inputs.label.length < 1) {
      tempErrors = {
        ...tempErrors,
        label: pageWords.errlabel,
      };
    }

    //price
    if (inputs.price.length < 1) {
      tempErrors = {
        ...tempErrors,
        price: pageWords.errprice1,
      };
    } else if (isNaN(inputs.price)) {
      tempErrors = {
        ...tempErrors,
        price: pageWords.errprice2,
      };
    }

    //qte
    if (inputs.qte.length < 1) {
      tempErrors = {
        ...tempErrors,
        qte: pageWords.errqte1,
      };
    } else if (isNaN(inputs.qte)) {
      tempErrors = {
        ...tempErrors,
        qte: pageWords.errqte2,
      };
    }

    setErrorMessages(tempErrors);

    if (
      tempErrors.label !== '' ||
      tempErrors.price !== '' ||
      tempErrors.qte !== '' ||
      !selectedCat
    ) {
      return false;
    } else return true;
  };

  const handleEditProduct = () => {
    if (checkInputs()) {
      // if everything is good now we edit the product
      editProduct(
        products,
        id,
        index,
        barCode,
        inputs.label,
        inputs.price,
        inputs.qte,
        selectedCat,
      );
    }
  };

  const onBarCodeRead = (e, playSound) => {
    if (!barCode) {
      playSound();
      setBarCode(e.data);
      setTorch(false);
      setShowCam(false);
    }
  };

  if (categoriesLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );

  let firstCamShow = true;

  return (
    <View style={styles.container}>
      <Header title="Edit Proudct" hideDrawerButton={true} />
      <MyDropPicker
        items={categories}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
        setValue={setSelectedCat}
        placeholder={words.addUserScreen.selectcat}
      />
      {barCode ? (
        <TouchableOpacity
          style={styles.barCodeContainer}
          onLongPress={() => {
            Alert.alert(
              pageWords.resetbarcode1,
              pageWords.resetbarcode2,
              [
                {
                  text: words.cancel,
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: words.ok,
                  onPress: () => setBarCode(''),
                },
              ],
              {cancelable: true},
            );
          }}>
          <Text style={{fontSize: 22}}>{barCode}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.barCodeContainer}
          onPress={() => {
            if (showCam) {
              if (firstCamShow) firstCamShow = false;
              else setTorch(!torch);
            }
          }}
          onLongPress={() => {
            setTorch(false);
            setShowCam(false);
          }}>
          {showCam ? (
            <BarCodeScan torch={torch} onBarCodeRead={onBarCodeRead} />
          ) : (
            <View>
              <Button
                title={pageWords.usebarcode}
                onPress={() => {
                  firstCamShow = true;
                  setShowCam(true);
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      )}

      <Input
        placeholder={words.label}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputStyle}
        value={`${inputs.label}`}
        errorMessage={errorMessages.label}
        errorStyle={{textAlign: 'center'}}
        onChangeText={e => {
          setErrorMessages({
            ...errorMessages,
            label: '',
          });
          setInputs({
            ...inputs,
            label: e,
          });
        }}
      />
      <Input
        placeholder={words.price}
        keyboardType="numeric"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputStyle}
        value={`${inputs.price}`}
        errorMessage={errorMessages.price}
        errorStyle={{textAlign: 'center'}}
        onChangeText={e => {
          setErrorMessages({
            ...errorMessages,
            price: '',
          });
          if (isNaN(e)) return;
          setInputs({
            ...inputs,
            price: e,
          });
        }}
      />
      <Input
        placeholder={pageWords.qtestock}
        keyboardType="numeric"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputStyle}
        value={`${inputs.qte}`}
        errorMessage={errorMessages.qte}
        errorStyle={{textAlign: 'center'}}
        onChangeText={e => {
          setErrorMessages({
            ...errorMessages,
            qte: '',
          });
          if (isNaN(e)) return;
          setInputs({
            ...inputs,
            qte: e,
          });
        }}
      />
      <Button
        title={words.editproduct}
        containerStyle={styles.addButtonContainer}
        onPress={handleEditProduct}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    // products
    products: state.products.products,
    // categories
    categories: state.categories.categories,
    categoriesLoading: state.categories.categoriesLoading,
    // settings
    words: state.settings.words,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // categories
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
    // products
    editProduct: (products, id, index, barcode, label, price, qte, id_cat) =>
      dispatch({
        type: 'EDIT_PRODUCT',
        payload: {products, id, index, barcode, label, price, qte, id_cat},
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barCodeContainer: {
    margin: 5,
    marginTop: 10,
    height: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {height: 30, marginTop: 10},
  inputStyle: {
    textAlign: 'center',
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingBottom: 25,
  },
});
