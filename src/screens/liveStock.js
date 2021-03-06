import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Table} from 'react-native-table-component';
import {Row} from 'react-native-table-component';
import {TableWrapper} from 'react-native-table-component';
import {Col} from 'react-native-table-component';
import {Rows} from 'react-native-table-component';
import {Actionsheet, Box, NativeBaseProvider, useDisclose} from 'native-base';
import { Cell } from 'react-native-table-component';

export default function LiveStock() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selected, setSelected] = useState('Islamabad');
  const [head, setHead] = useState([ 'Product', 'Unit', 'Price']);
  const [data, setData] = useState([
    ['Chicken', '1Kg', '400','1'],
    ['Eggs', '1Dozen', '150','1'],
    ['Beef', '1Kg', '750','1'],
    ['Mutton', '1Kg', '1050','1'],
  ]);

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
        <Text style={{fontWeight: 'bold', fontSize: 30}}>LiveStock Rates</Text>
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
          <Table borderStyle={{borderWidth: 0.5}}>
            <Row
              data={head}
              flexArr={[2, 1, 1]}
              style={styles.head}
              textStyle={styles.text}
            />
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
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, color: '#000'},
  row: {height: 28},
  text: {textAlign: 'center', color: '#000'},
});
