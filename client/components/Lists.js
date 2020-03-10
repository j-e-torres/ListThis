/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import listArray from '../fakeDB/listsDB';
import {stickyNotesTiltDegrees} from '../helperFunctions';
import {colors, borders, typography} from '../styles';

/*
   Will grab data of lists inside this particular group
   Will display a list of lists, show name of list, 2 items then ...
   Show 4 examples
   Will be a presentational component???
   can user delete list?
*/

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

const Lists = ({navigation}) => {
  return (
    <View style={styles.panelContainer}>
      <View style={styles.panelsContainerClipBoard}>
        <View style={{flex: 1}}>
          <Text style={styles.clipBoardTitle}>
            You have{' '}
            {`${listArray.length} active ${
              listArray.length > 1 ? 'lists' : 'list'
            } `}
          </Text>
        </View>

        <View style={{flex: 8}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.panelsContainerLayout}>
              {listArray.map((list, idx) => {
                return (
                  <View style={panelStyle().panel} key={idx}>
                    <Text
                      style={styles.title}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      onPress={() => navigation.navigate('ListItems', list)}>
                      {list.listName}
                    </Text>

                    <Text style={styles.secondaryTitle}>
                      Group: {list.groupName}
                    </Text>

                    <View>
                      <Text style={styles.listItems}>
                        {list.listItems[0].itemName
                          ? list.listItems[0].itemName
                          : ''}
                      </Text>

                      <Text style={styles.listItems}>
                        {list.listItems[1].itemName
                          ? list.listItems[1].itemName
                          : ''}
                      </Text>

                      <Text style={styles.listItemsEnd}>
                        {list.listItems.length - 2 > 0
                          ? 'list continued...'
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

export default Lists;
