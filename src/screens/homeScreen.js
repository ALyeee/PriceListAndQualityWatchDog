import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation, route}) {
  const {userData} = route.params;
  console.log('====================================');
  console.log('userdata', userData);
  console.log('====================================');

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
      <View
        style={{
          flex: 0.8,
          alignItems: 'center',
          marginTop: 10,
          marginLeft: 20,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
          Welcome {userData[0].name}
        </Text>
        {/* <Text style={{fontSize:20, fontWeight: '500',color:'#000', alignSelf:'flex-start'}}>Welcome {userData?.name}</Text> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('EssentialComo')}
          style={{
            backgroundColor: 'orange',
            maxWidth: '90%',
            minWidth: '90%',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 20,
          }}>
          <Text style={{padding: 20}}>Essential Commoditties</Text>
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
          onPress={() => navigation.navigate('Complains')}
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
        {userData[0]?.role === 'admin' || userData[0].role === 'super' ? ( //admin khtm
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('HallOfFame')}
              style={{
                backgroundColor: 'orange',
                maxWidth: '90%',
                minWidth: '90%',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 10,
              }}>
              <Text style={{padding: 20}}>Hall Of Fame</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('HallOfShame')}
              style={{
                backgroundColor: 'orange',
                maxWidth: '90%',
                minWidth: '90%',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 10,
              }}>
              <Text style={{padding: 20}}>Hall Of Shame</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('HallOfShame')}
            style={{
              backgroundColor: 'orange',
              maxWidth: '90%',
              minWidth: '90%',
              alignItems: 'center',
              borderRadius: 20,
              marginTop: 10,
            }}>
            <Text style={{padding: 20}}>Hall Of Shame</Text>
          </TouchableOpacity>
        )}
        {/* {userData[0]?.role === 'user' ?
        <TouchableOpacity
        onPress={()=> navigation.navigate('comparison')}
          style={{
            backgroundColor: 'orange',
            maxWidth: '90%',
            minWidth: '90%',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <Text style={{padding: 20}}>Rates Comparison</Text>
        </TouchableOpacity> : null
        } */}
      </View>
    </View>
  );
}
