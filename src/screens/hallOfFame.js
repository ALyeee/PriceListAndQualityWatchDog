import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Actionsheet, Box, NativeBaseProvider, useDisclose} from 'native-base';
import {RadioButton} from 'react-native-paper';
import {Table} from 'react-native-table-component';
import {TableWrapper} from 'react-native-table-component';
import {Cell} from 'react-native-table-component';
import {Row} from 'react-native-table-component';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HallOfFame({navigation}) {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selected, setSelected] = useState('Select City');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(null);
  const [value, setValue] = React.useState('Price');
  const [data, setData] = useState([]);
  const [dataComplaint, setDataComplaint] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [data1, setData1] = useState([]);
  const [userData, setUserData] = useState({});
  const [complains, setComplains] = useState();
  const [head1, setHead1] = useState([
    'Image',
    'Name',
    'City',
    'Shop Name',
    'Address',
    'Complain',
  ]);
  const [head, setHead] = useState(['Product', 'Unit', 'Price', 'Action']);
  const [loading, setLoading] = useState(false);

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
    // GetFruits()
    OnChangeCity('islamabad');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      OnChangeCity('islamabad');
    }, []),
  );

  const OnChangeCity = async city => {
    setLoading(true);
    const jsonValue = JSON.parse(await AsyncStorage.getItem('@userData'));
    console.log(jsonValue.email);
    axios
      .get(
        `http://localhost:8089/myfyp/api/dummy/getHallOfFameByCity?city=${jsonValue.city}`,
      )
      .then(function (response) {
        console.log('this is the current response', response.data);
        setDataComplaint(response.data);
        if (response.data === 'Found') {
          setFruits([]);
        } else {
          let arrayFr = [];
          let arrayFr1 = [];
          let newArr = [];
          let newArr1 = [];
          setComplains(response.data);
          response?.data?.map(res => {
            arrayFr = [
              res.city,
              'null',
              res.shop_name,
              res.address,
              res.complain_type,
              1,
            ];
            arrayFr1 = [
              'null',
              res.city,
              res.shop_name,
              res.address,
              res.complain_type,
            ];
            newArr.push(arrayFr);
            newArr1.push(arrayFr1);
          });
          console.log('====================================');
          console.log('data1', arrayFr1);
          console.log('====================================');
          setData(newArr);
          setData1(newArr1);
        }
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const element = (data, index) => (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          setIsEdit(true);
          setFruitName(data[0]);
          setUnit(data[1]);
          setprice(data[2].toString());
        }}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>edit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          DeleteFruit(data);
        }}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View style={styles.card}>
        <Text style={styles.amount}>{item.UEmail}</Text>
        <Text style={styles.amount}>{item.Counter}</Text>
      </View>
      {/* <View style={styles.detsContainer}>
        <Text style={[styles.detsStyler, styles.marginlizer]}>
          {item.donationType}
        </Text>
        <Text style={styles.detsStyler}>{item.paymentMethod}</Text>
      </View> */}
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#f2f2f2' : '#f7f7f7';
    const color = 'black';
    return (
      <Item
        item={item}
        onPress={() => {
          // rowHandler(item);
          setSelectedId(item.id);
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: 'red',
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '10%',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}>Hall Of Fame</Text>
      </View>

      <View style={{minWidth: '90%', alignSelf: 'center', marginTop: 10}}>
        <TouchableOpacity
          // onPress={onOpen}
          style={{
            borderWidth: 1,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: 'flex-start',
          }}
          disabled={userData?.role === 'admin' ? true : false}>
          <Text style={{color: '#000', padding: 5}}>{selected}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <SafeAreaView>
          <View style={styles.headingContainer}>
            <Text style={styles.headerText}>Name</Text>

            <Text style={styles.headerText}>Complain Count</Text>
          </View>
          <FlatList
            data={dataComplaint}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
      </View>
      <NativeBaseProvider>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item
              onPress={() => {
                onClose();
                setSelected('Islamabad');
                OnChangeCity('islamabad');
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
                OnChangeCity('rawalpindi');
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
                OnChangeCity('karachi');
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
                OnChangeCity('lahore');
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
  mainContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    color: '#000',
    marginHorizontal: 2,
    fontSize: 12,
  },
  containerStyle: {
    backgroundColor: 'white',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: '#e4003b',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalContent: {
    // borderColor: '#e4003b',
    // borderWidth: 2,
    height: '100%',
  },
  label: {
    marginLeft: 30,
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  values: {
    color: 'black',
    marginRight: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonClose: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 5,
  },
  textStyle: {
    backgroundColor: '#e4003b',
    fontSize: 15,
    color: 'white',
    borderRadius: 55,
    marginTop: 15,
    padding: 8,
  },
  bygWrapper: {
    marginTop: 30,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 1,
    width: 360,
    marginTop: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  amount: {
    fontSize: 11,
    color: 'black',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detsStyler: {
    fontSize: 15,
    color: 'black',
  },
  marginlizer: {
    marginLeft: 5,
  },
  headingContainer: {
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 20,
  },
});
