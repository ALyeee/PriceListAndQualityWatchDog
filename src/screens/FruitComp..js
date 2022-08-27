import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table} from 'react-native-table-component';
import {Row} from 'react-native-table-component';
import {TableWrapper} from 'react-native-table-component';
import {Col} from 'react-native-table-component';
import {Rows} from 'react-native-table-component';
import {Actionsheet, Box, Button, Modal, NativeBaseProvider, useDisclose} from 'native-base';
import { Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DataTable, Provider, Snackbar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

export default function FruitComp() {
  const [selected, setSelected] = useState('Islamabad');
  const [head, setHead] = useState([ 'Product', 'Unit', 'Price','Action']);
  const [head1, setHead1] = useState([ 'Product', 'Unit', 'Price']);
  const [userData, setUserData] = useState(null)
  const [furits, setFruits] = useState(null)
  const [furits2, setFruits2] = useState(null)
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [visible, setVisible] = useState(false)
  const [fruitName, setFruitName] = useState(null)
  const [unit, setUnit] = useState(null)
  const [price, setprice] = useState(null)
  const [isAdded, setIsAdded] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    {label: 'Islamabad', value: 'islamabad'},
    {label: 'Rawalpindi', value: 'rawalpindi'}, 
    {label: 'Faisalabad', value: 'faisalabad'},
    {label: 'Lahore', value: 'lahore'}
  ]);
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
    GetFruits()
  }, [])

  const GetFruits = () => {
    axios.get(`http://localhost:8089/myfyp/api/dummy/getRecordByCatagoryAndCity?cat=essentialcommoditiea&city=${userData?.city}`)
            .then(function (response) {
              console.log(response);
              console.log('====================================');
              console.log('log data',response.data);
              console.log('====================================');
              if(response.data === 'Found'){
                setFruits([])
              } else {
                let arrayFr = []
                let arrayFr1 = []
                let newArr = []
                let newArr1 = []
                setFruits(response.data)
                response?.data?.map((res) => {
                   arrayFr = [
                     res.pName,
                     res.pUnit,
                     res.pPrice,
                     1
                   ]
                   arrayFr1 = [
                     res.pName,
                     res.pUnit,
                     res.pPrice,
                   ]
                  newArr.push(arrayFr)
                  newArr1.push(arrayFr1)
                })
                setData(newArr)
                setData1(newArr1)
              }
            })
  }

  const AdddFruit = () => {
    axios.post(`http://localhost:8089/myfyp/api/dummy/AddEssentialAccommodaties?city=${userData?.city}`,{
      "pName":fruitName,
      "pPrice":price,
      "pUnit":unit
  }).then(function (res) {
    console.log('====================================');
    console.log('done',res);
    console.log('====================================');
    setVisible(false)
    setIsAdded(true)
    GetFruits()
    setTimeout(() => {
      setIsAdded(false)
    }, 2000);
  })  
  }
  const EditFruit = () => {
    axios.post(`http://localhost:8089/myfyp/api/dummy/UpdateEssentialAccommodaties?city=${userData?.city}`,{
      "pName":fruitName,
      "pPrice":price,
      "pUnit":unit
  }).then(function (res) {
    console.log('====================================');
    console.log('done',res);
    console.log('====================================');
    setVisible(false)
    setIsAdded(true)
    GetFruits()
    setTimeout(() => {
      setIsAdded(false)
    }, 2000);
  })  
  }
  const DeleteFruit = (data) => {
    console.log('====================================');
    console.log('data',data[2]);
    console.log('====================================');
    axios.post(`http://localhost:8089/myfyp/api/dummy/deleteEssentialAccommodaties?city=${userData?.city}`,{
      "pName":data[0],
      "pPrice":data[1],
      "pUnit":data[2]
  }).then(function (res) {
    console.log('====================================');
    console.log('done',res);
    console.log('====================================');
    setIsDeleted(true)
    GetFruits()
    setTimeout(() => {
      setIsDeleted(false)
    }, 2000);
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

  const _alertIndex = (data) => {
    alert(`This is row ${data}`);
  }

  const onDismissSnackBar = () => {
    setIsAdded(false)
  }
  const onDismissSnackBarDel = () => {
    setIsDeleted(false)
  }

  const OnChangeCity = (city) => {
    axios.get(`http://localhost:8089/myfyp/api/dummy/getRecordByCatagoryAndCity?cat=FRUIT&city=${city}`)
            .then(function (response) {
              console.log(response);
              if(response.data === 'Found'){
                setFruits([])
              } else {
                let arrayFr = []
                let arrayFr1 = []
                let newArr = []
                let newArr1 = []
                setFruits(response.data)
                response?.data?.map((res) => {
                   arrayFr = [
                     res.pName,
                     res.pUnit,
                     res.pPrice,
                     1
                   ]
                   arrayFr1 = [
                     res.pName,
                     res.pUnit,
                     res.pPrice,
                   ]
                  newArr.push(arrayFr)
                  newArr1.push(arrayFr1)
                })
                setData(newArr)
                setData1(newArr1)
              }
            })
  }
  const OnChangeCity2 = (city) => {
    axios.get(`http://localhost:8089/myfyp/api/dummy/getRecordByCatagoryAndCity?cat=FRUIT&city=${city}`)
            .then(function (response) {
              console.log(response);
              if(response.data === 'Found'){
                setFruits2([])
              } else {
                let arrayFr = []
                let arrayFr1 = []
                let newArr = []
                let newArr1 = []
                setFruits2(response.data)
                response?.data?.map((res) => {
                   arrayFr = [
                     res.pName,
                     res.pUnit,
                     res.pPrice,
                     1
                   ]
                   arrayFr1 = [
                     res.pName,
                     res.pUnit,
                     res.pPrice,
                   ]
                  newArr.push(arrayFr)
                  newArr1.push(arrayFr1)
                })
                setData2(newArr)
                setData3(newArr1)
              }
            })
  }

  return (
    <View style={{flex: 1}}>
        
        
      <View
        style={{
          flex: 0.3,
          backgroundColor: 'red',
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 30, textAlign:'center'}}>Fruits Rates Comparison</Text>
      </View>
      <ScrollView style={{flex:1}} nestedScrollEnabled={true}>
      <View
        style={{
          flex: 0.8,
          maxWidth: '100%',
          alignItems: 'center',
          minWidth: '100%',
        }}>
        <View style={{minWidth: '90%'}}>
        <DropDownPicker
      open={open1}
      value={value1}
      items={items}
      setOpen={setOpen1}
      setValue={setValue1}
      setItems={setItems}
      onChangeValue={city => OnChangeCity(city)}
      zIndex={100}
      style={{maxWidth:'50%'}}
      containerStyle={{maxWidth:'80%'}}
    />
        </View>
       {userData?.role === 'admin' ? 
       <View style={{minWidth: '90%'}}>
          <TouchableOpacity
            onPress={() => {
              setIsEdit(false)
              setFruitName(null)
              setUnit(null)
              setprice(null)
              setVisible(true)
            }}
            style={{
              // borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}>
            <Text style={{color: '#78B7BB', padding: 5}}>+ Add New</Text>
          </TouchableOpacity>
        </View> : null
        }
        <View
          style={{
            flex: 1,
            minWidth: '90%',
            marginTop: 70,
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
          {
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
          }
        </Table>}


        </View>


        <View style={{minWidth: '90%', marginTop:100}}>
        <DropDownPicker
      open={open2}
      value={value2}
      items={items}
      setOpen={setOpen2}
      setValue={setValue2}
      setItems={setItems}
      onChangeValue={city => OnChangeCity2(city)}
      zIndex={100}
      style={{maxWidth:'50%'}}
      containerStyle={{maxWidth:'80%'}}
    />
        </View>
       {userData?.role === 'admin' ? 
       <View style={{minWidth: '90%', marginTop:70}}>
          <TouchableOpacity
            onPress={() => {
              setIsEdit(false)
              setFruitName(null)
              setUnit(null)
              setprice(null)
              setVisible(true)
            }}
            style={{
              // borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              alignSelf: 'flex-end',
            }}>
            <Text style={{color: '#78B7BB', padding: 5}}>+ Add New</Text>
          </TouchableOpacity>
        </View> : null
        }
        <View
          style={{
            flex: 1,
            minWidth: '90%',
            marginTop: 70,
            maxWidth: '100%',
          }}>
          { userData?.role === 'admin' ? <Table borderStyle={{borderColor: '#000'}}>
          <Row data={head} style={styles.head} textStyle={styles.text}/>
          {
            data2?.map((rowData, index) => {
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
          {
            data3?.map((rowData, index) => {
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
        </Table>}


        </View>
      </View>
      <NativeBaseProvider>
        
        <Modal isOpen={visible} onClose={() => setVisible(false)}>
        <Modal.Content maxWidth="500px">
          <Modal.CloseButton />
          <Modal.Header>Add Essential Commodities</Modal.Header>
          <Modal.Body>
          <TextInput
            style={{
              minWidth: '80%',
              borderWidth: 1,
              borderRadius: 5,
              color: '#000',
            }}
            placeholder="EssentialComodities Name"
            placeholderTextColor={'#000'}
            onChangeText={setFruitName}
            value={fruitName}
          />
          <View
            style={{
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
              placeholder="Unit"
              placeholderTextColor={'#000'}
              onChangeText={setUnit}
              value={unit}
            />
          </View>
          <View
            style={{
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
              placeholder="Price"
              placeholderTextColor={'#000'}
              onChangeText={setprice}
              value={price}
            />
          </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setVisible(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
                !isEdit ?
              AdddFruit() :
      EditFruit()

            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      </NativeBaseProvider>
      <Snackbar
        visible={isAdded}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'cancel',
          onPress: () => {
            setIsAdded(false)
          },
        }}>
       {!isEdit ? "Essential Commodities Added SuccessFully" : "Essential Commodities Updated Successfully"}
      </Snackbar>
      <Snackbar
        visible={isDeleted}
        onDismiss={onDismissSnackBarDel}
        action={{
          label: 'cancel',
          onPress: () => {
            setIsAdded(false)
          },
        }}>
       {"Essential Commodities Deleted Successfully"}
      </Snackbar>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6, color:'#000' },
  row: { flexDirection: 'row' },
  btn: { width: 35, height: 18,  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#78B7BB' }
});
