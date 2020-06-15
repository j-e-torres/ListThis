import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import {Animated, Easing} from 'react-native';

import {
  Home,
  ListItems,
  UserLists,
  SignUp,
  Login,
  Root,
  ViewUsers,
  CreateList,
  ListAddUser,
  CreateTask,
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

      <MainStack.Screen
        name="UserLists"
        options={({route}) => ({
          title: 'Your Lists',
        })}
        component={UserLists}
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
        <RootStack.Navigator
          initialRouteName="RootNav"
          mode="modal"
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
          <RootStack.Screen
            name="MainStackScreen"
            component={MainStackScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="RootNav"
            component={RootNav}
            options={{
              headerShown: false,
              // transitionSpec: {
              //   open: {
              //     duration: 750,
              //     easing: Easing.out(Easing.poly(4)),
              //     timing: Animated.timing,
              //     useNativeDriver: true,
              //   },
              // },
              // screenInterpolator: sceneProps => {
              //   const {layout, position, scene} = sceneProps;
              //   const thisSceneIndex = scene.index;

              //   const height = layout.initHeight;
              //   const translateY = position.interpolate({
              //     inputRange: [
              //       thisSceneIndex - 1,
              //       thisSceneIndex,
              //       thisSceneIndex + 1,
              //     ],
              //     outputRange: [height, 0, 0],
              //   });

              //   return {transform: [{translateY}]};
              // },
            }}
          />

          <RootStack.Screen
            name="ViewUsersModal"
            component={ViewUsers}
            options={{
              title: 'People in List',
            }}
          />

          <RootStack.Screen
            name="CreateListModal"
            component={CreateList}
            options={{
              title: 'Create a new List',
            }}
          />

          <RootStack.Screen
            name="ListAddUserModal"
            component={ListAddUser}
            options={{
              title: 'Assign user to List',
            }}
          />

          <RootStack.Screen
            name="CreateTaskModal"
            component={CreateTask}
            options={{
              title: 'Add to List',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
