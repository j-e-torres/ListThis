/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';
import {loginUserThunk, authorizeTokenThunk} from '../redux/actions/user';
import {colors, borders, typography} from '../styles';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: [],
      securePassword: true,
    };
  }

  toggleShowPassword = () => {
    const {securePassword} = this.state;

    this.setState({securePassword: !securePassword});
  };

  loginUser = () => {
    const {authenticate, navigation} = this.props;
    const {username, password} = this.state;
    const creds = {username, password};
    return loginUserThunk(creds)
      .then(() => authenticate())
      .then(() => this.setState({username: '', password: ''}))
      .then(() => navigation.navigate('MainStackScreen'))
      .catch(e => this.setState({error: e.response.data.errors}));
  };

  render() {
    const {loginUser, toggleShowPassword} = this;
    const {error, securePassword, username, password} = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text style={styles.title}>Welcome back</Text>
        </View>

        <View>
          {error.map((e, idx) => {
            return (
              <Text style={styles.error} key={idx}>
                {e}
              </Text>
            );
          })}
        </View>

        <View style={{flex: 8}}>
          <TextInput
            onChangeText={_username => this.setState({username: _username})}
            style={styles.input}
            placeholder="Username"
            value={username}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              onChangeText={_password => this.setState({password: _password})}
              style={[styles.input, {flex: 1}]}
              placeholder="Password"
              secureTextEntry={securePassword}
              value={password}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={[styles.input, {justifyContent: 'center'}]}>
              <Icon
                name={securePassword ? 'eye' : 'eye-with-line'}
                size={20}
                color={colors.lightBlack}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={loginUser}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '5%',
  },

  buttonText: {
    color: colors.lightOrange,
    fontSize: 25,
  },

  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: borders.borderRadius50,
    borderColor: colors.darkOrange,
    borderWidth: borders.borderWidth1,
    marginTop: 10,
  },

  input: {
    height: 50,
    marginVertical: 10,
    padding: 4,
    fontSize: typography.font25,
    borderBottomWidth: 1,
    borderColor: colors.lightOrange,
  },

  title: {
    textAlign: 'center',
    fontSize: typography.font30,
    color: colors.lightBlack,
  },
  error: {
    padding: '1%',
    color: colors.lightGrey,
    fontSize: typography.font18,
  },
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authorizeTokenThunk()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
