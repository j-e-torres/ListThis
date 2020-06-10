/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import {completeTaskThunk, deleteTaskThunk} from '../redux/actions/tasks';
import {updateListNotesThunk} from '../redux/actions/lists';

import Icon from 'react-native-vector-icons/Entypo';

import {colors, borders, typography} from '../styles';

class ListItems extends Component {
  constructor(props) {
    super(props);

    const {
      route: {params},
    } = this.props;

    const {listNotes} = params;

    this.state = {
      deleteSuccess: '',
      error: '',
      notesEditable: false,
      currentListNotes: listNotes,
    };
  }

  _updateListNotes = () => {
    // const {
    //   route: {params},
    //   navigation,
    // } = this.props;

    // const {id} = params;
    const {currentListNotes} = this.state;
    console.log('press edit button', currentListNotes);
  };

  handleEditable = () => {
    const {notesEditable} = this.state;
    notesEditable
      ? this.setState({notesEditable: false})
      : this.setState({notesEditable: true});
  };

  _completeTask = task => {
    const {completeTask} = this.props;

    return completeTask(task.id);
  };

  _deleteTask = task => {
    const {deleteTask} = this.props;

    return deleteTask(task);
  };

  render() {
    const {
      route: {params},
      navigation,
      tasks,
    } = this.props;
    const {id} = params;
    const {currentListNotes, notesEditable} = this.state;

    const listTasks = tasks.filter(task => task.listId === id);
    const sortByCompleted = listTasks.sort((a, b) =>
      a.completed > b.completed ? 1 : -1,
    );

    const {_completeTask, _deleteTask, _updateListNotes, handleEditable} = this;

    return (
      <View style={styles.panelContainer}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.iconHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateTaskModal', {id})}>
                <Icon name="add-to-list" size={40} color={colors.lightBlack} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flex: 3}}>
          {sortByCompleted.length > 0 ? (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {sortByCompleted.map((task, idx) => {
                return (
                  <View key={idx} style={styles.itemLine}>
                    <Text style={completed(task.completed).task}>
                      {task.taskName}
                    </Text>

                    {task.completed === true ? (
                      <Text style={completed(task.completed).taskOwner} />
                    ) : (
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={() => _completeTask(task)}
                          style={completed(task.completed).taskOwner}>
                          <Text>
                            <Icon
                              name="circle"
                              size={20}
                              color={colors.lightBlack}
                            />
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => _deleteTask(task)}
                          style={completed(task.completed).taskOwner}>
                          <Text>
                            <Icon
                              name="cross"
                              size={20}
                              color={colors.lightBlack}
                            />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <Text style={styles.noTasks}>No tasks created yet</Text>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerHeaderContainer}>
            <Text style={styles.footerHeader}>Notes</Text>

            {notesEditable ? (
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={_updateListNotes} style={{flex: 1}}>
                  <Icon name="check" size={25} color={colors.lightBlack} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleEditable} style={{flex: 1}}>
                  <Icon name="cross" size={25} color={colors.lightBlack} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleEditable}
                style={{flex: 1, alignItems: 'center'}}>
                <Icon name="pencil" size={25} color={colors.lightBlack} />
              </TouchableOpacity>
            )}
          </View>

          <View style={{flex: 3}}>
            {/* <Text style={styles.footerContent}>{listNotes}</Text> */}
            <TextInput
              style={styles.footerContent}
              value={currentListNotes}
              editable={notesEditable}
              onChangeText={text => this.setState({currentListNotes: text})}
            />
          </View>
        </View>
      </View>
    );
  }
}

const completed = bool =>
  StyleSheet.create({
    task: {
      flex: 3,
      fontSize: 25,
      color: bool === true ? colors.lightGrey : colors.lightBlack,
      textDecorationLine: bool === true ? 'line-through' : 'none',
    },
    taskOwner: {
      flex: 1,
      fontSize: typography.font14,
      color: colors.lightGrey,
    },
  });

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  panelContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: '4%',
    // justifyContent: 'space-between',
  },

  panelsContainerClipBoard: {
    flex: 1,
    ...borders.clipBoardBorder,
  },

  panelsContainerLayout: {
    ...typography.clipBoardListLayout,
  },
  itemLine: {
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: colors.lightPink2,
    borderBottomColor: colors.lightGreyBlue2,
    flexDirection: 'row',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'space-between',
  },

  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: borders.borderRadius50,
    borderColor: colors.darkOrange,
    borderWidth: borders.borderWidth1,
  },

  buttonText: {color: colors.lightOrange, fontSize: 25},

  iconHeader: {
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: '2%',
  },

  noTasks: {
    flex: 1,
    fontSize: 25,
    color: colors.lightGrey,
    textAlign: 'center',
  },

  footer: {
    flex: 2,
    marginTop: '2%',
    borderWidth: 1,
    borderColor: colors.lightBlack,
    borderRadius: 50,
    // flexWrap: 'wrap',
  },

  footerHeaderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightOrange,
    flex: 1,
    // marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '1%',
  },

  footerHeader: {
    flex: 2,
    color: colors.lightOrange,
    fontSize: typography.font25,
    textAlign: 'center',
  },

  footerContent: {
    color: colors.lightBlack,
    fontSize: typography.font20,
  },
});

const mapStateToProps = ({tasks}) => ({tasks});

const mapDispatchToProps = dispatch => ({
  completeTask: taskId => dispatch(completeTaskThunk(taskId)),
  deleteTask: task => dispatch(deleteTaskThunk(task)),
  updateListNotes: (listId, listNotes) =>
    dispatch(updateListNotesThunk(listId, listNotes)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItems);
