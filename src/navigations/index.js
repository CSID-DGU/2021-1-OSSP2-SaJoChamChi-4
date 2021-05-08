import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Spinner } from '../components';
import { ProgressContext, UserContext } from '../contexts';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {user?.usr_Id && user?.usr_Name ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
