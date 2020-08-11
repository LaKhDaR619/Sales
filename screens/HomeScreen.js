import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import Header from '../Components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomeScreen({navigation, words}) {
  const color = 'white';
  const size = 45;

  const handleNavigation = to => {
    navigation.navigate(to);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Home" />
      <View style={styles.subContaienr}>
        <View style={styles.logoContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/logo.png')}
            />
            <Text style={styles.mainText}>Sales</Text>
          </View>
          <Text style={styles.subText}>{words.subText}</Text>
        </View>
        <View style={styles.navigationContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.element}
              onPress={() => handleNavigation('Orders')}>
              <Entypo name="shopping-cart" color={color} size={size} />
              <Text style={styles.elementText}>{words.orders}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.element}
              onPress={() => handleNavigation('Products')}>
              <FAIcon name="product-hunt" color={color} size={size} />
              <Text style={styles.elementText}>{words.products}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.element}
              onPress={() => handleNavigation('Customers')}>
              <Fontisto name="persons" color={color} size={size} />
              <Text style={styles.elementText}>{words.customers}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.element}
              onPress={() => handleNavigation('Users')}>
              <Entypo name="users" color={color} size={size} />
              <Text style={styles.elementText}>{words.users}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContaienr: {
    flex: 1,
    backgroundColor: '#0054B7',
    paddingHorizontal: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 85,
    height: 85,
  },
  mainText: {
    fontSize: 45,
    color: 'white',
  },
  subText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  element: {},
  elementText: {
    color: 'white',
    paddingTop: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    fullName: state.auth.fullName,
    words: state.settings.words,
  };
};

export default connect(
  mapStateToProps,
  null,
)(HomeScreen);
