import React from 'react';
import Login from './src/screens/login';
import SignUp from './src/screens/signUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/homeScreen';
import EssentialComodities from './src/screens/essentialComodities';
import Fruits from './src/screens/fruits';
import Vegetables from './src/screens/vegetables';
import LiveStock from './src/screens/liveStock';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          options={{
            headerStyle: {backgroundColor: '#0947ed'},
            headerTitleStyle: {color: '#FFFFFF'},
            headerTintColor: '#FFFFFF',
          }}
          component={SignUp}
        />
        <Stack.Screen
          name="Daily Price List"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="EssentialComo"
          options={{headerShown: false}}
          component={EssentialComodities}
        />
        <Stack.Screen
          name="Fruits"
          options={{headerShown: false}}
          component={Fruits}
        />
        <Stack.Screen
          name="Vegetables"
          options={{headerShown: false}}
          component={Vegetables}
        />
        <Stack.Screen
          name="LiveStock"
          options={{headerShown: false}}
          component={LiveStock}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
