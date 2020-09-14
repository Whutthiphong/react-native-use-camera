import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

interface CamState {
  flashStatus: 'auto' | 'on' | 'off';
}
const Cameras = () => {
  const initState: CamState = {flashStatus: 'off'};
  const [state, setState] = useState(initState);
  const navi = useNavigation();
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    navi.navigate('CameraPreview', {imgBase64: data.base64, imgPath: data.uri});
  };
  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );
  console.log('state. :>> ', state.flashStatus);
  const onFlashChange = () => {
    console.log('FlashChange :>> ', 'FlashChange');
    if (state.flashStatus === 'auto') {
      setState({flashStatus: 'off'});
    } else if (state.flashStatus === 'on') {
      setState({flashStatus: 'auto'});
    } else if (state.flashStatus === 'off') {
      setState({flashStatus: 'on'});
    } else {
      console.log('FlashChange :>> ', 'Something wrong');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.controlMain}>
        <View style={styles.controlLeft}>
          <Icon name="image" color="#FFF" size={30} />
          {/* <Icon name="camera-front" color="#FFF" size={30} /> */}
        </View>
        <View style={styles.controlRight}>
          {state.flashStatus === 'auto' && (
            <Icon name="flash-auto" color="#FFF" onPress={onFlashChange} />
          )}
          {state.flashStatus === 'off' && (
            <Icon name="flash-off" color="#FFF" onPress={onFlashChange} />
          )}
          {state.flashStatus === 'on' && (
            <Icon name="flash-on" color="#FFF" onPress={onFlashChange} />
          )}
        </View>
      </View>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={
          state.flashStatus === 'off'
            ? RNCamera.Constants.FlashMode.off
            : state.flashStatus === 'on'
            ? RNCamera.Constants.FlashMode.on
            : state.flashStatus === 'auto'
            ? RNCamera.Constants.FlashMode.auto
            : RNCamera.Constants.FlashMode.off
        }
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
        onGoogleVisionBarcodesDetected={({barcodes}) => {}}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={styles.controlBottom}>
              <Icon name="camera" onPress={() => takePicture(camera)} />
              {/* <Pressable
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </Pressable> */}
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default Cameras;
const styles = StyleSheet.create({
  controlMain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
  },
  controlLeft: {
    flexDirection: 'row',
    flex: 1,
    // height: 50,
    paddingVertical: 10,
    paddingLeft: 10,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#FFF2',
  },
  controlRight: {
    flex: 1,
    paddingVertical: 10,
    // height: 50,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#FFF2',
  },
  controlBottom: {
    height: 60,
    width: 60,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
