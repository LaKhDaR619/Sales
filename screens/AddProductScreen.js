import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';

import {Input, Button, CheckBox, Text} from 'react-native-elements';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

import MyDropPicker from '../Components/MyDropPicker';

import {connect} from 'react-redux';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import BarCodeScan from '../Components/BarCodeScan';

function AddProductScreen({
  navigation,
  // categories
  categories,
  categoriesLoading,
  getAllCategories,
  // products
  products,
  addProduct,
  // settings
  words,
}) {
  const smallWindow = Dimensions.get('window').height < 620 ? true : false;

  const pageWords = words.addProductScreen;

  // remove later
  const [barCode, setBarCode] = useState(null);

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
  const [emptyFields, setEmptyFields] = useState(false);

  const [showCam, setShowCam] = useState(false);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, []);

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

  const handleAddProduct = () => {
    if (checkInputs()) {
      // if everything is good now we add the product
      addProduct(
        products,
        // pur back the bar code
        barCode,
        inputs.label,
        inputs.price,
        inputs.qte,
        selectedCat,
      );

      // TODO check if it affects the adding
      setBarCode(null);
      if (emptyFields) {
        setInputs({
          label: '',
          price: '',
          qte: '',
        });
      }
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
  else if (categories.length === 0) {
    // TODO style this later
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, textAlign: 'center', paddingBottom: 20}}>
          {pageWords.cantadd}
        </Text>
        <TouchableOpacity onPress={() => navigation.jumpTo('Categories')}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              color: 'blue',
            }}>
            {pageWords.gotocats}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    if (!selectedCat) {
      setSelectedLabel(categories[0].name);
      setSelectedCat(categories[0].id);
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 4, paddingVertical: 10}}>
        <MyDropPicker
          items={categories}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          setValue={setSelectedCat}
          placeholder={words.addUserScreen.selectcat}
        />
        <View style={styles.barCodeContainer}>
          {barCode ? (
            <View
              style={[
                styles.center,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <Text style={{fontSize: 22}}>{barCode}</Text>
              <FA5Icon
                name="redo"
                size={25}
                color="grey"
                style={{paddingTop: 5}}
                onPress={() => {
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
                        onPress: () => setBarCode(null),
                      },
                    ],
                    {cancelable: true},
                  );
                }}
              />
            </View>
          ) : (
            <View style={{flex: 1}}>
              {showCam ? (
                <View style={styles.center}>
                  <BarCodeScan torch={torch} onBarCodeRead={onBarCodeRead} />
                  <AntDesign
                    style={styles.close}
                    name="close"
                    size={25}
                    color="red"
                    onPress={() => {
                      setTorch(false);
                      setShowCam(false);
                    }}
                  />
                  <Ionicons
                    style={styles.flash}
                    name="flashlight-sharp"
                    size={25}
                    color="white"
                    onPress={() => setTorch(!torch)}
                  />
                </View>
              ) : (
                <View style={styles.center}>
                  <Button
                    title={pageWords.usebarcode}
                    onPress={() => setShowCam(true)}
                  />
                </View>
              )}
            </View>
          )}
        </View>

        <Input
          placeholder={words.label}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          value={inputs.label}
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
        <View
          style={{
            flexDirection: smallWindow ? 'row' : 'column',
          }}>
          <Input
            placeholder={words.price}
            keyboardType="numeric"
            containerStyle={{width: smallWindow ? '50%' : '100%'}}
            inputStyle={{textAlign: 'center'}}
            value={inputs.price}
            errorMessage={errorMessages.price}
            errorStyle={{textAlign: 'center'}}
            onChangeText={e => {
              setErrorMessages({
                ...errorMessages,
                price: '',
              });
              if (e == '');
              else if (isNaN(e) || e < 1) return;
              setInputs({
                ...inputs,
                price: e,
              });
            }}
          />
          <Input
            placeholder={pageWords.qtestock}
            keyboardType="numeric"
            containerStyle={{width: smallWindow ? '50%' : '100%'}}
            inputStyle={styles.inputStyle}
            value={inputs.qte}
            errorMessage={errorMessages.qte}
            errorStyle={{textAlign: 'center'}}
            onChangeText={e => {
              setErrorMessages({
                ...errorMessages,
                qte: '',
              });
              if (e == '');
              else if (isNaN(e) || e < 0) return;
              setInputs({
                ...inputs,
                qte: e,
              });
            }}
          />
        </View>
      </View>

      <View style={styles.addButtonContainer}>
        <CheckBox
          title={pageWords.emptyfields}
          size={30}
          containerStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
            paddingBottom: 5,
            borderColor: 'transparent',
          }}
          textStyle={{color: 'grey'}}
          checked={emptyFields}
          onPress={() => setEmptyFields(!emptyFields)}
        />
        <Button title={pageWords.addproduct} onPress={handleAddProduct} />
      </View>
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
    addProduct: (products, barcode, label, price, qte, id_cat) =>
      dispatch({
        type: 'ADD_PRODUCT',
        payload: {products, barcode, label, price, qte, id_cat},
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProductScreen);

const styles = StyleSheet.create({
  barCodeContainer: {
    marginHorizontal: 5,
    height: '40%',
    overflow: 'hidden',
  },
  inputStyle: {
    textAlign: 'center',
  },
  addButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  close: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  flash: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
});
