/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {authorizeTokenThunk} from '../redux/actions/user';

import {colors, borders, typography} from '../styles';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
    };
  }

  async componentDidMount() {
    const {authenticate, navigation} = this.props;

    try {
      let token = await AsyncStorage.getItem('token');

      if (token) {
        return authenticate()
          .then(() => navigation.navigate('MainStackScreen'))
          .catch(e => {
            console.log('authenticate Root', e.response.data);
          });
      }
    } catch (err) {
      throw err;
    }
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>
            {' '}
            Welcome to <Text style={{fontStyle: 'italic'}}>list</Text>THIS{' '}
          </Text>
        </View>

        <View style={{flex: 4}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: typography.font30,
    color: colors.lightBlack,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '5%',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: borders.borderRadius50,
    borderColor: colors.darkOrange,
    borderWidth: borders.borderWidth1,
    marginTop: 10,
  },
  buttonText: {
    color: colors.lightOrange,
    fontSize: 25,
  },
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authorizeTokenThunk()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Root);
