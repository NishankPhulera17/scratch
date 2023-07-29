import React,{useRef} from 'react';
import {View, StyleSheet,PanResponder,Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/components/MainScreen';
import ActionScreen from './src/components/ActionScreen';


const Stack = createNativeStackNavigator();
const App = () => {

  return(
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="MainScreen" component={MainScreen} />
        <Stack.Screen options={{headerShown:false}} name="ActionScreen" component={ActionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({})

export default App;
