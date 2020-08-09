import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';

import CustomSwipeListView from '../Components/CustomSwipeListView';

import styles from '../assets/style';

import {connect} from 'react-redux';
import {Alert} from 'react-native';

function OrdersHistoryScreen({
  navigation,
  orders,
  getAllOrders,
  ordersLoading,
  deleteOrder,
  words,
  lang,
}) {
  const pageWords = words.OrdersHistoryScreen;

  //const [listHeader] = useState();

  useEffect(() => {
    getAllOrders();
  }, []);

  // props to CustomList
  const keyExtractor = item => item.ID_ORDER.toString();

  const handleDeleteOrder = (id, index) => {
    Alert.alert(
      pageWords.delete1,
      `${pageWords.delete2} ${id}`,
      [
        {
          text: words.no,
          style: 'cancel',
        },
        {text: words.yes, onPress: () => deleteOrder(orders, id, index)},
      ],
      {cancelable: false},
    );
  };

  const handleOrderInfo = (id, index) => {
    const idOrder = orders[index].ID_ORDER;

    navigation.navigate('Order Details', {idOrder});
  };

  const renderItem = ({item, index}) => {
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{translateX: item.xAnimVal}],
            flexDirection: lang == 'en' ? 'row' : 'row-reverse',
          },
        ]}>
        <Text style={styles.text}>{item.ID_ORDER}</Text>
        <Text style={styles.text}>{item.DESCRIPTION_ORDER}</Text>
        <Text style={styles.text}>{item.SALESMAN}</Text>
        <Text style={styles.text}>{item.DATE_ORDER}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {ordersLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <CustomSwipeListView
          data={orders}
          reverseHeader={lang == 'en' ? false : true}
          listHeader={[
            pageWords.ordernum,
            words.description,
            pageWords.salesman,
            pageWords.date,
          ]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          delFunc={handleDeleteOrder}
          infoFunc={handleOrderInfo}
        />
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    ordersLoading: state.orders.ordersLoading,
    words: state.settings.words,
    lang: state.settings.lang,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: () => dispatch({type: 'GET_ALL_ORDERS'}),
    deleteOrder: (orders, id, index) =>
      dispatch({type: 'DELETE_ORDER', payload: {orders, id, index}}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersHistoryScreen);
