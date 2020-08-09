import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Title, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';

function DrawerContent(props) {
  const {fullName, logOut, words} = props;

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('../assets/profile.png')}
                backgroundColor="white"
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{fullName}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Entypo name="home" color={color} size={size} />
              )}
              label={words.home}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <FAIcon name="product-hunt" color={color} size={size} />
              )}
              label={words.products}
              onPress={() => {
                props.navigation.navigate('Products');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Fontisto name="persons" color={color} size={size} />
              )}
              label={words.customers}
              onPress={() => {
                props.navigation.navigate('Customers');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Entypo name="users" color={color} size={size} />
              )}
              label={words.users}
              onPress={() => {
                props.navigation.navigate('Users');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="settings" color={color} size={size} />
              )}
              label={words.settings}
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label={words.logout}
          onPress={() => {
            logOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    fullName: state.auth.fullName,
    words: state.settings.words,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch({type: 'USER_LOGOUT'});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
