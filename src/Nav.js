import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Home,
  ListItems,
  Groups,
  GroupLists,
  SignUp,
  Login,
  Root,
  CreateGroup,
} from './components';

const Stack = createStackNavigator();

export default class Nav extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Root"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'My home',
            }}
          />

          <Stack.Screen
            name="Root"
            options={{
              title: 'ListThis',
            }}
            component={Root}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateGroupModal" component={CreateGroup} />

          <Stack.Screen name="Groups" component={Groups} />
          <Stack.Screen
            name="GroupLists"
            options={({route}) => ({
              title: route.params.groupName,
            })}
            component={GroupLists}
          />

          <Stack.Screen
            name="ListItems"
            options={({route}) => ({
              title: route.params.listName,
            })}
            component={ListItems}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
