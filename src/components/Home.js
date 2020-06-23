/* eslint-disable react-native/no-inline-styles */
import React, {Component, useRef} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {getListsThunk} from '../redux/actions/lists';
import {getTasksThunk} from '../redux/actions/tasks';
import {getUsersThunk} from '../redux/actions/user';

import {colors, borders, typography} from '../styles';

class Home extends Component {
  componentDidMount() {
    const {fetchLists, fetchTasks, fetchUsers} = this.props;

    return Promise.all([fetchLists(), fetchTasks(), fetchUsers()]).catch(e =>
      console.log('home error', e.response.data),
    );
  }

  logout = () => {
    const {navigation} = this.props;

    return AsyncStorage.removeItem('token').then(() =>
      navigation.navigate('RootNav'),
    );
  };

  render() {
    const {navigation, userLogin, lists} = this.props;
    const {logout} = this;

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>Welcome back {userLogin.username}</Text>
          <Text style={styles.subTitle}>choose one of the options below</Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateListModal')}>
            <Text style={{color: colors.lightOrange, fontSize: 25}}>
              Start a List
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 2,
            alignContent: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('UserLists')}>
            <Text style={styles.buttonText}>View your lists</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 25,
    backgroundColor: 'white',
  },

  title: {
    // flex: 1,
    textAlign: 'center',
    fontSize: typography.font30,
    color: colors.lightBlack,
  },
  subTitle: {
    fontSize: typography.font16,
    textAlign: 'center',
    color: colors.lightBlack,
  },
  secondaryTitle: {
    textAlign: 'center',
    fontSize: typography.font25,
    color: colors.lightOrange,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: borders.borderRadius50,
    borderColor: colors.darkOrange,
    borderWidth: borders.borderWidth1,
  },
  invitationCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  invitationCode: {
    borderWidth: borders.borderWidth1,
    borderColor: colors.lightGrey,
    textAlign: 'center',
    borderRadius: borders.borderRadius5,
  },
  buttonText: {color: colors.lightOrange, fontSize: 25},
});

const mapStateToProps = ({userLogin, lists}) => ({
  userLogin,
  lists,
});

const mapDispatchToProps = dispatch => ({
  fetchLists: () => dispatch(getListsThunk()),
  fetchTasks: () => dispatch(getTasksThunk()),
  fetchUsers: () => dispatch(getUsersThunk()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
