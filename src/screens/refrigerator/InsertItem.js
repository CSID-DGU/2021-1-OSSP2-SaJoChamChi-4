import React from 'react';
import styled from 'styled-components/native'
import {Text, Button } from 'react-native'
import { Input } from '../../components';

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const InsertItem = ({navigation}) => {
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> InsertItem </Text>
            <Input></Input>  
            <Button title="change" onPress={()=>navigation.navigate('Barcode')}/>
            <Button title="MyRefri" onPress={()=>navigation.navigate('MyRefri')}/>
        </Container>
    )
}

export default InsertItem;