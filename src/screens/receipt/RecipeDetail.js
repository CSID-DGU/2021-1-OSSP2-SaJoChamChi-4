import React from 'react';
import styled from 'styled-components/native'
import {Text, View, Image, Dimensions } from 'react-native'
import { Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;


const RecipeDetail = ({route,navigation}) => {
    console.log("consolelog",route);

    const detail = route.params.params.detailrecipe.map( data => 
            <View style={{ textAlign: 'center', marginBottom:15}}>
            <Image source={{uri:data.img}} style={{width:'100%',height:300}} ></Image>
            <Text style={{fontSize: 15, textAlign: 'center', fontWeight:'bold'}}>{data.txt}</Text>
            </View>
        );

        const ingre = route.params.params.ingre.map( data => 
            <View style={{ textAlign: 'center', marginBottom:15}}>
            <Text style={{fontSize: 15,height:20, textAlign: 'center', fontWeight:'bold'}}>{data.ingre_name}{data.ingre_count}{data.ingre_unit}</Text>    
            </View>
        );
        
        const info = route.params.params.info.map( data => 
            <View style={{ textAlign: 'center', marginBottom:15}}>
            <Text style={{fontSize: 15,height:20, textAlign: 'center', fontWeight:'bold'}}>인분:{data.info1}</Text>
            <Text style={{fontSize: 15,height:20, textAlign: 'center', fontWeight:'bold'}}>{data.info3}{data.info2}</Text>        
            </View>
        );

    return(
        <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30}}>
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center', marginBottom:30}}> RecipeDetail </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>요약: {route.params.params.summary}{"\n"} </Text>
            {info}
            {ingre}
            {<View>{detail}</View>}
            <Button title="RecipeMain" onPress={()=>navigation.navigate('RecipeMain')} containerStyle={{width:250, marginBottom:20}}/>
            <Button title="Home" onPress={()=>navigation.navigate('Home')} containerStyle={{width:250}}/>
        </Container>
        </KeyboardAwareScrollView>
    )
}

export default RecipeDetail;

// ingre, info, detail