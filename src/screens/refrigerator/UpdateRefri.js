import React from 'react';
import styled from 'styled-components/native'
import {Text, Button } from 'react-native'

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const UpdateRefri = ({navigation}) => {
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> UpdateRefri </Text>
            <Button title="MyRefri" onPress={()=>navigation.navigate('MyRefri')}/>
        </Container>
    )
}

export default UpdateRefri;