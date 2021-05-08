import React from 'react';
import styled from 'styled-components/native'
import {Text, Button } from 'react-native'

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
`;

const Signup = ({navigation}) => {
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> Signup </Text>
            <Button title="Login" onPress={()=>navigation.navigate('Login')}/>
        </Container>
    )
}

export default Signup;