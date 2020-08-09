import React from 'react';
import {View, StyleSheet} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import {Button, Text} from 'react-native-elements';
import Colors from '../assets/Colors';
import globalStyles from '../assets/style';

function CustomSwipeListView({
  inverted,
  delFunc,
  editFunc,
  infoFunc,
  listHeader,
  customHeaderFlex,
  data,
  keyExtractor,
  renderItem,
  listRef,
  disableLeftSwipe,
  reverseHeader,
  extraData,
}) {
  const rightButtons = (data, rowMap) => {
    return (
      <View style={[styles.row, styles.rightButtons]}>
        <View style={styles.buttonsContainer}>
          {delFunc ? (
            <Button
              buttonStyle={styles.btnDel}
              onPress={() => {
                // deleting using key extractor to get the ID
                const id = keyExtractor(data.item);

                delFunc(id, data.index);
                if (rowMap[id]) rowMap[id].closeRow();
              }}
              icon={
                <MCIcon
                  name="delete"
                  color={Colors.Cornsilk}
                  size={26}
                  adjustsFontSizeToFit={true}
                />
              }
            />
          ) : null}
          {editFunc ? (
            <Button
              buttonStyle={styles.btnEdit}
              onPress={() => {
                const id = keyExtractor(data.item);

                // edit Func
                editFunc(id, data.index);
                if (rowMap[id]) rowMap[id].closeRow();
              }}
              icon={
                <MIcon
                  name="edit"
                  color="white"
                  size={26}
                  adjustsFontSizeToFit={true}
                />
              }
            />
          ) : null}
          {infoFunc ? (
            <Button
              buttonStyle={styles.btnInfo}
              onPress={() => {
                const id = keyExtractor(data.item);

                // edit Func
                infoFunc(id, data.index);
                if (rowMap[id]) rowMap[id].closeRow();
              }}
              icon={
                <MCIcon
                  name="information-variant"
                  color="white"
                  size={26}
                  adjustsFontSizeToFit={true}
                />
              }
            />
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <View
        style={[
          styles.header,
          {flexDirection: reverseHeader ? 'row-reverse' : 'row'},
        ]}>
        {customHeaderFlex
          ? listHeader.map((head, index) => (
              <Text
                style={[
                  styles.text,
                  {fontSize: 18},
                  {flex: customHeaderFlex[index]},
                ]}
                key={index}>
                {head}
              </Text>
            ))
          : listHeader.map((head, index) => (
              <Text style={[styles.text, {fontSize: 18}]} key={index}>
                {head}
              </Text>
            ))}
      </View>
      <SwipeListView
        ref={listRef}
        data={data}
        extraData={extraData}
        disableLeftSwipe={disableLeftSwipe}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        keyExtractor={keyExtractor}
        disableRightSwipe={true}
        renderHiddenItem={rightButtons}
        inverted={inverted}
        leftOpenValue={100}
        rightOpenValue={-100}
      />
    </View>
  );
}

export default CustomSwipeListView;

const styles = StyleSheet.create({
  ...globalStyles,
  seperator: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  rightButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  btnDel: {
    borderRadius: 50,
    backgroundColor: 'red',
  },
  btnEdit: {
    borderRadius: 50,
    backgroundColor: 'blue',
  },
  btnInfo: {
    borderRadius: 50,
    backgroundColor: 'green',
  },
});
