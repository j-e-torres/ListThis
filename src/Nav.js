import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {authorizeTokenThunk} from './redux/actions/user';

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

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
    };
  }

  async componentDidMount() {
    const {authenticate} = this.props;

    console.log('nav componentdidmount props', this.props);

    try {
      let token = await AsyncStorage.getItem('token');

      if (token) {
        return authenticate()
          .then(() => this.setState({loggedIn: true}))
          .catch(e => {
            console.log('nav authenticate', e.response.data);
          });
      }
    } catch (err) {
      throw err;
    }
  }

  render() {
    const {loggedIn} = this.state;

    return (
      <NavigationContainer>
        <RootStack.Navigator
          // initialRouteName={loggedIn ? 'MainStackScreen' : 'RootNav'}
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
          {loggedIn ? (
            <RootStack.Screen
              name="MainStackScreen"
              component={MainStackScreen}
              options={{headerShown: false}}
            />
          ) : (
            <RootStack.Screen
              name="RootNav"
              component={RootNav}
              options={{
                headerShown: false,
              }}
            />
          )}

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

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authorizeTokenThunk()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Nav);
