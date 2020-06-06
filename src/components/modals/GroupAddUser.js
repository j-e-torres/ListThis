import React, {Component} from 'react';

import {connect} from 'react-redux';
import {groupAddUserThunk} from '../../redux/actions/user';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import {colors, borders, typography} from '../../styles';

class GroupAddUser extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      success: '',
      error: '',
    };
  }

  _groupAddUser = () => {
    const {
      navigation,
      route: {params},
      groupAddUser,
    } = this.props;
    const {groupId, userId, users} = params;
    const {username} = this.state;

    const userExists = users.find(user => user.username === username);

    if (!userExists) {
      return groupAddUser(userId, groupId, {username})
        .then(() => this.setState({success: 'User added.'}))
        .then(() =>
          setTimeout(function() {
            navigation.goBack();
          }, 250),
        )
        .catch(e => {
          this.setState({error: e.response.data.errors});
        });
    } else {
      this.setState({error: ['User already belongs to group!']});
    }
  };

  render() {
    const {success, error} = this.state;
    const {_groupAddUser} = this;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Enter user you wish to add</Text>
        </View>

        {success.length > 0 && (
          <View>
            <Text style={styles.success}>{success}</Text>
          </View>
        )}

        {error.length > 0 && (
          <View>
            {error.map((e, idx) => {
              return (
                <Text style={styles.error} key={idx}>
                  {e}
                </Text>
              );
            })}
          </View>
        )}

        <View>
          <TextInput
            style={styles.input}
            onChangeText={username =>
              this.setState({username: username.toLowerCase()})
            }
            placeholder="Username"
          />
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={_groupAddUser}>
            <Text style={styles.buttonText}>Add user to group</Text>
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
    padding: '5%',
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
  error: {
    padding: '1%',
    color: colors.lightGrey,
    fontSize: typography.font18,
  },
  success: {
    padding: '1%',
    color: colors.paleGreen,
    fontSize: typography.font18,
  },
});

const mapDispatchToProps = dispatch => ({
  groupAddUser: (userId, groupId, username) =>
    dispatch(groupAddUserThunk(userId, groupId, username)),
});

export default connect(
  null,
  mapDispatchToProps,
)(GroupAddUser);
