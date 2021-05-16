import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SimpleView, DetailView, insertRecipe, BoardList } from '../screens/board';

const BStack = createStackNavigator();

const BoardStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <BStack.Navigator
      initialRouteName="BoardList"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <BStack.Screen
        name="BoardList"
        component={BoardList}
        options={{ headerShown: false }}
      />
      <BStack.Screen
        name="SimpleView"
        component={SimpleView}
        options={{ headerShown: false }}
      />
      <BStack.Screen
        name="DetailView"
        component={DetailView}
        options={{ headerBackTitleVisible: false }}
      />
      
      <BStack.Screen
        name="insertRecipe"
        component={insertRecipe}
        options={{ headerBackTitleVisible: false }}
      />
    </BStack.Navigator>
  );
};

export default BoardStack;