import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Animated} from 'react-native';

import {Text, Button} from 'react-native-elements';

import CustomSwipeListView from '../Components/CustomSwipeListView';
import {connect} from 'react-redux';

import styles from '../assets/style';

function ProductsScreen({
  navigation,
  productsLoading,
  products,
  getAllProducts,
  deleteProduct,
  words,
  lang,
}) {
  useEffect(() => {
    console.log('useEffect');
    getAllProducts();
  }, []);

  // props to CustomList
  const keyExtractor = item => item.ID_PRODUCT.toString();

  const handleDeleteProduct = (id, index) => {
    deleteProduct(products, id, index);
  };

  const handleEditProduct = (id, index) => {
    navigation.navigate('Edit Product', {
      barcode: products[index].BARCODE,
      inputs: {
        label: products[index].LABEL_PRODUCT,
        price: products[index].PRICE,
        qte: products[index].QTE_IN_STOCK,
      },
      selectedCat: products[index].ID_CAT,
      selectedLabel: products[index].DESCRIPTION_CAT,
      id,
      index,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{translateX: products[index].xAnimVal}],
            flexDirection: lang == 'en' ? 'row' : 'row-reverse',
          },
        ]}>
        <Text style={styles.text}>{item.LABEL_PRODUCT}</Text>
        <Text style={styles.text}>{item.QTE_IN_STOCK}</Text>
        <Text style={styles.text}>{item.PRICE}</Text>
        <Text style={styles.text}>{item.DESCRIPTION_CAT}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {productsLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <CustomSwipeListView
            data={products}
            reverseHeader={lang == 'en' ? false : true}
            listHeader={[words.label, words.qte, words.price, words.category]}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            delFunc={handleDeleteProduct}
            editFunc={handleEditProduct}
          />
          {/* <Button title="Refresh" onPress={() => getAllProducts()} /> */}
        </View>
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    productsLoading: state.products.productsLoading,
    products: state.products.products,
    words: state.settings.words,
    lang: state.settings.lang,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch({type: 'GET_ALL_PRODUCTS'}),
    deleteProduct: (products, id, index) =>
      dispatch({type: 'DELETE_PRODUCT', payload: {products, id, index}}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsScreen);
