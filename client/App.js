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
import GroupScreenOfLists from './components/GroupScreenofLists';
import ListScreenOfItems from './components/ListScreenOfItems';

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
          <Stack.Screen name="GroupScreen" component={GroupScreenOfLists} />
          <Stack.Screen
            name="ListScreen"
            options={({route}) => ({title: route.params.listName})}
            component={ListScreenOfItems}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
