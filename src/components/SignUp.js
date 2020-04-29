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
import {signUpThunk} from '../redux/actions/user';
import {colors, borders, typography} from '../styles';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      displayName: '',
      password: '',
    };
  }

  registerUser = () => {
    const {signUp, navigation} = this.props;
    const {username, displayName, password} = this.state;

    return signUp({username, displayName, password})
      .then(() => navigation.navigate('Home'))
      .catch(e => console.log('lll', e.response.data.errors));
  };

  render() {
    const {registerUser} = this;
    return (
      <View style={styles.container}>
        <View style={{flex: 20, justifyContent: 'center'}}>
          <Text style={styles.title}>Create your account</Text>
        </View>

        <View style={{flex: 80}}>
          <TextInput
            onChangeText={text => this.setState({username: text})}
            style={styles.input}
            placeholder="Username"
          />

          <TextInput
            onChangeText={text => this.setState({displayName: text})}
            style={styles.input}
            placeholder="Display Name"
          />

          <TextInput
            onChangeText={text => this.setState({password: text})}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={registerUser}>
            <Text style={styles.buttonText}>Register</Text>
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
});

const mapDispatchToProps = dispatch => ({
  signUp: credentials => dispatch(signUpThunk(credentials)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
