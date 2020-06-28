/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
      editing: false,
    };
  }

  addToList = ({nativeEvent}) => {
    const {taskName, tasks} = this.state;
    // console.log(nativeEvent);
    this.setState({error: ''});

    if (taskName.length < 1) {
      this.setState({error: ["Can't add empty item"]});
    } else {
      this.setState({tasks: [...tasks, {taskName}], taskName: ''});
    }
  };

  createList = () => {
    const {createNewList, navigation, userLogin} = this.props;

    const {listName, tasks} = this.state;

    if (listName.length > 0) {
      return createNewList(userLogin.id, {listName, tasks})
        .then(() => this.setState({success: 'Successfully created.'}))
        .then(() =>
          setTimeout(function() {
            navigation.navigate('UserLists');
          }, 250),
        )
        .catch(e => {
          this.setState({error: e.response.data.errors});
        });
    } else {
      this.setState({error: ['List name cannot be empty']});
    }
  };

  render() {
    const {success, error, taskName, tasks} = this.state;
    const {createList, addToList} = this;

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
            <TextInput
              style={styles.input}
              onChangeText={listName => this.setState({listName})}
              placeholder="List name"
              autoFocus={true}
            />
          </View>

          <View style={{flex: 2}}>
            {tasks.length > 0 && (
              <ScrollView
                // style={{height: 75}}
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
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={{flex: 2}}>
              <TextInput
                value={taskName}
                style={styles.input}
                onChangeText={task => this.setState({taskName: task})}
                placeholder="Item"
              />
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity style={styles.button} onPress={addToList}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.button} onPress={createList}>
              <Text style={styles.buttonText}>Done with List</Text>
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
  button: {
    flexShrink: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: borders.borderRadius50,
    borderColor: colors.darkOrange,
    borderWidth: borders.borderWidth1,
    marginTop: 10,
  },
  buttonText: {
    // flex: 1,
    color: colors.lightOrange,
    fontSize: 18,
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

const mapStateToProps = ({userLogin, users}) => ({userLogin, users});

const mapDispatchToProps = dispatch => ({
  createNewList: (groupId, newList) =>
    dispatch(createListThunk(groupId, newList)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateList);
