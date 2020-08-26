import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import AsyncStorage from '@react-native-community/async-storage';

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
  // IsLoading,
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
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      loading: true,
    };
  }

  // async componentDidMount() {
  //   try {
  //     let token = await AsyncStorage.getItem('token');

  //     if (token) {
  //       this.setState({loggedIn: true, loading: false});
  //     } else {
  //       this.setState({loading: false});
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  render() {
    // const {loading} = this.state;

    // if (loading) {
    //   return <IsLoading />;
    // }

    return (
      <NavigationContainer>
        <RootStack.Navigator
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
