import React, { useState, useRef, useEffect, useContext } from "react";
import { ProgressContext, UserContext } from "../../contexts";
import styled from "styled-components/native";
import { Text } from "react-native";
import { Input, Button } from "../../components";
import { validateEmail, removeWhitespace } from "../../utils/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

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
  
    const dayRef = useRef();
    const addressRef = useRef();
    const birthRef = useRef();
    const nicknameRef = useRef();
    const emailRef = useRef();
    const nameRef = useRef();
    const didMountRef = useRef();
    //route.params.rf_Epdate
    useEffect(()=>{
      setPname(route.params.data.rf_Pname);
      setNumber(route.params.data.rf_Number);
      setEpdate(route.params.data.rf_Epdate);
      setIndate(route.params.data.rf_Indate);
      setFrozen(route.params.data.rf_Frozen.toString());
      setFoodid(route.params.data.rf_Foodid);
      setFkind(route.params.data.rf_Fkind);
    },[])

    useEffect(() => {
        if (didMountRef.current) {
          let _errorMessage = '';
          if (!Pname) {
            _errorMessage = '상품명을 입력해주세요!';
          } else if (!Number) {
            _errorMessage = '수량을 입력해주세요!';
          } else if (!Epdate) {
            _errorMessage = '유통기한을 입력해주세요!';
          } else if (!Indate) {
            _errorMessage = '구매일자를 입력해주세요';
          }else if (!Frozen) {
            _errorMessage = '냉동/냉장을 선택하세요';
          }else if (!Foodid) {
            _errorMessage = '음식분류를 입력하세요';
          }else if (!Fkind) {
            _errorMessage = '식품군을 입력하세요';
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
          alert("Success!\n 수정되었습니다!");
          navigation.navigate('MyRefri');
        }
      };
    
      Insert =  (Pname, Number, Epdate, Indate, Frozen, Foodid, Fkind, id)  => {
        fetch('http://172.30.1.21:3344/refri/Update',{
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
            <Text style={{fontSize: 24, textAlign : 'center'}}> 수정하기 </Text>
            
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
          placeholder="수량"
          returnKeyType="next"
        />
        <Input
          label="Epdate"
          value={Epdate}
          onChangeText={text => setEpdate(text)}
          onSubmitEditing={() => nicknameRef.current.focus()}
          placeholder="유통기한"
          returnKeyType="next"
        />
        <Input
          ref={nicknameRef}
          label="Indate"
          value={Indate}
          onChangeText={text => setIndate(text)}
          onSubmitEditing={() => {
            setIndate(Indate.trim());
            birthRef.current.focus();
          }}
          onBlur={() => setIndate(Indate)}
          placeholder="구매일자"
          returnKeyType="next"
        />
        <Input
          ref={birthRef}
          label="Frozen"
          value={Frozen}
          onChangeText={text => setFrozen(text)}
          onSubmitEditing={() => {
            setFrozen(Frozen.trim());
            addressRef.current.focus();
          }}
          onBlur={() => setFrozen(Frozen.trim())}
          placeholder="Frozen"
          returnKeyType="next"
        />
        <Input
          ref={addressRef}
          label="Foodid"
          value={Foodid}
          onChangeText={text => setFoodid(text)}
          onSubmitEditing={() => {
            setFoodid(Foodid);
            dayRef.current.focus();
          }}
          onBlur={() => setFoodid(Foodid)}
          placeholder="음식분류"
          returnKeyType="next"
        />
        <Input
          ref={dayRef}
          label="Fkind"
          value={Fkind}
          onChangeText={text => setFkind(text)}
          onSubmitEditing={() => {
            setFkind(Fkind);
          }}
          onBlur={() => setFkind(Fkind)}
          placeholder="식품군"
          returnKeyType="done"
        />
        <Button
          title="추가"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
          containerStyle={{ width: 300 }}
        />
        <Button
          title="change"
          onPress={() => navigation.navigate("Barcode")}
          containerStyle={{ width: 300 }}
        />
        <Button
          title="MyRefri"
          onPress={() => navigation.navigate("MyRefri")}
          containerStyle={{ width: 300 }}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default UpdateRefri;
