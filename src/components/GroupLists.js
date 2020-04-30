/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import {stickyNotesTiltDegrees} from '../helperFunctions';
import {colors, borders, typography} from '../styles';

const GroupLists = ({route, navigation}) => {
  console.log('2222', route.params);
  const {lists} = route.params;
  const {groupName} = route.params;
  console.log('3333', lists);
  console.log('4444', lists[0].tasks);

  return (
    <View style={styles.panelContainer}>
      <View style={styles.panelsContainerClipBoard}>
        <View style={{flex: 1}}>
          <Text style={styles.clipBoardTitle}>
            Active Lists for {groupName}.
          </Text>
        </View>

        <View style={{flex: 8}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.panelsContainerLayout}>
              {lists.map((list, idx) => {
                return (
                  <View style={panelStyle().panel} key={idx}>
                    <Text
                      style={styles.title}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      onPress={() => navigation.navigate('ListItems', list)}>
                      {list.listName}
                    </Text>
                    <View>
                      <Text style={styles.listItems}>
                        {list.tasks[0] ? list.tasks[0].itemName : ''}
                      </Text>
                      <Text style={styles.listItems}>
                        {list.tasks[1] ? list.tasks[1].itemName : ''}
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

export default GroupLists;
