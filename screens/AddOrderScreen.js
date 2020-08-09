import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Animated,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Text, Input, Tooltip} from 'react-native-elements';

import globalStyles from '../assets/style';

import BarCodeScan from '../Components/BarCodeScan';
import CustomSwipeListView from '../Components/CustomSwipeListView';

import {getAllProducts} from '../BL/dbRequests';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

const animation = (val, toval, dur, cb) => {
  return Animated.timing(val, {
    toValue: toval,
    duration: dur,
    useNativeDriver: true,
  }).start(cb);
};

async function getAllOrderDetails(
  setOrderDetails,
  setOrderDetailsLoading,
  pageWords,
  itemsRef,
) {
  let length = 0;

  try {
    setOrderDetailsLoading(true);

    const data = await getAllProducts();

    let newData = data.filter(e => e.QTE_IN_STOCK != 0);

    // adding extra stuff and removing any product with 0 in qte
    newData = newData.map(e => {
      return {
        selected: false,
        errorMessage: '',
        ...e,
        QTE: 1,
        DISCOUNT: 0,
        // Price before discount
        AMOUNT: e.PRICE,
        // Price after discount
        TOTAL_AMOUNT: e.PRICE,
        xAnimVal: new Animated.Value(0),
        yAnimVal: new Animated.Value(0),
      };
    });

    length = newData.length;

    setOrderDetails(newData);
  } catch (error) {
    console.log(error.message);
    Alert.alert(pageWords.alert1);
  }

  itemsRef.current = itemsRef.current.slice(0, length);
  setOrderDetailsLoading(false);
}

