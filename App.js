import React from 'react';
import Login from './src/screens/login';
import SignUp from './src/screens/signUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
