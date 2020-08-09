import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import RNPicker from 'search-modal-picker';

const smallWindow = Dimensions.get('window').height < 620 ? true : false;

export default function MyDropPicker({
  items,
  setValue,
  selectedLabel,
  setSelectedLabel,
}) {
  // TODO Solve the problem with two categories having the same name

  return (
    <View style={Styles.container}>
      <RNPicker
        dataSource={items}
        dummyDataSource={items}
        pickerStyle={Styles.pickerStyle}
        selectLabelTextStyle={Styles.selectLabelTextStyle}
        dropDownImageStyle={{display: 'none'}}
        pickerTitle="title" //{title}
        defaultValue={true}
        //showSearchBar={true}
        selectedLabel={selectedLabel}
        searchBarPlaceHolder={'Search.....'}
        selectedValue={(index, item) => {
          setSelectedLabel(item.name);
          setValue(item.id);
        }}
      />
      <AntDesign
        name="caretdown"
        size={18}
        color="black"
        style={Styles.iconStyle}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: smallWindow ? 30 : 50,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  pickerStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  selectLabelTextStyle: {
    width: '99%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: smallWindow ? 12 : 20,
  },
  iconStyle: {
    height: '100%',
    textAlignVertical: 'center',
  },
});
