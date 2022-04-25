import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table} from 'react-native-table-component';
import {Row} from 'react-native-table-component';
import {TableWrapper} from 'react-native-table-component';
import {Col} from 'react-native-table-component';
import {Rows} from 'react-native-table-component';
import {Actionsheet, Box, NativeBaseProvider, useDisclose} from 'native-base';
import { Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Fruits() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selected, setSelected] = useState('Islamabad');
  const [head, setHead] = useState([ 'Product', 'Unit', 'Price','Action']);
  const [data, setData] = useState([
    ['Apple', '1Kg', '150','1'],
    ['Banana', '1 dozen', '80','2'],
    ['mango', '1Kg', '150','3'],
  ]);
  const [userData, setUserData] = useState(null)
  const [furits, setFruits] = useState(null)

  const UserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userData')
      console.log('====================================');
      console.log('jsonValue',JSON.parse(jsonValue));
      console.log('====================================');
      setUserData(JSON.parse(jsonValue))
    } catch(e) {  
      // error reading value
    }
  }
  useEffect( () => {
    UserData()
    axios.get(`http://localhost:8089/myfyp/api/dummy/getRecordByCatagoryAndCity?cat=FRUIT&city=${userData?.city}`)
            .then(function (response) {
              console.log(response.data);
              if(response.data === 'Found'){
                setFruits([])
              } else {
                setFruits(response.data[0])
              }
            })
  }, [])

  const element = (data, index) => (
    <View style={{flexDirection:'row'}} >
    <TouchableOpacity onPress={() => _alertIndex(data)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>edit</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => _alertIndex(data)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>delete</Text>
      </View>
    </TouchableOpacity>
    </View>
  );

  const _alertIndex = (data) => {
    alert(`This is row ${data}`);
  }

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
        <Text style={{fontWeight: 'bold', fontSize: 30}}>Fruits Rates</Text>
      </View>
      <View
        style={{
          flex: 0.8,
          maxWidth: '100%',
          alignItems: 'center',
          minWidth: '100%',
        }}>
        <View style={{minWidth: '90%'}}>
          <TouchableOpacity
            onPress={userData.role === 'admin' ? null : onOpen}
            style={{
              borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              alignSelf: 'flex-start',
            }}>
            <Text style={{color: '#000', padding: 5}}>{userData?.role === 'admin' ? userData?.city : selected}</Text>
          </TouchableOpacity>
        </View>
        <View style={{minWidth: '90%'}}>
          <TouchableOpacity
            // onPress={onOpen}
            style={{
              // borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}>
            <Text style={{color: '#78B7BB', padding: 5}}>+ Add New</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            minWidth: '90%',
            marginTop: 20,
            maxWidth: '100%',
          }}>
          <Table borderStyle={{borderColor: '#000'}}>
          <Row data={head} style={styles.head} textStyle={styles.text}/>
          {
            data.map((rowData, index) => {
              // console.log('row data',rowData);
              return (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => {
                    // console.log('cellfsts',cellData);
                    return(
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(rowData, index) : cellData} textStyle={styles.text}/>
                  )})
                }
              </TableWrapper>
            )})
          }
        </Table>
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
