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

const DetailView = ({route,navigation}) => {
    console.log(route);
    //const {screen, data} = route.params;

    //const data = navigation.getParam('screen','d');
    //const {screen,data} = route.params;
    //const data = navigation.getParam('data','');
    //console.log(data);
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> DetailView </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>쓴 사람: {route.params.data.b_Writer}, 추천수: {route.params.data.b_Hits}{"\n"} </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>제목: {route.params.data.b_Title}{"\n"} </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>내용: {route.params.data.b_Content}{"\n"} </Text>
            
            <Button title="Home" onPress={()=>navigation.navigate('Home')}/>
        </Container>
    )
}

export default DetailView;