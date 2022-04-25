import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ActivityIndicator, HelperText } from 'react-native-paper';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
   
    const LoginHandler =  () => {
      setLoading(true)
        axios.post(`http://localhost:8089/myfyp/api/dummy/validateUser?email=${email}&password=${pass}`)
            .then(function (response) {
              console.log(response.data);
              if(response.data === 'Invalid Credentials'){
                setLoading(false)
                setIsError(true)
                setError('Invalid Credentials')
              } else {
                navigation.navigate('Daily Price List')
                setError('')
                setIsError(false)
                setLoading(false)
                  try {
                    const userData = JSON.stringify(response.data[0])
                    AsyncStorage.setItem('@userData', userData)
                  } catch (e) {
                    // saving error
                  }
                
              }
            })
            
    };
  return (
    <View style={{flex: 1, backgroundColor: '#0947ed'}}>
      <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 24, textAlign: 'center', color: '#FFFFFF'}}>
          Food Price List And Quality WatchDogs
        </Text>
      </View>
      <View
        style={{
          flex: 0.6,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          backgroundColor: '#FFFFFF',
        }}>
          
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
            <HelperText type="error" visible={isError}>
        {error}
      </HelperText>
          <TextInput
            style={{
              minWidth: '80%',
              borderWidth: 1,
              borderRadius: 5,
              color: '#000',
            }}
            placeholder="Email"
            placeholderTextColor={'#000'}
            onChangeText={setEmail}
            value={email}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TextInput
              style={{
                minWidth: '80%',
                borderWidth: 1,
                borderRadius: 5,
                color: '#000',
              }}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={'#000'}
              onChangeText={setPass}
              value={pass}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#308bf6',
              borderRadius: 5,
              minWidth: '30%',
              minHeight: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={() => LoginHandler()}>
            {!loading ? <Text sytle={{color: '#000'}}>Login</Text> : <ActivityIndicator animating={loading} color={'#ffffff'} />}
          </TouchableOpacity> 
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#000'}}>Dont have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: 'red'}}>SignUp</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Login;
