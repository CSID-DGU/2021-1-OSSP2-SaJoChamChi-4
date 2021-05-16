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

const BoardList = ({navigation}) => {
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> BoardList </Text>
            <Button title="Home" onPress={()=>navigation.navigate('Home')}/>
            <Button title="DetailView" onPress={()=>navigation.navigate('Board',{screen:'DetailView'})}/>
            <Button title="insertRecipe" onPress={()=>navigation.navigate('Board',{screen:'insertRecipe'})}/>
            <Button title="SimpleView" onPress={()=>navigation.navigate('Board',{screen:'SimpleView'})}/>
        </Container>
    )
}

export default BoardList;