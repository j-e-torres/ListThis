/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
    };
  }

  loginUser = () => {
    const {authenticate, navigation} = this.props;
    const {username, password} = this.state;
    const creds = {username, password};
    return loginUserThunk(creds)
      .then(() => authenticate())
      .then(() => navigation.navigate('Home'))
      .catch(e => this.setState({error: e.response.data.errors}));
  };

  render() {
    const {loginUser} = this;
    const {error} = this.state;

    return (
      <View style={styles.container}>
        <View style={{flex: 20, justifyContent: 'center'}}>
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

        <View style={{flex: 80}}>
          <TextInput
            onChangeText={username => this.setState({username})}
            style={styles.input}
            placeholder="Username"
          />

          <TextInput
            onChangeText={password => this.setState({password})}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={loginUser}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    textAlign: 'center',
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
