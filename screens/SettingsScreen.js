import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import {CheckBox, Button} from 'react-native-elements';
import MyDropPicker from '../Components/MyDropPicker';
import Header from '../Components/Header';
import {connect} from 'react-redux';
import {getObject} from '../BL/localStorage';

import {backupDB, restoreDB} from '../BL/backUpAndRestore';
import {closeDB} from '../BL/Sql';
import {openDatabase} from 'react-native-sqlite-storage';

import RNFS from 'react-native-fs';
import DirectoryPickerManager from 'react-native-directory-picker';
import DocumentPicker from 'react-native-document-picker';

function SettingsScreen({
  navigation,
  settingsLoading,
  setSettings,
  settingsLang,
  settingsUseAnimation,
  words,
}) {
  const items = [{name: 'English', id: 'en'}, {name: 'العربية', id: 'ar'}];

  const pageWords = words.SettingsScreen;

  const [useAnimation, setUseAnimation] = useState();
  const [lang, setLang] = useState();
  const [selectedLabel, setSelectedLabel] = useState('');

  const getNameById = id => {
    const item = items.find(e => e.id == id);
    const name = item.name;

    return name;
  };

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        const data = await getObject('settings');

        setUseAnimation(data.useAnimation);
        // reseting both the id and the name of
        setLang(data.lang);
        const name = getNameById(data.lang);
        console.log('name');
        console.log(name);
        setSelectedLabel(name);
      };
    }, []),
  );

  useEffect(() => {
    setUseAnimation(settingsUseAnimation);
    // reseting both the id and the name of
    setLang(settingsLang);
    setSelectedLabel(getNameById(settingsLang));
  }, []);

  const handleSaveSettings = async () => {
    setSettings({useAnimation, lang});
  };

  const handleBackup = async () => {
    try {
      DirectoryPickerManager.showDirectoryPicker(null, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled directory picker');
        } else if (response.error) {
          console.log('DirectoryPickerManager Error: ', response.error);
        } else {
          // all good
          backupDB(response.path);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRestore = async () => {
    closeDB();

    return;

    try {
      DirectoryPickerManager.showDirectoryPicker(null, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled directory picker');
        } else if (response.error) {
          console.log('DirectoryPickerManager Error: ', response.error);
        } else {
          // all good
          restoreDB(response.path);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  if (settingsLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Header title={pageWords.title} navigation={navigation} />
      <View
        style={{
          paddingVertical: 10,
        }}>
        <MyDropPicker
          items={items}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          setValue={setLang}
        />
      </View>

      {
        /*<CheckBox
        title={pageWords.animation}
        size={30}
        containerStyle={{backgroundColor: 'transparent'}}
        textStyle={{color: 'grey'}}
        checked={useAnimation}
        onPress={() => setUseAnimation(!useAnimation)}
      />*/
        <View style={{paddingHorizontal: 20}}>
          <Button
            title="Backup"
            onPress={handleBackup}
            containerStyle={{paddingVertical: 10}}
          />
          <Button title="Restore" onPress={handleRestore} />
        </View>
      }

      <View style={styles.btnContainer}>
        <Button title={pageWords.savesettings} onPress={handleSaveSettings} />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    settingsLoading: state.settings.settingsLoading,
    settingsLang: state.settings.lang,
    settingsUseAnimation: state.settings.useAnimation,
    words: state.settings.words,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSettings: payload => {
      dispatch({type: 'SET_SETTINGS', payload});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 30,
  },
});
