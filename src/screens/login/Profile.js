import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import {Text, Button} from 'react-native'
import { UserContext, ProgressContext } from '../../contexts';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = ({navigation}) => {
    const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
    const theme = useContext(ThemeContext);
    const _handleLogoutButtonPress = async () => {
        try {
          spinner.start();
          //await logout();
        } catch (e) {
          console.log('[Profile] logout: ', e.message);
        } finally {
          dispatch({});
          spinner.stop();
        }
      };
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> Profile </Text>
            <Button title="Home" onPress={()=>navigation.navigate('Home')}/>
            <Button
                title="logout"
                onPress={_handleLogoutButtonPress}
                containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
            />
        </Container>
    )
}

export default Profile;
