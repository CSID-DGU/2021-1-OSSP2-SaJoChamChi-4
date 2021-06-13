import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile, editProfile } from '../screens/login';
import { RecipeList, RecipeMain ,RecipeDetail, ToyouRecipe, MyGoodBoard} from '../screens/receipt';
import { MyRefri, InsertItem, UpdateRefri, OCR} from '../screens/refrigerator';
import { Home } from '../screens';
import {Test} from '../screens';
import {Barcode} from '../screens/refrigerator'
import BoardStack from './BoardStack'
import { MyGoodRecipe } from '../screens/receipt';

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
        headerLeft: null,
      }}
    >
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Board" component={BoardStack} />
      <Stack.Screen name="MyRefri" component={MyRefri} />
      <Stack.Screen name="Test" component={Test}/>
      <Stack.Screen name="RecipeList" component={RecipeList}/>
      <Stack.Screen name="RecipeMain" component={RecipeMain}/>
      <Stack.Screen name="InsertItem" component={InsertItem}/>
      <Stack.Screen name="UpdateRefri" component={UpdateRefri}/>
      <Stack.Screen name="RecipeDetail" component={RecipeDetail}/>
      <Stack.Screen name="ToyouRecipe" component={ToyouRecipe}/>
      <Stack.Screen name="MyGoodBoard" component={MyGoodBoard}/>
      <Stack.Screen name="Barcode" component={Barcode}/>
      <Stack.Screen name="MyGoodRecipe" component={MyGoodRecipe}/>
      <Stack.Screen name="editProfile" component={editProfile}/>
      <Stack.Screen name="OCR" component={OCR}/>


       </Stack.Navigator>
  );
};

export default MainStack;