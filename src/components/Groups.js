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
  // console.log('groups', groups[2].lists.length);
  const userGroups = groups;
  return (
    <View style={styles.panelContainer}>
      <View style={{flex: 1}}>
        <View style={styles.iconHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateGroupModal')}>
            <Icon name="add-to-list" size={40} color={colors.lightBlack} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.panelsContainerClipBoard}>
        <View style={{flex: 1}}>
          <Text style={styles.clipBoardTitle}>
            You have{' '}
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
                  <View style={panelStyle().panel} key={idx}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      onPress={() => navigation.navigate('GroupLists', group)}>
                      {group.groupName}
                    </Text>

                    <Text style={styles.secondaryTitle}>
                      {group.lists.length > 0 ? 'Lists:' : 'No Lists'}
                    </Text>

                    {group.lists && (
                      <View>
                        <Text style={styles.listItems}>
                          {group.lists[0] ? group.lists[0].listName : ''}
                        </Text>

                        <Text style={styles.listItems}>
                          {group.lists[1] ? group.lists[1].listName : ''}
                        </Text>

                        <Text style={styles.listItemsEnd}>
                          {group.lists.length - 2 > 0
                            ? 'lists continued...'
                            : ''}
                        </Text>
                      </View>
                    )}
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

const mapStateToProps = ({userLogin, groups}) => ({userLogin, groups});

export default connect(mapStateToProps)(Groups);
