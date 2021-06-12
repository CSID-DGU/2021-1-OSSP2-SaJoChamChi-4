import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, Start, findId, findPwd, changePwd } from '../screens/login';

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <Stack.Screen
        name="Start"
        component={Start}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="findId"
        component={findId}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="findPwd"
        component={findPwd}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="changePwd"
        component={changePwd}
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;