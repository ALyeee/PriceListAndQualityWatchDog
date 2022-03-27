import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.2,
          backgroundColor: 'red',
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Daily Price List</Text>
      </View>
      <View style={{flex: 0.8, alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EssentialComo')}
          style={{
            backgroundColor: 'orange',
            maxWidth: '90%',
            minWidth: '90%',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={{padding: 20}}>Essential Comodities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Fruits')}
          style={{
            backgroundColor: 'orange',
            maxWidth: '90%',
            minWidth: '90%',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <Text style={{padding: 20}}>Fruits Rates</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Vegetables')}
          style={{
            backgroundColor: 'orange',
            maxWidth: '90%',
            minWidth: '90%',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <Text style={{padding: 20}}>Vegetables Rates</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LiveStock')}
          style={{
            backgroundColor: 'orange',
            maxWidth: '90%',
            minWidth: '90%',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <Text style={{padding: 20}}>LiveStock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            maxWidth: '90%',
            minWidth: '90%',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <Text style={{padding: 20}}>Complains</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
