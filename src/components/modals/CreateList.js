import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {createListThunk} from '../../redux/actions/lists';

import {colors, borders, typography} from '../../styles';

class CreateList extends Component {
  constructor() {
    super();
    this.state = {
      listName: '',
      listNotes: '',
      success: '',
      error: '',
    };
  }

  createList = () => {
    const {
      createNewList,
      route: {params},
      navigation,
    } = this.props;

    const {id} = params;

    const {listName, listNotes} = this.state;

    return createNewList(id, {listName, listNotes})
      .then(() =>
        this.setState({success: 'List created! Returning to previous screen'}),
      )
      .then(() =>
        setTimeout(function() {
          navigation.goBack();
        }, 1200),
      )
      .catch(e => {
        this.setState({error: e.response.data.errors});
      });
  };

  render() {
    // console.log('crealist, props', this.props);
    const {success, error} = this.state;
    const {createList} = this;
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
        <Text style={styles.title}>List Name</Text>

        <TextInput
          style={styles.input}
          onChangeText={listName => this.setState({listName})}
          placeholder="List name"
        />

        <Text style={styles.title}>List Notes (Optional)</Text>

        <TextInput
          style={styles.input}
          onChangeText={listNotes => this.setState({listNotes})}
          placeholder="List notes optional"
        />

        <TouchableOpacity style={styles.button} onPress={createList}>
          <Text style={styles.buttonText}>Create list</Text>
        </TouchableOpacity>
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
  createNewList: (groupId, newList) =>
    dispatch(createListThunk(groupId, newList)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateList);
