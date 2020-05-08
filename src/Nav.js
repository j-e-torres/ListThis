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

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createStackNavigator();

const RootNav = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Root"
        options={{
          title: 'ListThis',
        }}
        component={Root}
      />
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
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
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'My home',
        }}
      />

      <MainStack.Screen name="Groups" component={Groups} />

      <MainStack.Screen
        name="GroupLists"
        options={({route}) => ({
          title: route.params.groupName,
        })}
        component={GroupLists}
      />

      <MainStack.Screen
        name="ListItems"
        options={({route}) => ({
          title: route.params.listName,
        })}
        component={ListItems}
      />
    </MainStack.Navigator>
  );
};

export default class Nav extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator mode="modal" initialRouteName="RootNav">
          <RootStack.Screen
            name="MainStackScreen"
            component={MainStackScreen}
            options={{headerShown: false}}
          />

          <RootStack.Screen
            name="RootNav"
            component={RootNav}
            options={{headerShown: false}}
          />

          <RootStack.Screen name="CreateGroupModal" component={CreateGroup} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
