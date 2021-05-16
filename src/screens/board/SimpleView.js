import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../../contexts';
import styled from 'styled-components/native';
import { Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Text } from 'react-native';
import { useCardAnimation } from '@react-navigation/stack';
import {StyleSheet,View} from "react-native" ;
import SimpleViewPresenter from './SimpleViewPresenter'

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;



const SimpleView = ({navigation}) => {
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> SimpleView </Text>
            <SimpleViewPresenter navigation = {navigation} />
            <Button title="Home" onPress={()=>navigation.navigate('Home')}/>
        </Container>
    )
}

export default SimpleView;