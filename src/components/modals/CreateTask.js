/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {connect} from 'react-redux';
import {createTasksThunk} from '../../redux/actions/tasks';

import {colors, borders, typography} from '../../styles';

class CreateTask extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      success: '',
      error: '',
      tasks: [],
    };
  }

  addToList = () => {
    const {taskName, tasks} = this.state;
    this.setState({error: ''});

    if (taskName.length < 1) {
      this.setState({error: ["Can't add empty item"]});
    } else {
      this.setState({tasks: [...tasks, {taskName}], taskName: ''});
    }
  };

  _createTasks = () => {
    const {tasks} = this.state;
    const {
      createTasks,
      navigation,
      route: {params},
    } = this.props;
    const {id} = params;

    return createTasks(id, tasks)
      .then(() => this.setState({success: 'Successfully added. '}))
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
    const {success, error, tasks, taskName} = this.state;
    const {_createTasks, addToList} = this;

    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{flexGrow: 1}}>
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

          <View style={{flex: 1}}>
            {tasks.length > 0 && (
              <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={{flexGrow: 1}}>
                {tasks.map((task, idx) => {
                  return (
                    <View key={idx} style={styles.itemLine}>
                      <Text style={styles.item}>{task.taskName}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>

          <View
            style={{
              flex: 2,
              flexDirection: 'row',
            }}>
            <View style={{flex: 2}}>
              <TextInput
                value={taskName}
                style={styles.input}
                onChangeText={task => this.setState({taskName: task})}
                placeholder="Item"
                autoFocus={true}
              />
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity style={styles.button} onPress={addToList}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.button} onPress={_createTasks}>
              <Text style={styles.buttonText}>Done with items</Text>
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
    padding: '5%',
  },
  itemLine: {
    paddingLeft: 5,
    paddingVertical: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: colors.lightPink2,
    borderBottomColor: colors.lightGreyBlue2,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
  item: {
    flex: 1,
    fontSize: 18,
    color: colors.lightBlack,
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
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  createTasks: (listId, newTask) => dispatch(createTasksThunk(listId, newTask)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateTask);
