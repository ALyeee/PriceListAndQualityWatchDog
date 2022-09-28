import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker/src/index';
import {Actionsheet, Box, NativeBaseProvider, useDisclose} from 'native-base';
import {RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'react-native-check-box';
import axios from 'axios';
const fs = RNFetchBlob.fs;
let imagePath = null;

import {useNavigation} from '@react-navigation/native';

export default function AddComplains() {
  const navigate = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selected, setSelected] = useState('Select City');
  const [shopName, setShopName] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [filePath, setFilePath] = React.useState(null);
  const [fileData, setfileData] = React.useState(null);
  const [fileUri, setfileUri] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isChecked, setisChecked] = useState(false);
  const [items, setItems] = useState([
    {label: 'Unhygienic', value: 'unhygienic'},
    {label: 'Over Weight', value: 'overWeight'},
    {label: 'Over Price', value: 'price'},
  ]);

  const UserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userData');
      console.log('====================================');
      console.log('jsonValue', JSON.parse(jsonValue));
      console.log('====================================');
      setUserData(JSON.parse(jsonValue));
      const userCity = JSON.parse(jsonValue);
      setSelected(userCity.city);
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    UserData();
  }, []);

  // Launch Camera
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0,
      includeBase64: true,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = {uri: res.uri};
      }
      console.log('response', res.assets[0]);
      setfileData(res.assets[0].base64);
      setfileUri(res.assets[0].uri);
      // setFilePath(res)
    });
  };
  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = {uri: res.uri};
        console.log('response', res.assets[0]);
        setfileData(res.assets[0].base64);
        setfileUri(res.assets[0].uri);
        setFilePath(res);
        // ConvertBase64(res.assets[0].uri)
      }
    });
  };

  const ConvertBase64 = file => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', file)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        // here's base64 encoded image
        console.log(base64Data);
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  };

  const AdddFruit = () => {
    axios
      .post(
        `http://localhost:8089/myfyp/api/dummy/addFruit?city=${userData?.city}`,
        {
          pName: fruitName,
          pPrice: price,
          pUnit: unit,
        },
      )
      .then(function (res) {
        console.log('====================================');
        console.log('done', res);
        console.log('====================================');
        setVisible(false);
        setIsAdded(true);
        GetFruits();
        setTimeout(() => {
          setIsAdded(false);
        }, 2000);
      });
  };
  const AddComplain = () => {
    console.log('====================================');
    console.log(
      'shop_name',
      name,
      'name',
      isChecked ? '' : userData.name,
      'complain_type',
      value,
      'address',
      address,
      'city',
      selected,
    );
    console.log('====================================');
    console.log(fileData);
    axios
      .post(`http://localhost:8089/myfyp/api/dummy/addComplain`, {
        shop_name: name,
        name: isChecked ? '' : userData.name,
        complain_type: value,
        image: fileData,
        address: address,
        city: selected,
        email: userData.email,
      })
      .then(function (res) {
        console.log('====================================');
        console.log('complain added', res);
        console.log('====================================');
        ToastAndroid.show('Complain added successfully', ToastAndroid.SHORT);
        navigate.goBack();
      });
  };

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
        <Text style={{fontWeight: 'bold', fontSize: 30}}>Complains</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            minWidth: '80%',
          }}>
          <TouchableOpacity onPress={cameraLaunch} style={styles.button}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={imageGalleryLaunch} style={styles.button}>
            <Text style={styles.buttonText}>Select Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={{minWidth: '90%', alignItems: 'center'}}>
          {fileUri ? (
            <Image source={{uri: fileUri}} style={{width: 320, height: 190}} />
          ) : (
            <Text style={{color: '#000'}}> No Image</Text>
          )}
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: 10,
          }}>
          <View
            style={{minWidth: '90%', alignItems: 'center', marginBottom: 10}}>
            <TouchableOpacity
              onPress={onOpen}
              style={{
                borderWidth: 1,
                marginTop: 20,
                borderRadius: 10,
                alignSelf: 'flex-start',
              }}>
              <Text style={{color: '#000', padding: 5}}>{selected}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
            }}>
            <CheckBox
              style={{
                alignSelf: 'flex-start',
              }}
              onClick={() => {
                setisChecked(!isChecked);
              }}
              isChecked={isChecked}
            />
            <Text style={{color: 'black', marginLeft: 10}}>Anonymous</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {/* <Text
              style={{
                color: 'black',
                alignSelf: 'flex-start',
                marginBottom: 5,
              }}>
              Shop Name
            </Text> */}
            <TextInput
              style={{
                minWidth: '90%',
                borderWidth: 1,
                borderRadius: 5,
                color: '#000',
              }}
              placeholder="Shop Name"
              placeholderTextColor={'#000'}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {/* <Text
              style={{
                color: 'black',
                alignSelf: 'flex-start',
                marginBottom: 5,
              }}>
              Shop Name
            </Text> */}
            <TextInput
              style={{
                minWidth: '90%',
                borderWidth: 1,
                borderRadius: 5,
                color: '#000',
              }}
              placeholder="Shop Address"
              placeholderTextColor={'#000'}
              onChangeText={setAddress}
              value={address}
            />
          </View>
        </View>

        <View style={{marginTop: 20, minWidth: '90%'}}>
          <Text style={{color: '#000', fontSize: 15}}>Complain About</Text>
        </View>
        <View style={{marginTop: 10, maxWidth: '90%'}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={{minWidth: '90%', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => AddComplain()}
            style={{
              borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: '#000', padding: 5}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <NativeBaseProvider>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item
              onPress={() => {
                onClose();
                setSelected('Islamabad');
              }}>
              <Box alignItems="center">
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  Islamabad
                </Text>
              </Box>
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onClose();
                setSelected('Rawalpindi');
              }}>
              <Box alignItems="center">
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  Rawalpindi
                </Text>
              </Box>
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onClose();
                setSelected('Karachi');
              }}>
              <Box alignItems="center">
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  Karachi
                </Text>
              </Box>
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onClose();
                setSelected('Lahore');
              }}>
              <Box alignItems="center">
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  Lahore
                </Text>
              </Box>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6, color: '#000'},
  row: {flexDirection: 'row'},
  btn: {width: 40, height: 18, borderRadius: 2},
  btnText: {textAlign: 'center', color: '#78B7BB'},
  button: {
    width: 100,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
  },
});
