import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../screens/login';
import { ReceiptList } from '../screens/receipt';
import { MyRefri, InsertItem, UpdateRefri } from '../screens/refrigerator';
import { Home } from '../screens';
import {Test} from '../screens';
import {Barcode} from '../screens/refrigerator'
import BoardStack from './BoardStack'
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Board" component={BoardStack} />
      <Stack.Screen name="ReceiptList" component={ReceiptList} />
      <Stack.Screen name="MyRefri" component={MyRefri} />
      <Stack.Screen name="Test" component={Test}/>
      <Stack.Screen name="InsertItem" component={InsertItem}/>
      <Stack.Screen name="UpdateRefri" component={UpdateRefri}/>
      <Stack.Screen name="Barcode" component={Barcode}/>
       </Stack.Navigator>
  );
};

export default MainStack;