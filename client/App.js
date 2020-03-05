/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './components/Home';
import Lists from './components/Lists';
import ListItems from './components/ListItems';
import Groups from './components/Groups';
import GroupLists from './components/GroupLists';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen name="Lists" component={Lists} />
          <Stack.Screen name="Groups" component={Groups} />
          <Stack.Screen name="GroupLists" component={GroupLists} />

          <Stack.Screen
            name="ListItems"
            options={({route}) => ({
              title: route.params.listName,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
            })}
            component={ListItems}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
