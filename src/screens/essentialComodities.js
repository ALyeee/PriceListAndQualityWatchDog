import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
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

export default function EssentialComodities() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selected, setSelected] = useState('Islamabad');
  const [head, setHead] = useState([ 'Product', 'Unit', 'Price','Action']);
  const [head1, setHead1] = useState([ 'Product', 'Unit', 'Price']);
  const [userData, setUserData] = useState(null)
  const [furits, setFruits] = useState(null)
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [visible, setVisible] = useState(false)
  const [fruitName, setFruitName] = useState(null)
  const [unit, setUnit] = useState(null)
  const [price, setprice] = useState(null)
  const [isAdded, setIsAdded] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

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
    GetFruits()
    OnChangeCity('islamabad')
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
    axios.get(`http://localhost:8089/myfyp/api/dummy/getRecordByCatagoryAndCity?cat=essentialcommoditiea&city=${city}`)
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
        <Text style={{fontWeight: 'bold', fontSize: 30, textAlign:'center'}}>Essential Commodities Rates</Text>
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
            onPress={userData?.role === 'admin' ? null : onOpen}
            style={{
              borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              alignSelf: 'flex-start',
            }}>
            <Text style={{color: '#000', padding: 5}}>{userData?.role === 'admin' ? userData?.city : selected}</Text>
          </TouchableOpacity>
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
{/* <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
<Text style={{color:'#000'}}>Product</Text>
        <Text style={{color:'#000'}}>Unit</Text>
       <Text style={{color:'#000'}}>Price</Text>
       {userData?.role === 'admin' ? <Text style={{color:'#000'}}>Action</Text> : null}
</View> */}
 

     {/* { data?.map((res) => {
        return(
          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:15}}>
            {
              res.map(response => {
                console.log('====================================');
                console.log('aaa',response);
                console.log('====================================');
                return(
                    <Text style={{color:'#000', textAlign:'center'}}>{response}</Text>
                )
              })
            }
            {userData?.role === 'admin' ? <View style={{flexDirection:'row',justifyContent:'center'}} >
    <TouchableOpacity onPress={() =>{
      setVisible(true)
      console.log('====================================');
      console.log('res',res[2].toString());
      console.log('====================================');
      setIsEdit(true)
      setFruitName(res[0])
      setUnit(res[1])
      setprice(res[2].toString())
      }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>edit</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => _alertIndex(res)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>delete</Text>
      </View>
    </TouchableOpacity>
    </View> : null}
          </View>
        )
      })} */}

        </View>
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
                setSelected('faislabad');
                OnChangeCity('faisalabad')
              }}>
              <Box alignItems="center">
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  Faisalabad
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
