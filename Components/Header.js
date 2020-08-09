import React from 'react';

import {Header} from 'react-native-elements';

export default function({navigation, title, hideDrawerButton}) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Header
      containerStyle={{borderBottomWidth: 0}}
      leftComponent={
        hideDrawerButton
          ? null
          : {icon: 'menu', color: '#fff', onPress: openDrawer}
      }
      centerComponent={{text: title, style: {color: '#fff'}}}
    />
  );
}
