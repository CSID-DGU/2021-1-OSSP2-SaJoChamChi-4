import React, { useState, useRef, useEffect, useContext } from "react";
import { ProgressContext, UserContext } from "../../contexts";
import styled from "styled-components/native";
import { Text, StyleSheet, View } from "react-native";
import { Input, Button } from "../../components";
import { validateEmail, removeWhitespace } from "../../utils/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from 'react-native-picker-select';
import {CommonActions} from "@react-navigation/native";
import { validateDate } from "../../utils/common";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;

const Label = styled.Text`
  align-items: flex-start;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 6px;
  color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingTop: 20,
      paddingHorizontal: 10,
      paddingBottom: 20,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
      color: 'black',
      marginBottom: 10,
  },
  inputAndroid:{
    fontSize: 16,
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 10,
   }
});
// input item -> fetch data + Barcode icon data to back with data with (barcode) + barcode matching with data

const UpdateRefri = ({route,navigation}) => {
  console.log(route)
    const user = useContext(UserContext);

    const [id, setId] = useState(user.user.usr_Id);
    const [Pname, setPname] = useState("");
    const [Number, setNumber] = useState("");
    const [Epdate, setEpdate] = useState("");
    const [Indate, setIndate] = useState("");
    const [Frozen, setFrozen] = useState("");
    const [Foodid, setFoodid] = useState("");
    const [Fkind, setFkind] = useState("");

    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
  

    const nicknameRef = useRef();
    const emailRef = useRef();
    const nameRef = useRef();
    const didMountRef = useRef();
    //route.params.rf_Epdate
    useEffect(()=>{
      setPname(route.params.data.rf_Pname);
      setNumber(route.params.data.rf_Number);
      setEpdate(route.params.data.rf_Epdate.substr(0,10));
      setIndate(route.params.data.rf_Indate.substr(0,10));
      setFrozen(route.params.data.rf_Frozen);
      setFoodid(route.params.data.rf_Foodid);
      setFkind(route.params.data.rf_Fkind);
    },[])

    useEffect(() => {
        if (didMountRef.current) {
          let _errorMessage = '';
          if (!Pname) {
            _errorMessage = '???????????? ??????????????????!';
          } else if (!Number) {
            _errorMessage = '????????? ??????????????????!';
          } else if (!Epdate) {
            _errorMessage = '??????????????? ??????????????????!';
          } else if (!Indate) {
            _errorMessage = '??????????????? ??????????????????';
          }else if(!validateDate(Epdate)){
            _errorMessage='????????? YYYY-MM-DD???????????? ??????????????????'
          }else if(!validateDate(Indate)){
            _errorMessage='????????? YYYY-MM-DD???????????? ??????????????????'
          }else if (!Frozen) {
            _errorMessage = '??????/????????? ???????????????';
          }else if (!Foodid) {
            _errorMessage = '??????????????? ???????????????';
          }else if (!Fkind) {
            _errorMessage = '???????????? ???????????????';
          } else {
            _errorMessage = '';
          }
          setErrorMessage(_errorMessage);
        } else {
          didMountRef.current = true;
        }
      }, [Pname, Number, Epdate, Indate,Frozen,Foodid,Foodid,Fkind]);
    
      useEffect(() => {
        setDisabled(
          !(Pname && Number && Epdate && Indate && !errorMessage)
        );
      }, [Pname, Number, Epdate, Indate, errorMessage]);
    
      const _handleSignupButtonPress = async () => {
        try {
          Insert(Pname, Number, Epdate, Indate, Frozen, Foodid, Fkind, id);
        } catch (e) {
          Alert.alert('Signup Error', e.message);
        } finally {
          alert("Success!\n ?????????????????????!");
          navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'MyRefri'}]}));
        }
      };
    
      Insert =  (Pname, Number, Epdate, Indate, Frozen, Foodid, Fkind, id)  => {
        fetch('http://34.64.235.196:3344/refri/Update',{
          method: "post",
          headers :{
              "content-Type" : "application/json",
          },
          body : JSON.stringify({
              rf_Pname : Pname,
              rf_Number : Number,
              rf_Epdate : Epdate,
              rf_Indate : Indate,
              rf_Frozen : Frozen,
              rf_Foodid : Foodid,
              rf_FKind : Fkind,
              rf_usr : id,    
          })
     })
    };
    return(
        <KeyboardAwareScrollView extraScrollHeight={20}>
        <Container>
            
            <Text style={{fontSize: 24, textAlign : 'center'}}> ?????? : {Pname} ?????? ???????????? </Text>
            
        <Input
          ref={nameRef}
          label="Number"
          value={Number}
          onChangeText={text => setNumber(text)}
          onSubmitEditing={() => {
            setNumber(Number);
            emailRef.current.focus();
          }}
          onBlur={() => setNumber(Number)}
          placeholder="??????"
          returnKeyType="next"
        />
        <Input
          label="Epdate"
          value={Epdate}
          onChangeText={text => setEpdate(text)}
          onSubmitEditing={() => nicknameRef.current.focus()}
          placeholder="????????????"
          returnKeyType="next"
        />
        <Input
          ref={nicknameRef}
          label="Indate"
          value={Indate}
          onChangeText={text => setIndate(text)}
          onSubmitEditing={() => {
            setIndate(Indate.trim());
          }}
          onBlur={() => setIndate(Indate)}
          placeholder="????????????"
          returnKeyType="next"
        />
 <Label style={{textAlign : 'left'}}>??????/????????????</Label>
        <RNPickerSelect onValueChange={(value)=>setFrozen(value)}
        placeholder={{
          label: '??????/????????????',
          value: null,}}
         style={{ ...pickerSelectStyles }}
         items={[{label : '??????', value:'0'},{label : '??????', value:'1'}]}
         value = {Frozen}/>

        <Label style={{textAlign : 'left'}}>????????????</Label>
        <RNPickerSelect onValueChange={(value)=>setFkind(value)}
        value = {Fkind}
        placeholder={{
          label: '??????????????? ??????????????????',
          value: null,}}
         style={{ ...pickerSelectStyles }}
         items={[{label : '??????', value:'1'},{label : '?????????', value:'2'},{label : '??????/?????????', value:'3'},
         {label : '??????', value:'4'},{label : '??????', value:'5'}, {label : '?????????', value:'6'}, 
         {label : '????????????', value:'7'}, {label : '??????/??????', value:'8'}, {label : '????????????', value:'9'}, {label : '??????', value:'10'}]}/>
        
        
        <Label style={{textAlign : 'left'}}>?????????</Label>
        <RNPickerSelect onValueChange={(value)=>setFoodid(value)}
        value = {Foodid}
        placeholder={{
          label: '???????????? ??????????????????',
          value: null,}}
         style={{ ...pickerSelectStyles }}
         
         items={[{label : '????????????', value:'1'},{label : '?????????', value:'2'},{label : '?????????', value:'3'},
         {label : '???', value:'4'},{label : '??????', value:'5'}, {label : '??????', value:'6'}, 
         {label : '??????', value:'7'}, {label : '???', value:'8'}, {label : '??????', value:'9'}, {label : '?????????', value:'10'},
         {label : '??????', value:'11'}, {label : '??????', value:'12'}, {label : '??????', value:'13'}, {label : '??????', value:'14'},
         {label : '??????', value:'15'}, {label : '??????', value:'16'}, {label : '??????', value:'17'}, {label : '??????', value:'18'},
         {label : '????????????', value:'19'}, {label : '?????????', value:'20'}, {label : '?????????', value:'21'}, {label : '?????????', value:'22'},
         {label : '????????????', value:'23'}, {label : '??????', value:'24'}, {label : '??????', value:'25'}, {label : '??????', value:'26'},
         {label : '??????', value:'27'}, {label : '??????', value:'28'}, {label : '??????', value:'29'}, {label : '???', value:'30'},
         {label : '?????????', value:'31'}, {label : '??????', value:'32'}, {label : '???', value:'33'}, {label : '?????????', value:'34'},
         {label : '??????', value:'35'}, {label : '??????', value:'36'}, {label : '??????', value:'37'}, {label : '?????????', value:'38'},
         {label : '????????????', value:'39'}, {label : '?????????', value:'40'}, {label : '???', value:'41'}, {label : '?????????', value:'42'},
         {label : '????????????', value:'43'}, {label : '??????', value:'44'}]}/>
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="??????"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
          containerStyle={{ width: 300 }}
        />
        <Button
          title="MyRefri"
          onPress={() =>    navigation.navigate('MyRefri')}
          containerStyle={{ width: 300 }}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default UpdateRefri;
