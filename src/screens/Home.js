import React ,{useState, useContext} from 'react';
import styled from 'styled-components/native'
import {Text, Button } from 'react-native'
import { ProgressContext, UserContext } from '../contexts'
import { useEffect } from 'react';

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const Home = ({navigation}) => {
    

    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> HOME </Text>
            <Button title="BoardList" onPress={()=>navigation.navigate('Board')}/>
            <Button title="Profile" onPress={()=>navigation.navigate('Profile')}/>
            <Button title="ReceiptList" onPress={()=>navigation.navigate('ReceiptList')}/>
            <Button title="MyRefri" onPress={()=>navigation.navigate('MyRefri')}/>
            <Button title="Test" onPress={()=>navigation.navigate('Test')}/>
        </Container>
    )
}

export default Home;