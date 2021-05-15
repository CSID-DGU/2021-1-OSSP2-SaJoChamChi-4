import React from 'react';
import styled from 'styled-components/native'
import {Text,View, Alert } from 'react-native'
import { Button } from '../../components';
import RefriListPresenter from './RefriListPresenter'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {InsertItem, UpdateRefri} from '../refrigerator'
const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const MyRefri = ({navigation}) => {
    return(
        <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30}}>
        <Container>
            <Text style={{fontSize: 30, textAlign : 'center',marginBottom :30}}>냉장고 품목 리스트 </Text>
            <View style={{flexDirection: 'row', width : '100%'}} >
            <Text style={{fontSize: 15,width : '25%', textAlign: 'center'}}>식품명</Text>
            <Text style={{fontSize: 15, width : '15%', textAlign: 'center'}}>수량</Text>
            <Text style={{fontSize: 15, width : '25%', textAlign: 'center'}}>구매일자</Text>
            <Text style={{fontSize: 15, width : '25%', textAlign: 'center'}}>유통기한</Text>
            <Text style={{marginBottom : 20, fontSize : 15, width : '10%', textAlign: 'center'}}>보관</Text>
            </View>
            <RefriListPresenter/>
            <View style={{flexDirection: 'row', width : '100%', marginBottom : 30}}>
            <Button title="추가" onPress={()=>navigation.navigate('InsertItem')} containerStyle={{ width:'33%', borderRadius : 20}} />
            <Button title="수정" onPress={()=>navigation.navigate('UpdateRefri')} containerStyle={{ width:'33%', borderRadius : 20}} />
            <Button title="삭제" onPress={()=> Alert.alert("삭제구현필요")} containerStyle={{ width:'33%', borderRadius : 20}} />
            </View>
            <Button title="Home" onPress={()=>navigation.navigate('Home')} containerStyle={{width:100}} />
        </Container>
        </KeyboardAwareScrollView>
    )
}

export default MyRefri;