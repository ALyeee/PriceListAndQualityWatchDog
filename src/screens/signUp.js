import axios from 'axios';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [city, setCity] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [address, setAddress] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [success, setSuccess] = useState('');
  const [isSucess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Islamabad', value: 'islamabad'},
    {label: 'Rawalpindi', value: 'rawalpindi'},
    {label: 'Karachi', value: 'karachi'},
    {label: 'Lahore', value: 'lahore'},
  ]);

  const SignUpHandler = () => {
    // setLoading(true)
    axios
      .post(`http://localhost:8089/myfyp/api/dummy/addNewUser`, {
        name: name,
        email: email,
        password: pass,
        city: city,
        address: address,
        contact: contactNo,
        role: 'user',
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data === 'User Added Successfully') {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
          setSuccess('SignUp Successfully');
        }
      })
      .catch(function (error) {
        setIsSuccess(true);
        setSuccess('Error Occured');
        console.log('error in signin', error);
      });
  };
  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View style={{flex: 1, backgroundColor: '#0947ed'}}>
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
              marginTop: 10,
            }}>
            <HelperText type="info" visible={isSucess}>
              {success}
            </HelperText>
            <Text
              style={{
                minWidth: '80%',
                color: '#000',
                marginBottom: 10,
              }}>
              Name
            </Text>
            <TextInput
              style={{
                minWidth: '80%',
                borderWidth: 1,
                borderRadius: 5,
                color: '#000',
              }}
              placeholder="Name"
              placeholderTextColor={'grey'}
              onChangeText={setName}
              value={name}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  minWidth: '80%',
                  color: '#000',
                  marginBottom: 10,
                }}>
                City
              </Text>
              <DropDownPicker
                style={{
                  minWidth: '80%',
                }}
                open={open}
                value={city}
                items={items}
                setOpen={setOpen}
                setValue={setCity}
                setItems={setItems}
              />
              {/* <TextInput
                style={{
                  minWidth: '80%',
                  borderWidth: 1,
                  borderRadius: 5,
                  color: '#000',
                }}
                placeholder="City"
                placeholderTextColor={'grey'}
                onChangeText={setCity}
                value={city}
              /> */}
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  minWidth: '80%',
                  color: '#000',
                  marginBottom: 10,
                }}>
                Email
              </Text>
              <TextInput
                style={{
                  minWidth: '80%',
                  borderWidth: 1,
                  borderRadius: 5,
                  color: '#000',
                }}
                placeholder="Email"
                placeholderTextColor={'grey'}
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
              <Text
                style={{
                  minWidth: '80%',
                  color: '#000',
                  marginBottom: 10,
                }}>
                Password
              </Text>
              <TextInput
                style={{
                  minWidth: '80%',
                  borderWidth: 1,
                  borderRadius: 5,
                  color: '#000',
                }}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={'grey'}
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
              <Text
                style={{
                  minWidth: '80%',
                  color: '#000',
                  marginBottom: 10,
                }}>
                Address
              </Text>
              <TextInput
                style={{
                  minWidth: '80%',
                  borderWidth: 1,
                  borderRadius: 5,
                  color: '#000',
                }}
                placeholder="Address"
                placeholderTextColor={'grey'}
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
              <Text
                style={{
                  minWidth: '80%',
                  color: '#000',
                  marginBottom: 10,
                }}>
                Phone
              </Text>
              <TextInput
                style={{
                  minWidth: '80%',
                  borderWidth: 1,
                  borderRadius: 5,
                  color: '#000',
                }}
                placeholder="phone"
                placeholderTextColor={'grey'}
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
              onPress={() => SignUpHandler()}>
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
    </ScrollView>
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
