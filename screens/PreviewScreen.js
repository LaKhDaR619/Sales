import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';

import {Button, Text, Input} from 'react-native-elements';
import MyDropPicker from '../Components/MyDropPicker';

import globalStyles from '../assets/style';

import {useFocusEffect} from '@react-navigation/native';
import CustomSwipeListView from '../Components/CustomSwipeListView';

import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

function OrderDetailsScreen({
  route,
  ordersLoading,
  words,
  lang,
  getAllCustomers,
  customers,
  customersLoading,
  navigation,
  fullName,
  addOrder,
  orders,
  setReset,
}) {
  const smallWindow = Dimensions.get('window').height < 620 ? true : false;

  const listRef = React.useRef();

  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [description, setDescription] = useState('');

  const [previewDetails, setPreviewDetails] = useState([]);
  const [total, setTotal] = useState(0);

  const [addingOrder, setAddingOrder] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setPreviewDetails(route.params.previewDetails);
      setTotal(route.params.total);
      setReset(false);
    }, [route.params]),
  );

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    console.log('ordersLoading');
    console.log(ordersLoading);
  }, [ordersLoading]);

  const handleConfirmOrder = () => {
    Alert.alert(
      words.addOrderScreen.order,
      words.addOrderScreen.maketheorder,
      [
        {
          text: words.cancel,
          style: 'cancel',
        },
        {
          text: words.ok,
          onPress: () => {
            addOrder(
              orders,
              previewDetails,
              description,
              fullName,
              selectedCustomer,
            );

            setAddingOrder(true);

            setTimeout(() => {
              setAddingOrder(false);
              setReset(true);
              navigation.goBack();
            }, 500);
          },
        },
      ],
      {cancelable: true},
    );
  };

  // props to CustomList
  const keyExtractor = item => item.ID_PRODUCT.toString();

  const renderItem = (rowData, rowMap) => {
    const {item, index} = rowData;

    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{translateX: item.xAnimVal}],
            flexDirection: lang == 'en' ? 'row' : 'row-reverse',
          },
        ]}>
        <Text style={[styles.text, {flex: 3}]}>{item.LABEL_PRODUCT}</Text>
        <Text style={[styles.text, {flex: 2}]}>{item.PRICE}</Text>

        <Input
          editable={false}
          containerStyle={{
            flex: 2,
            height: '100%',
          }}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: 'white',
            textAlign: 'center',
            fontSize: 15,
          }}
          value={`${item.QTE}`}
          keyboardType="number-pad"
        />
        <Text style={[styles.text, {flex: 2}]}>{item.TOTAL_AMOUNT}</Text>
      </Animated.View>
    );
  };

  // displaying ActivityIndicator while adding the order

  if (customersLoading || addingOrder)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  else {
    if (!selectedCustomer) {
      setSelectedLabel(customers[0].name);
      setSelectedCustomer(customers[0].id);
    }
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#1b262c', marginBottom: 10}}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{`${words.total}: ${total}`}</Text>
      </View>
      <View style={{flex: 4}}>
        <CustomSwipeListView
          disableLeftSwipe={true}
          listRef={listRef}
          reverseHeader={lang == 'en' ? false : true}
          listHeader={[words.label, words.price, words.qte, words.total]}
          customHeaderFlex={[3, 2, 2, 2]}
          data={previewDetails}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: 'white',
        }}>
        <MyDropPicker
          items={customers}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          setValue={setSelectedCustomer}
          placeholder={words.addOrderScreen.selectacustomer}
        />
        <Input
          containerStyle={{
            height: smallWindow ? 30 : 50,
            padding: 0,
            marginBottom: 10,
          }}
          inputStyle={{
            textAlign: 'center',
            fontSize: smallWindow ? 14 : 20,
          }}
          placeholder={words.addOrderScreen.description}
          value={description}
          onChangeText={e => setDescription(e)}
        />
        <Button
          containerStyle={{marginTop: 5}}
          buttonStyle={{height: smallWindow ? 30 : 50}}
          titleStyle={{
            fontSize: smallWindow ? 14 : 25,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
          title={words.confirmorder}
          onPress={handleConfirmOrder}
        />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    ordersLoading: state.orders.ordersLoading,
    words: state.settings.words,
    lang: state.settings.lang,
    customers: state.customers.customers,
    customersLoading: state.customers.customersLoading,
    fullName: state.auth.fullName,
    reset: state.extra.resetAddOrder,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCustomers: () => dispatch({type: 'GET_ALL_CUSTOMERS'}),
    addOrder: (orders, orderDetails, description, fullName, idCustomer) =>
      dispatch({
        type: 'ADD_ORDER',
        payload: {orders, orderDetails, description, fullName, idCustomer},
      }),
    setReset: reset =>
      dispatch({type: 'SET_RESET_ADD_ORDER', payload: {reset}}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailsScreen);

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
});
