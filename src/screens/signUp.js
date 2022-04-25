import axios from 'axios';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { HelperText } from 'react-native-paper';

export default function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [city, setCity] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [address, setAddress] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [success, setSuccess] = useState('');
  const [isSucess, setIsSuccess] = useState(false);
  const SignUpHandler = () => {
    // setLoading(true)
      axios.post(`http://localhost:8089/myfyp/api/dummy/addNewUser`,{
        name: name,
    email: email,
    password: pass,
    city: city,
    address: address,
    contact: contactNo,
    role: "user"
      })
          .then(function (response) {
            console.log(response.data);
            if(response.data === 'User Added Successfully'){
              setIsSuccess(true)
              setTimeout(() => {
                setIsSuccess(false)
              }, 2000);
              setSuccess('SignUp Successfully')
            } 
          })
          .catch(function (error) {
            setIsSuccess(true)
            setSuccess('Error Occured')
            console.log('error in signin',error);
          });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#0947ed'}}>
      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 24, textAlign: 'center', color: '#FFFFFF'}}>
          SignUp as user
        </Text>
      </View>
      <View
        style={{
          flex: 0.8,
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
            <HelperText type="info" visible={isSucess}>
        {success}
      </HelperText>
          <TextInput
            style={{
              minWidth: '80%',
              borderWidth: 1,
              borderRadius: 5,
              color: '#000',
            }}
            placeholder="Name"
            placeholderTextColor={'#000'}
            onChangeText={setName}
            value={name}
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
              
              placeholder="City"
              placeholderTextColor={'#000'}
              onChangeText={setCity}
              value={city}
            />
          </View>
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
              
              placeholder="Email"
              placeholderTextColor={'#000'}
              onChangeText={setEmail}
              value={email}
            />
          </View>
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
              
              placeholder="Address"
              placeholderTextColor={'#000'}
              onChangeText={setAddress}
              value={address}
            />
          </View>
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
              
              placeholder="Contact No."
              placeholderTextColor={'#000'}
              onChangeText={setContactNo}
              keyboardType="numeric"
              value={contactNo}
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
            onPress={() => SignUpHandler()}
          >
            <Text sytle={{color: '#000'}}>SignUp</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#000'}}>Already have an account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: 'red'}}>LogIn</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
}

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
