import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';

import {Actionsheet, Box, NativeBaseProvider, useDisclose} from 'native-base';
import { RadioButton } from 'react-native-paper';

export default function Complains() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selected, setSelected] = useState('Select City');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(null);
  const [value, setValue] = React.useState('Price');

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
          flex: 0.8,
          maxWidth: '100%',
          alignItems: 'center',
          minWidth: '100%',
        }}>
        
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <TextInput
            style={{
              minWidth: '90%',
              borderWidth: 1,
              borderRadius: 5,
              color: '#000',
            }}
            placeholder="Shopkeeper Name"
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
                minWidth: '90%',
                borderWidth: 1,
                borderRadius: 5,
                color: '#000',
              }}
              placeholder="Shopkeeper Address"
              placeholderTextColor={'#000'}
              onChangeText={setPass}
              value={pass}
            />
          </View>
        </View>
        <View style={{minWidth: '90%',alignItems:'center'}}>
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
        <View style={{marginTop:20}}>
            <Text style={{color:'#000',fontSize:22}}>Complain About</Text>
        </View>
        <View style={{marginTop:10}}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{minWidth:'90%'}}>
        <Text style={{color:'#000'}}>Price</Text>
        <RadioButton value="Price" />
      </View>
      <View>
        <Text style={{color:'#000'}}>Hygene</Text>
        <RadioButton value="Hygene" />
      </View>
      <View>
        <Text style={{color:'#000'}}>Weight</Text>
        <RadioButton value="Weight" />
      </View>
    </RadioButton.Group>
        </View>
        <View style={{minWidth: '90%',alignItems:'center'}}>
          <TouchableOpacity
            // onPress={}
            style={{
              borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              minWidth:'50%',
              alignItems:'center'
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
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6, color:'#000' },
  row: { flexDirection: 'row' },
  btn: { width: 40, height: 18,  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#78B7BB' }
});
