import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button } from '../../components';
import { Alert, Text , View,  Dimensions } from 'react-native';
import EpdateRecipePresenter from './EpdateRecipePresenter';
import YourRefriRecipePresenter from './YourRefriRecipePresenter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
    flex : 3;
    width : 100%;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;



const ToyouRecipe = ({navigation}) => {
    var {height, width} = Dimensions.get('window');

    return(
        <Container>
        <Text style={{fontSize: 24, textAlign : 'center' , fontWeight:'bold'}}>유통기한 기반 추천 레시피</Text>
        <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30, width:width}}>
            <EpdateRecipePresenter navigation = {navigation}/>
        </KeyboardAwareScrollView>
        <Text style={{fontSize: 24, textAlign : 'center', fontWeight:'bold'}}>냉장고 재료 기반 추천 레시피</Text>
        <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30, width:width}}>
            <YourRefriRecipePresenter navigation = {navigation}/>
        </KeyboardAwareScrollView>
        <View style={{flexDirection: 'row', marginBottom:5}}>
            <Button title="전체레시피" onPress={()=>navigation.navigate('RecipeMain')} containerStyle={{width:130, marginBottom:20}}/>
            <Text>         </Text>
            <Button title="Home" onPress={()=>navigation.navigate('Home')} containerStyle={{width:130, marginBottom:20}}/>
        </View>
        </Container>
    )
}

export default ToyouRecipe;