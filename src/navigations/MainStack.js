import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BoardList } from '../screens/board';
import { Profile } from '../screens/login';
import { ReceiptList } from '../screens/receipt';
import { MyRefri } from '../screens/refrigerator';
import { Home } from '../screens'
import {Test} from '../screens'
// import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="BoardList" component={BoardList} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ReceiptList" component={ReceiptList} />
      <Stack.Screen name="MyRefri" component={MyRefri} />
      <Stack.Screen name="Test" component={Test}/>
    </Stack.Navigator>
  );
};

export default MainStack;