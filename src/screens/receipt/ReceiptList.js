import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button } from '../../components';
import { Alert, Text , View } from 'react-native';

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;



const RecipeList = ({navigation}) => {

    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> RecipeList </Text>
            <Button title="Home" onPress={()=>navigation.navigate('Home')}/>
        </Container>
    )
}

export default RecipeList;