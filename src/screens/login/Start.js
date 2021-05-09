import React from 'react';
import styled from 'styled-components/native'
import { Button } from '../../components';
import { Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
    flex : 1;
    justify-content: center;
    background-color: ${({theme}) => theme.background};  
    align-items: center;
    padding: 0 20px;
    padding-top: ${({ insets: { top } }) => top}px;
    padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const Start = ({navigation}) => {
    const insets = useSafeAreaInsets();

    return(
        <Container insets={insets} >
            <Text style={{fontSize: 40, textAlign : 'center', paddingBottom:100}}> My refrigerator </Text>
            <Button title="Login" onPress={()=>navigation.navigate('Login')}/>
            <Button title="Signup" onPress={()=>navigation.navigate('Signup')}/>
        </Container>
    )
}

export default Start;