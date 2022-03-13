
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const App = () => {

  const [name, setName] = useState('')
  const [age, setAge] = useState(null)
  const [cgpa, setCgpa] = useState(null)
  const [isDisplayed, setisDisplayed] = useState(false)
  const AddStudentData=()=>{
    fetch('http://192.168.31.241/fyp_api/api/student/Addstudent', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
        },
    body: JSON.stringify({
    Name: name,
    Age: age,
    Cgpa: cgpa,
  
        })
      }).then(response => response.json()).catch((error)=>{
      console.log("Api call error");
      alert(error.message);
    });
  
}
  return (
    <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
      <View style={{flex:0.4, backgroundColor:'#0947ed', alignItems:"center", justifyContent:"center"}}>
        <Text style={{fontSize:24,textAlign:"center", color:"#FFFFFF"}}>Food Price List And Quality WatchDogs</Text>
      </View>
      <View style={{flex:0.6}}>
        <View style={{alignItems:"center", justifyContent:"center", marginTop:10, }}>
        <TextInput style={{minWidth:'80%', borderWidth:1,borderRadius:5, color:'#000'}} placeholder="Name" placeholderTextColor={"#000"} onChangeText={setName} value={name} />
        <View style={{alignItems:"center", justifyContent:"center", marginTop:10, }}>
        <TextInput style={{minWidth:'80%', borderWidth:1,borderRadius:5, color:'#000'}} placeholder="Age" placeholderTextColor={"#000"} onChangeText={setAge} value={age} />
          </View>
          <View style={{alignItems:"center", justifyContent:"center", marginTop:10, }}>
        <TextInput style={{minWidth:'80%', borderWidth:1,borderRadius:5, color:'#000'}} placeholder="Cgpa" placeholderTextColor={"#000"} onChangeText={setCgpa} value={cgpa} />
            </View>
        </View>
        <View style={{alignItems:"center", justifyContent:"center", marginTop:10,flexDirection:'row', justifyContent:'space-evenly' }}>
          <TouchableOpacity style={{backgroundColor:'#308bf6', borderRadius:5, minWidth:'30%', 
          minHeight:30, alignItems:'center', justifyContent:'center'}} onPress={AddStudentData}>
            <Text sytle={{color:'#000'}}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setisDisplayed(!isDisplayed)} style={{backgroundColor:'#308bf6', borderRadius:5, minWidth:'30%', minHeight:30,alignItems:'center', justifyContent:'center'}}>
            <Text sytle={{color:'#000'}}>
              Display
            </Text>
          </TouchableOpacity>
        </View>
        { isDisplayed ?
          <>
          <View style={{alignItems:"center", justifyContent:"center", marginTop:10 }}>
            <Text style={{color:'#000'}}>Name: {name}</Text>
          </View>
          <View style={{alignItems:"center", justifyContent:"center", marginTop:10, }}>
            <Text style={{color:'#000'}}>Age: {age}</Text>
          </View>
          <View style={{alignItems:"center", justifyContent:"center", marginTop:10, }}>
            <Text style={{color:'#000'}}>Cgpa: {cgpa}</Text>
          </View>
          </>
          : null
        }
        </View>
    </View>
  )
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

export default App;