function AddOrderScreen({
  navigation,
  reset,
  words,
  lang,
  useAnimation,
  setReset,
}) {
  const pageWords = words.addOrderScreen;

  const [orderDetails, setOrderDetails] = useState([]);

  const [torch, setTorch] = useState(false);
  const [barCode, setBarCode] = useState(null);
  const [showCam, setShowCam] = useState(false);

  const [animating, setAnimating] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const [orderDetailsLoading, setOrderDetailsLoading] = useState(true);

  const [total, setTotal] = useState(0);

  const listRef = useRef();
  const itemsRef = useRef([]);

  useFocusEffect(
    React.useCallback(() => {
      if (reset || orderDetailsLoading) {
        getAllOrderDetails(
          setOrderDetails,
          setOrderDetailsLoading,
          pageWords,
          itemsRef,
        );
        setReset(false);
        setSelectedCount(0);
        setTotal(0);
      }
    }, [reset]),
  );

  const calculateAmounts = (o, newQte) => {
    const temp = {...o};
    temp.QTE = newQte;

    // in case of an empty string
    if (newQte == '') {
      temp.AMOUNT = temp.PRICE * 1;
    } else {
      temp.AMOUNT = temp.PRICE * temp.QTE;
    }

    temp.TOTAL_AMOUNT = temp.AMOUNT - (temp.DISCOUNT * temp.AMOUNT) / 100;

    return temp;
  };

  const calculateTotal = (arr, selectedC) => {
    let tot = 0;

    for (let i = 0; i < selectedC; i++) {
      tot += parseInt(arr[i].TOTAL_AMOUNT);
    }
    setTotal(tot);
  };

  const handleChangeText = (qte, index) => {
    const temp = [...orderDetails];
    temp[index].QTE = qte;
    // this first if is so we can let the user empty the input
    // so he can put whatever numebr he wants
    if (qte == '');
    else if (isNaN(qte) || qte < 1) return;
    else if (qte > temp[index].QTE_IN_STOCK) {
      temp[index].errorMessage = `${pageWords.qtestock}: ${
        temp[index].QTE_IN_STOCK
      }`;
      temp[index].QTE = temp[index].QTE_IN_STOCK;
      itemsRef.current[index].toggleTooltip();
      console.log('itemsRef');
      console.log(index);
      console.log(itemsRef.current[index]);
    }

    temp[index] = calculateAmounts(temp[index], temp[index].QTE);
    calculateTotal(temp, selectedCount);

    setOrderDetails(temp);
  };

  const handleSelect = index => {
    // 50 for the row height and 1 for the seperator
    const rowHeight = 50 + 1;
    const animTime = 200;

    // !animating means that no other selecting or deselcting is happening
    if (!animating) {
      setAnimating(true);

      const tempCount = selectedCount;

      let tempArr = [...orderDetails];

      if (orderDetails[index].selected) {
        tempArr[index].selected = false;

        // with aniamtion
        if (useAnimation) {
          for (let i = index + 1; i < selectedCount; i++) {
            tempArr[i].yAnimVal.setValue(0);
            animation(tempArr[i].yAnimVal, -rowHeight, animTime, () => {
              tempArr[i].yAnimVal.setValue(0);
            });
            // test
          }

          animation(
            tempArr[index].yAnimVal,
            (selectedCount - 1 - index) * rowHeight,
            animTime,
            () => {
              const tempElement = {...tempArr[index]};
              tempArr.splice(index, 1);
              tempArr.splice(selectedCount - 1, 0, tempElement);
              // reseting it's anime val because it's index changed it won't be reseted in the for loop
              tempArr[index].yAnimVal.setValue(0);

              setSelectedCount(selectedCount - 1);
              setOrderDetails(tempArr);

              //setTimeout(() => setAnimating(false), 100);
              setAnimating(false);
            },
          );
        } // without animation
        else {
          const tempElement = {...tempArr[index]};
          tempArr.splice(index, 1);
          tempArr.splice(selectedCount - 1, 0, tempElement);
          // reseting it's anime val because it's index changed it won't be reseted in the for loop
          tempArr[index].yAnimVal.setValue(0);

          setSelectedCount(selectedCount - 1);
          setOrderDetails(tempArr);
        }

        // we deselcted an element
        calculateTotal(tempArr, tempCount - 1);
      } else {
        tempArr[index].selected = true;

        if (useAnimation) {
          for (let i = 0; i < index; i++) {
            tempArr[i].yAnimVal.setValue(0);
            animation(tempArr[i].yAnimVal, rowHeight, animTime, () => {
              tempArr[i].yAnimVal.setValue(0);
            });
          }

          animation(
            tempArr[index].yAnimVal,
            -index * rowHeight,
            animTime,
            () => {
              const tempElement = {...tempArr[index]};
              tempArr.splice(index, 1);
              tempArr = [tempElement, ...tempArr];
              // reseting it's anime val because it's index changed it won't be reseted in the for loop
              tempArr[index].yAnimVal.setValue(0);

              setSelectedCount(selectedCount + 1);
              setOrderDetails(tempArr);
              //setTimeout(() => setAnimating(false), 100);
              setAnimating(false);
            },
          );
        } else {
          const tempElement = {...tempArr[index]};
          tempArr.splice(index, 1);
          tempArr = [tempElement, ...tempArr];
          // reseting it's anime val because it's index changed it won't be reseted in the for loop
          tempArr[index].yAnimVal.setValue(0);

          setSelectedCount(selectedCount + 1);
          setOrderDetails(tempArr);
        }

        // we selcted an element
        calculateTotal(tempArr, tempCount + 1);
      }

      if (!useAnimation) setAnimating(false);
    }
  };

  async function addOrderDetailsByBarCode(barcode) {
    // TODO FIX This later remove handdle qte check

    try {
      const result = orderDetails.find(e => e.BARCODE == barcode);

      const temp = [...orderDetails];
      const index = temp.indexOf(result);

      if (temp[index].selected) {
        listRef.current._listView.scrollToIndex({animated: true, index});
        handleChangeText(parseInt(temp[index].QTE) + 1, index);
      } else {
        listRef.current._listView.scrollToIndex({animated: true, index: 0});
        handleSelect(index);
      }
    } catch (error) {
      console.log(error.message);
      /*if (error.message.startsWith('No Product')) */ Alert.alert(
        pageWords.alert2,
      );
      //else Alert.alert(pageWords.alert3);
    }
  }

  const handleReviewOrder = () => {
    if (selectedCount < 1) {
      Alert.alert(pageWords.alert4);
      return;
    }

    const selectedOrderDetails = [];
    const temp = [...orderDetails];

    for (let i = 0; i < selectedCount; i++) {
      // checking for any empty strings
      if (temp[i].QTE == '') temp[i].QTE = 1;
      selectedOrderDetails.push(temp[i]);
    }

    console.log(selectedOrderDetails);
    navigation.navigate('Preview Screen', {
      previewDetails: selectedOrderDetails,
      total,
    });
  };

  const onBarCodeRead = (e, playSound) => {
    if (!barCode) {
      playSound();
      setBarCode(e.data);
      addOrderDetailsByBarCode(e.data);
      setTimeout(() => setBarCode(''), 1500);
    }
  };

  // props to CustomList
  const keyExtractor = item => item.ID_PRODUCT.toString();

  const renderItem = (rowData, rowMap) => {
    const {item, index} = rowData;

    return (
      <Animated.View style={styles.container}>
        <TouchableWithoutFeedback
          style={[
            styles.row,
            {
              transform: [
                {
                  translateX: item.xAnimVal,
                  translateY: item.yAnimVal,
                },
              ],
              flexDirection: lang == 'en' ? 'row' : 'row-reverse',
            },
            item.selected ? styles.selected : null,
          ]}
          // handle Press
          onPress={() => handleSelect(index)}>
          <Text style={[styles.text, {flex: 3}]}>{item.LABEL_PRODUCT}</Text>
          <Text style={[styles.text, {flex: 2}]}>{item.PRICE}</Text>
          <View style={{flex: 2, height: '100%'}}>
            <Tooltip
              highlightColor="blue"
              backgroundColor="red"
              overlayColor="transparent"
              ref={el => (itemsRef.current[index] = el)}
              popover={<Text>{orderDetails[index].errorMessage}</Text>}>
              <Input
                containerStyle={{
                  height: '100%',
                }}
                inputContainerStyle={{
                  height: '80%',
                }}
                inputStyle={{
                  color: 'white',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 15,
                }}
                // only accepts text not int
                value={`${orderDetails[index].QTE}`}
                onChangeText={e => handleChangeText(e, index)}
                onEndEditing={() => {
                  const temp = [...orderDetails];
                  if (temp[index].QTE == '') {
                    temp[index].QTE = 1;
                    setOrderDetails(temp);
                  }
                }}
                keyboardType="number-pad"
              />
            </Tooltip>
          </View>
          <Text style={[styles.text, {flex: 2}]}>{item.TOTAL_AMOUNT}</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };

  if (orderDetailsLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{flex: 1, backgroundColor: '#1b262c'}}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{`${words.total}: ${total}`}</Text>
      </View>
      <View style={styles.mainList}>
        <CustomSwipeListView
          disableLeftSwipe={true}
          listRef={listRef}
          reverseHeader={lang == 'en' ? false : true}
          listHeader={[
            pageWords.label,
            pageWords.price,
            pageWords.qte,
            pageWords.total,
          ]}
          customHeaderFlex={[3, 2, 2, 2]}
          data={orderDetails}
          extraData={orderDetails}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          // IMPORTANT invert it if you have a problem with z index
          inverted={false}
        />
      </View>
      <View style={styles.barCodeContainer}>
        {showCam ? (
          <View style={{flex: 1}}>
            <BarCodeScan torch={torch} onBarCodeRead={onBarCodeRead} />
            <Ionicons
              style={styles.flash}
              name="flashlight-sharp"
              size={25}
              color="white"
              onPress={() => setTorch(!torch)}
            />
          </View>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.roundContainer}
        onPress={handleReviewOrder}>
        <Ionicons name="cart-outline" color="white" size={25} />
        {selectedCount > 0 ? (
          <Text style={styles.counter}>{selectedCount}</Text>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.roundContainer, {right: 75}]}
        onPress={() => setShowCam(!showCam)}>
        <MaterialCommunityIcons name="barcode-scan" color="white" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    customers: state.customers.customers,
    customersLoading: state.customers.customersLoading,
    words: state.settings.words,
    lang: state.settings.lang,
    useAnimation: state.settings.useAnimation,
    products: state.products.products,
    reset: state.extra.resetAddOrder,
    storedODs: state.extra.storedODs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCustomers: () => dispatch({type: 'GET_ALL_CUSTOMERS'}),
    setReset: reset =>
      dispatch({type: 'SET_RESET_ADD_ORDER', payload: {reset}}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddOrderScreen);

const styles = StyleSheet.create({
  ...globalStyles,
  totalContainer: {
    height: 35,
    backgroundColor: '#2089DC',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  total: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 20,
  },
  mainList: {
    flex: 1,
  },
  addButtonContainer: {
    flex: 3,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  barCodeContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10,
    height: 100,
    overflow: 'hidden',
  },
  selected: {
    backgroundColor: '#89043d',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flash: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  roundContainer: {
    backgroundColor: '#2089DC',
    position: 'absolute',
    bottom: 20,
    right: 15,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  counter: {
    position: 'absolute',
    color: 'white',
    top: -10,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 22,
    height: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
