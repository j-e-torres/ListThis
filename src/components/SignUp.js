/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';
import {signUpThunk, authorizeTokenThunk} from '../redux/actions/user';
import {colors, borders, typography} from '../styles';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      displayName: '',
      password: '',
      error: [],
      securePassword: true,
    };
  }

  toggleShowPassword = () => {
    const {securePassword} = this.state;

    this.setState({securePassword: !securePassword});
  };

  registerUser = () => {
    const {signUp, navigation, authenticate} = this.props;
    const {username, displayName, password} = this.state;

    return signUp({username, displayName, password})
      .then(() => authenticate())
      .then(() => this.setState({username: '', password: '', displayName: ''}))
      .then(() => navigation.navigate('MainStackScreen'))
      .catch(e => {
        console.log('signup e', e.response.data);
        this.setState({error: e.response.data.errors});
      });
  };

  render() {
    const {registerUser, toggleShowPassword} = this;
    const {error, securePassword, username, displayName, password} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text style={styles.title}>Create your account</Text>
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
              onChangeText={text => this.setState({username: text})}
              style={styles.input}
              placeholder="Username"
              value={username}
            />

            <TextInput
              onChangeText={text => this.setState({displayName: text})}
              style={styles.input}
              placeholder="Display Name"
              value={displayName}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                onChangeText={text => this.setState({password: text})}
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

            <TouchableOpacity style={styles.button} onPress={registerUser}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: '5%',
    alignContent: 'center',
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
    // flex: 1,
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
    // textAlign: 'center',
    padding: '1%',
    color: colors.lightGrey,
    fontSize: typography.font18,
  },
});

const mapDispatchToProps = dispatch => ({
  signUp: credentials => dispatch(signUpThunk(credentials)),
  authenticate: () => dispatch(authorizeTokenThunk()),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
