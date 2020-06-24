import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {createTaskThunk} from '../../redux/actions/tasks';

import {colors, borders, typography} from '../../styles';

class CreateTask extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      success: '',
      error: '',
    };
  }

  _createTask = () => {
    const {taskName} = this.state;
    const {
      createTask,
      navigation,
      route: {params},
    } = this.props;
    const {id} = params;

    return createTask(id, {taskName})
      .then(() => this.setState({success: 'Successfully created. '}))
      .then(() =>
        setTimeout(function() {
          navigation.goBack();
        }, 250),
      )
      .catch(e => {
        console.log('createTask, error', e);
        this.setState({error: e.response.data.errors});
      });
  };

  render() {
    const {success, error} = this.state;
    const {_createTask} = this;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create a new task</Text>
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
            onChangeText={taskName => this.setState({taskName})}
            placeholder="Task name"
          />
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={_createTask}>
            <Text style={styles.buttonText}>Create task</Text>
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
  createTask: (listId, newTask) => dispatch(createTaskThunk(listId, newTask)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateTask);
