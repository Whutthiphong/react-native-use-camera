/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Cameras from './components/Cameras';
import CameraPreview from './components/CameraPreview';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cameras" headerMode="none">
        <Stack.Screen name="Cameras" component={Cameras} />
        <Stack.Screen name="CameraPreview" component={CameraPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
