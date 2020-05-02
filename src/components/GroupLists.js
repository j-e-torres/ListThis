/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';

import {stickyNotesTiltDegrees} from '../helperFunctions';
import {colors, borders, typography} from '../styles';

const GroupLists = ({route: {params}, navigation, userLogin}) => {
  console.log('2222', params);
  const {username} = userLogin;
  const {lists, groupName, groupOwner} = params;
  // console.log('3333', lists);
  // console.log('4444', lists[0].tasks);

  return (
    <View style={styles.panelContainer}>
      <View style={{flex: 1}}>
        <View style={styles.iconHeader}>
          <TouchableOpacity onPress={() => Alert.alert('Create new List')}>
            <Icon name="add-to-list" size={40} color={colors.lightBlack} />
          </TouchableOpacity>

          {username === groupOwner && (
            <TouchableOpacity onPress={() => Alert.alert('Add user')}>
              <Icon name="add-user" size={40} color={colors.lightBlack} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => Alert.alert('View users')}>
            <Icon name="users" size={40} color={colors.lightBlack} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.panelsContainerClipBoard}>
        <View style={{flex: 1}}>
          <Text style={styles.clipBoardTitle}>
            Active Lists for {groupName}.
          </Text>
        </View>

        <View style={{flex: 1}} />

        <View style={{flex: 8}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.panelsContainerLayout}>
              {lists.map((list, idx) => {
                return (
                  <View style={panelStyle().panel} key={idx}>
                    <Text
                      style={styles.title}
                      // adjustsFontSizeToFit
                      numberOfLines={1}
                      onPress={() => navigation.navigate('ListItems', list)}>
                      {list.listName}
                    </Text>
                    <View>
                      <Text style={styles.listItems}>
                        {list.tasks[0] ? list.tasks[0].taskName : ''}
                      </Text>

                      <Text style={styles.listItems}>
                        {list.tasks[1] ? list.tasks[1].taskName : ''}
                      </Text>

                      <Text style={styles.listItemsEnd}>
                        {list.tasks.length - 2 > 0 ? 'list continued...' : ''}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const panelStyle = idx =>
  StyleSheet.create({
    panel: {
      backgroundColor: colors.white,
      width: '49%',
      paddingLeft: 15,
      transform: stickyNotesTiltDegrees(),
      // shadowOffset: {width: 100, height: 100},
      // shadowColor: '#000',
      // shadowOpacity: 0.8,
      // shadowRadius: 50,
      elevation: 20,
    },
  });

const styles = StyleSheet.create({
  iconHeader: {
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: '2%',
  },
  panelContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: '4%',
  },
  panelsContainerClipBoard: {
    flex: 7,
    ...borders.clipBoardBorder,
  },
  panelsContainerLayout: {
    ...typography.clipBoardListLayout,
  },
  clipBoardTitle: {
    fontSize: typography.font25,
    ...borders.clipBoardBorderHeader,
  },
  title: {
    ...typography.stickyNotesTitle,
    ...borders.stickyNotesBorder,
  },
  secondaryTitle: {
    paddingLeft: 5,
    ...typography.stickyNotesSecondaryTitle,
    ...borders.stickyNotesBorder,
  },
  listItems: {
    paddingLeft: 5,
    ...typography.stickyNotesListItems,
    ...borders.stickyNotesBorder,
  },
  listItemsEnd: {
    paddingLeft: 5,
    ...typography.stickyNotesEndList,
  },
});

const mapStateToProps = ({userLogin}) => ({userLogin});

export default connect(mapStateToProps)(GroupLists);
