import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UpdateRefri, InsertItem, DeleteRefri, MyRefri } from '../screens/refrigerator';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const RefriTab = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const title = getFocusedRouteNameFromRoute(route) ?? 'MyRefri';
    navigation.setOptions({
      headerTitle: title,
    });
  }, [route]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}
    >
    <Tab.Screen
        name="리스트"
        component={MyRefri}
        options={{
         headerShown:false,
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: 'add',
            }),
        }}
      />
      <Tab.Screen
        name="추가"
        component={InsertItem}
        options={{
         headerShown:false,
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: 'add',
            }),
        }}
      />
      <Tab.Screen
      name="수정"
      component={UpdateRefri}
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) =>
          TabBarIcon({
            focused,
            name: 'update',
          }),
      }}
    />
      <Tab.Screen
        name="삭제"
        component={DeleteRefri}
        options={{
            headerShown:false,
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: 'delete',
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default RefriTab;
