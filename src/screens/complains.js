import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Actionsheet, Box, NativeBaseProvider, useDisclose} from 'native-base';
import { RadioButton } from 'react-native-paper';
import { Table } from 'react-native-table-component';
import { TableWrapper } from 'react-native-table-component';
import { Cell } from 'react-native-table-component';
import { Row } from 'react-native-table-component';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Complains({navigation}) {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selected, setSelected] = useState('Select City');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(null);
  const [value, setValue] = React.useState('Price');
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [userData, setUserData] = useState(null)
  const [complains, setComplains] = useState()
  const [head1, setHead1] = useState([ 'Image', 'Name', 'City', 'Shop Name','Address', 'Complain']);
  const [head, setHead] = useState([ 'Product', 'Unit', 'Price','Action']);


  const UserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userData')
      console.log('====================================');
      console.log('jsonValue',JSON.parse(jsonValue));
      console.log('====================================');
      setUserData(JSON.parse(jsonValue))
      const userCity = JSON.parse(jsonValue)
      setSelected(userCity.city)
    } catch(e) {  
      // error reading value
    }
  }
  useEffect( () => {
    UserData()
    // GetFruits()
    OnChangeCity('islamabad')
  }, [])

  const OnChangeCity = (city) => {
    axios.get(`http://localhost:8089/myfyp/api/dummy/getcomplain?city=${city}`)
            .then(function (response) {
              console.log(response.data);
              if(response.data === 'Found'){
                setFruits([])
              } else {
                let arrayFr = []
                let arrayFr1 = []
                let newArr = []
                let newArr1 = []
                setComplains(response.data)
                response?.data?.map((res) => {
                   arrayFr = [
                     res.city,
                     'null',
                     res.shop_name,
                     res.address,
                     res.complain_type,
                     1
                   ]
                   arrayFr1 = [
                     'null',
                    res.city,
                    res.shop_name,
                    res.address,
                    res.complain_type,
                   ]
                  newArr.push(arrayFr)
                  newArr1.push(arrayFr1)
                })
                console.log('====================================');
                console.log('data1',arrayFr1);
                console.log('====================================');
                setData(newArr)
                setData1(newArr1)
              }
            })
  }

  const element = (data, index) => (
    <View style={{flexDirection:'row'}} >
    <TouchableOpacity onPress={() =>{ setVisible(true)
      setIsEdit(true)
      setFruitName(data[0])
      setUnit(data[1])
      setprice(data[2].toString())}}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>edit</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {DeleteFruit(data)}}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>delete</Text>
      </View>
    </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View
        style={{
          backgroundColor: 'red',
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight:'10%'
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}>All Complains</Text>
      </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddComplains')} style={{backgroundColor:'red', minHeight:50, borderRadius:10 ,maxWidth:'35%', justifyContent:'center', alignItems:'center',marginTop:20, marginLeft:20,}}>
            <Text>+ Add Complain</Text>
        </TouchableOpacity>
     <View style={{minWidth: '90%', alignSelf: 'center',}}>
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
            flex: 1,
            minWidth: '90%',
            marginTop: 20,
            maxWidth: '100%',
          }}>
          { userData?.role === 'admin' ? <Table borderStyle={{borderColor: '#000'}}>
          <Row data={head} style={styles.head} textStyle={styles.text}/>
          {
            data?.map((rowData, index) => {
              // console.log('row data',rowData);
              return (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => {
                    return(
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(rowData, index) : cellData} textStyle={styles.text}/>
                  )})
                }
              </TableWrapper>
            )})
          }
          </Table> : <Table borderStyle={{borderColor: '#000'}}>
          <Row data={head1} style={styles.head} textStyle={styles.text}/>
          {/* {
            data1?.map((rowData, index) => {
              // console.log('row data',rowData);
              return (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => {
                    return(
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(rowData, index) : cellData} textStyle={styles.text}/>
                  )})
                }
              </TableWrapper>
            )})
          } */}
          </Table>}


          </View>
      <NativeBaseProvider>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item
              onPress={() => {
                onClose();
                setSelected('Islamabad');
                OnChangeCity('islamabad')
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
                OnChangeCity('rawalpindi')
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
                OnChangeCity('karachi')
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
                OnChangeCity('lahore')
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
  head: { height: 50, backgroundColor: '#808B97' },
  text: { margin: 5, color:'#000' },
  row: { flexDirection: 'row' },
  btn: { width: 40, height: 18,  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#78B7BB' }
});
