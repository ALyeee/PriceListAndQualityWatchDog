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
import Complains from './src/screens/complains';
import AddComplains from './src/screens/addComplains';
import Comparison from './src/screens/Comparison';
import EssentialComparison from './src/screens/EssentialComparison';
import FruitComp from './src/screens/FruitComp.';
import VegetableComp from './src/screens/VegetableComp';
import LiveStockComp from './src/screens/LiveStockComp';
import PendingComplains from './src/screens/PendingComplains';
import ResolvedComplains from './src/screens/ResolvedComplains';
import HallOfFame from './src/screens/hallOfFame';
import HallOfShame from './src/screens/hallOfShame';

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
        <Stack.Screen
          name="Complains"
          options={{headerShown: false}}
          component={Complains}
        />
        <Stack.Screen
          name="AddComplains"
          options={{headerShown: false}}
          component={AddComplains}
        />
        <Stack.Screen
          name="comparison"
          options={{headerShown: false}}
          component={Comparison}
        />
        <Stack.Screen
          name="essentialComparison"
          options={{headerShown: false}}
          component={EssentialComparison}
        />
        <Stack.Screen
          name="FruitComp"
          options={{headerShown: false}}
          component={FruitComp}
        />
        <Stack.Screen
          name="VegetableComp"
          options={{headerShown: false}}
          component={VegetableComp}
        />
        <Stack.Screen
          name="LiveStockComp"
          options={{headerShown: false}}
          component={LiveStockComp}
        />
        <Stack.Screen
          name="PendingComplains"
          options={{headerShown: false}}
          component={PendingComplains}
        />
        <Stack.Screen
          name="ResolvedComplains"
          options={{headerShown: false}}
          component={ResolvedComplains}
        />
        <Stack.Screen
          name="HallOfFame"
          options={{headerShown: false}}
          component={HallOfFame}
        />
        <Stack.Screen
          name="HallOfShame"
          options={{headerShown: false}}
          component={HallOfShame}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
