import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, Animated} from 'react-native';

import {Text} from 'react-native-elements';

import CustomSwipeListView from '../Components/CustomSwipeListView';

import {connect} from 'react-redux';

import styles from '../assets/style';

function UsersScreen({
  users,
  usersLoading,
  getAllUsers,
  deleteUser,
  words,
  lang,
}) {
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  });

  // props to CustomList
  const keyExtractor = item => item.ID.toString();

  const handleDeleteProduct = (id, index) => {
    deleteUser(users, id, index);
  };

  const renderItem = ({item, index}) => {
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{translateX: users[index].xAnimVal}],
            flexDirection: lang == 'en' ? 'row' : 'row-reverse',
          },
        ]}>
        <Text style={styles.text}>{item.ID}</Text>
        <Text style={styles.text}>{item.FullName}</Text>
        <Text style={styles.text}>{item.UserType}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {usersLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <CustomSwipeListView
          data={users}
          reverseHeader={lang == 'en' ? false : true}
          listHeader={[words.username, words.fullname, words.usertype]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          delFunc={handleDeleteProduct}
        />
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    usersLoading: state.users.usersLoading,
    words: state.settings.words,
    lang: state.settings.lang,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch({type: 'GET_ALL_USERS'}),
    deleteUser: (users, id, index) =>
      dispatch({type: 'DELETE_USER', payload: {users, id, index}}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);
