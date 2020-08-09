import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';

let Sound = require('react-native-sound');

const playSound = () => {
  // Enable playback in silence mode
  Sound.setCategory('Playback');
  // Load the sound file 'whoosh.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    whoosh.play();
  });
};

export default function BarCodeScan({torch, onBarCodeRead}) {
  const camRef = useRef();

  return (
    <RNCamera
      style={styles.preview}
      flashMode={
        torch
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off
      }
      onBarCodeRead={e => onBarCodeRead(e, playSound)}
      ref={camRef}
      captureAudio={false}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      onGoogleVisionBarcodesDetected={({barcodes}) => {
        // check it out later
        //console.log(barcodes);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    width: 420,
    height: 50,
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20,
  },
});
