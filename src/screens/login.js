import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(null);
  const [isDisplayed, setisDisplayed] = useState(false);
  //   const AddStudentData = () => {
  //     fetch('http://192.168.31.241/fyp_api/api/student/Addstudent', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         Email: email,
  //         Password: pass,
  //       }),
  //     })
  //       .then(response => response.json())
  //       .catch(error => {
  //         console.log('Api call error');
  //         alert(error.message);
  //       });
  //   };
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
            onPress={() => navigation.navigate('Daily Price List')}>
            <Text sytle={{color: '#000'}}>Login</Text>
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
        {/* {isDisplayed ? (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#000'}}>Name: {name}</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#000'}}>Age: {age}</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#000'}}>Cgpa: {cgpa}</Text>
            </View>
          </>
        ) : null} */}
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
