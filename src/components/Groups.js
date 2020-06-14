/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Entypo';

import {stickyNotesTiltDegrees} from '../helperFunctions';
import {colors, borders, typography} from '../styles';

const Groups = ({navigation, groups, userLogin}) => {
  const userGroups = groups.reduce((acc, group) => {
    let found;

    if (group.users) {
      found = group.users.find(user => user.id === userLogin.id);
    }

    if (found) {
      acc.push(group);
    }

    return acc;
  }, []);

  console.log('groups.js, userGroups.users', userGroups[0].users);

  return (
    <View style={styles.panelContainer}>
      <View style={styles.iconHeader}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => navigation.navigate('CreateGroupModal')}>
          <Icon name="add-to-list" size={40} color={colors.lightBlack} />
          <Text style={{color: colors.lightBlack}}>New Group</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.panelsContainerClipBoard}>
        <View style={{flex: 1}}>
          <Text style={styles.clipBoardTitle}>
            You are in{' '}
            {`${userGroups.length} active ${
              userGroups.length > 1 ? 'groups' : 'group'
            } `}
          </Text>
        </View>

        <View style={{flex: 2}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.panelsContainerLayout}>
              {userGroups.map((group, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('GroupLists', group)}
                    style={panelStyle().panel}
                    key={idx}>
                    <Text style={styles.title} numberOfLines={1}>
                      {group.groupName}
                    </Text>

                    <Text style={styles.secondaryTitle}>
                      {group.users.length > 0 ? 'Users:' : ''}
                    </Text>

                    {group.lists && (
                      <View>
                        <Text style={styles.listItems}>
                          {group.users[0] ? group.users[0].displayName : ''}
                        </Text>

                        <Text style={styles.listItems}>
                          {group.users[1] ? group.users[1].displayName : ''}
                        </Text>

                        <Text style={styles.listItemsEnd}>
                          {group.users.length - 2 > 0 ? 'more users...' : ''}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
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
      // flexShrink: 1,
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
    marginBottom: '2%',
    flex: 1,
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
    flex: 1,
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

const mapStateToProps = ({userLogin, groups}) => ({userLogin, groups});

export default connect(mapStateToProps)(Groups);
