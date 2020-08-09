import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';

import {Text, Input} from 'react-native-elements';

import globalStyles from '../assets/style';

import {useFocusEffect} from '@react-navigation/native';
import CustomSwipeListView from '../Components/CustomSwipeListView';

import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAllCustomers} from '../BL/dbRequests';

function OrderDetailsScreen({
  route,
  orderDetailsLoading,
  orderDetails,
  getOrderDetailsById,
  words,
  lang,
}) {
  const listRef = React.useRef();

  const [total, setTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getOrderDetailsById(route.params.idOrder);
    }, [route.params]),
  );

  useEffect(() => {
    let temp = 0;

    // calculating total
    for (let i = 0; i < orderDetails.length; i++)
      temp += orderDetails[i].TOTAL_AMOUNT;

    setTotal(temp);
  }, [orderDetails]);

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

  return (
    <SafeAreaView style={styles.container}>
      {orderDetailsLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: 'space-evenly',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: lang == 'en' ? 'row' : 'row-reverse',
                justifyContent: 'space-between',
              }}>
              <Text>
                {`${words.OrdersHistoryScreen.ordernum}: ${
                  orderDetails[0].ID_ORDER
                }`}
              </Text>
              <Text>{`${words.customer}: ${orderDetails[0].FIRST_NAME +
                orderDetails[0].LAST_NAME}`}</Text>
            </View>

            <View
              style={{
                flexDirection: lang == 'en' ? 'row' : 'row-reverse',
                justifyContent: 'space-between',
              }}>
              <Text>{`${words.OrdersHistoryScreen.date}: ${
                orderDetails[0].DATE_ORDER
              }`}</Text>
              <Text>{`${words.OrdersHistoryScreen.salesman}: ${
                orderDetails[0].SALESMAN
              }`}</Text>
            </View>
            <View
              style={{
                flexDirection: lang == 'en' ? 'row' : 'row-reverse',
                justifyContent: 'space-between',
              }}>
              <Text>
                {`${words.description}: ${orderDetails[0].DESCRIPTION_ORDER}`}
              </Text>
            </View>
          </View>
          <View style={{flex: 6}}>
            <CustomSwipeListView
              disableLeftSwipe={true}
              listRef={listRef}
              reverseHeader={lang == 'en' ? false : true}
              listHeader={[words.label, words.price, words.qte, words.total]}
              customHeaderFlex={[3, 2, 2, 2]}
              data={orderDetails}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
            <Text style={{paddingVertical: 10, paddingHorizontal: 20}}>{`${
              words.total
            }: ${total}`}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    orderDetailsLoading: state.orders.orderDetailsLoading,
    orderDetails: state.orders.orderDetails,
    words: state.settings.words,
    lang: state.settings.lang,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderDetailsById: orderId =>
      dispatch({
        type: 'GET_ORDER_DETAILS_BY_ID',
        payload: {orderId},
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailsScreen);

const styles = StyleSheet.create({
  ...globalStyles,
});
