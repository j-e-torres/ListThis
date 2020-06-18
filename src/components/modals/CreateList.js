import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {createListThunk} from '../../redux/actions/user';

import {colors, borders, typography} from '../../styles';

class CreateList extends Component {
  constructor() {
    super();
    this.state = {
      listName: '',
      taskName: '',
      tasks: [],
      success: '',
      error: '',
    };
  }

  addToList = () => {
    const {taskName, tasks} = this.state;

    this.setState({tasks: [...tasks, {taskName}], taskName: ''});
  };

  createList = () => {
    const {createNewList, navigation, userLogin} = this.props;

    const {listName, tasks} = this.state;

    return createNewList(userLogin.id, {listName, tasks})
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
    const {success, error, taskName} = this.state;
    const {createList, addToList} = this;

    return (
      <View style={styles.container}>
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

        <TextInput
          style={styles.input}
          onChangeText={listName => this.setState({listName})}
          placeholder="List name"
        />

        <TextInput
          value={taskName}
          style={styles.input}
          onChangeText={taskName => this.setState({taskName})}
          placeholder="Add something to list"
        />

        <TouchableOpacity style={styles.button} onPress={addToList}>
          <Text style={styles.buttonText}>Add to list</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={createList}>
          <Text style={styles.buttonText}>Done with List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  createNewList: (groupId, newList) =>
    dispatch(createListThunk(groupId, newList)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateList);
