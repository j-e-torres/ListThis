import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import groupsArray from '../fakeDB/groupsDB';
import {stickyNotesTiltDegrees} from '../helperFunctions';
import {colors, borders, typography} from '../styles';

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
  panelContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: '4%',
  },
  panelsContainerClipBoard: {
    flex: 1,
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

const Groups = ({navigation}) => {
  return (
    <View style={styles.panelContainer}>
      <View style={styles.panelsContainerClipBoard}>
        <View style={{flex: 1}}>
          <Text style={styles.clipBoardTitle}>
            You have{' '}
            {`${groupsArray.length} active ${
              groupsArray.length > 1 ? 'groups' : 'group'
            } `}
          </Text>
        </View>

        <View style={{flex: 8}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.panelsContainerLayout}>
              {groupsArray.map((group, idx) => {
                return (
                  <View style={panelStyle().panel} key={idx}>
                    <Text
                      style={styles.title}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      onPress={() => navigation.navigate('GroupLists', group)}>
                      {group.groupName}
                    </Text>

                    <Text style={styles.secondaryTitle}>Lists:</Text>

                    <View>
                      <Text style={styles.listItems}>
                        {group.lists[0] ? group.lists[0].listName : ''}
                      </Text>

                      <Text style={styles.listItems}>
                        {group.lists[1] ? group.lists[1].listName : ''}
                      </Text>

                      <Text style={styles.listItemsEnd}>
                        {group.lists.length - 2 > 0
                          ? 'groups continued...'
                          : ''}
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

export default Groups;
