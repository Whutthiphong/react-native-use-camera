import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

interface CameraProps {
  imgBase64: string;
  imgPath: string;
}
const CameraPreview = (props: any) => {
  console.log('props :>> ', JSON.stringify(props));
  const {imgBase64, imgPath} = props.route.params;
  console.log('object :>> ', imgPath);
  return (
    <View style={styles.container}>
      <Text>{imgPath}</Text>
      <Image
        style={{height: '100%', width: '100%'}}
        source={{uri: `data:image/gif;base64,${imgBase64}`}}
      />
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
