import React, { useContext, useState }from 'react';
import styled, { ThemeContext } from 'styled-components/native'
import { Button } from '../../components';
import { Text, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

let imagepath = require('../../../assets/Myrefri.png')

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
    const theme = useContext(ThemeContext);

    return(
        <Container insets={insets} >
            <Image source={imagepath} style={{ borderRadius: 8, width:150, height:150, marginBottom:50, marginLeft:30 }} />
            <Text style={{fontSize: 40, textAlign : 'center', paddingBottom:100}}> My Refrigerator </Text>
            <Button title="Login" onPress={()=>navigation.navigate('Login')} containerStyle = {{ width : 250}}/>
            <Button title="Signup" onPress={()=>navigation.navigate('Signup')} containerStyle={{ marginTop: 20, width : 250 }}/>
        </Container>
    )
}

export default Start;