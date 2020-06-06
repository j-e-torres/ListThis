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
import {createGroupThunk} from '../../redux/actions/user';

import {colors, borders, typography} from '../../styles';

class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      groupName: '',
      success: '',
      error: '',
    };
  }

  createGroup = () => {
    const {createNewGroup, navigation, userLogin} = this.props;
    const {groupName} = this.state;

    return createNewGroup(userLogin.id, {groupName})
      .then(() => this.setState({success: 'Successfully created.'}))
      .then(() =>
        setTimeout(function() {
          navigation.goBack();
        }, 250),
      )
      .catch(e => {
        this.setState({error: e.response.data.errors});
      });
  };

  render() {
    const {createGroup} = this;
    const {success, error} = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Enter your new group name</Text>
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
            onChangeText={groupName => this.setState({groupName})}
            placeholder="Group name"
          />
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={createGroup}>
            <Text style={styles.buttonText}>Create group</Text>
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

const mapStateToProps = ({userLogin}) => ({userLogin});

const mapDispatchToProps = dispatch => ({
  createNewGroup: (userId, groupName) =>
    dispatch(createGroupThunk(userId, groupName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateGroup);
