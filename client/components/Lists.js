/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';

import listArray from '../fakeDB/listsDB';
import {stickyNotesTiltDegrees} from '../helperFunctions';

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
      backgroundColor: 'white',
      width: '49%',
      // margin: 1,
      // padding: '2%',
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: '4%',
  },
  panelsContainerClipBoard: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#cc9966',
    padding: '5%',
    marginHorizontal: -10,
  },
  panelsContainerLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
});

const Lists = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.panelsContainerClipBoard}>
        <View style={{flex: 1}}>
          <Text
            style={{
              marginVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: 'black',
              fontSize: 25,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'black',
            }}>
            You have{' '}
            {`${listArray.length} active ${
              listArray.length > 1 ? 'lists' : 'list'
            } `}
          </Text>
        </View>
        <View style={{flex: 8}}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View style={styles.panelsContainerLayout}>
              {listArray.map((list, idx) => {
                return (
                  <View style={panelStyle().panel} key={idx}>
                    <Text
                      style={{
                        paddingLeft: 5,
                        borderLeftColor: '#F8D3D3',
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: '#DFE8EC',
                        fontSize: 25,
                        color: '#f88d6d',
                        fontWeight: 'bold',
                      }}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      onPress={() => navigation.navigate('ListItems', list)}>
                      {list.listName}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 5,
                        borderLeftColor: '#F8D3D3',
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: '#DFE8EC',
                        fontSize: 18,
                        fontStyle: 'italic',
                        fontWeight: '100',
                        color: '#9d9d9d',
                      }}>
                      Group: {list.groupName}
                    </Text>
                    <View>
                      <Text
                        style={{
                          paddingLeft: 5,
                          borderLeftColor: '#F8D3D3',
                          borderLeftWidth: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: '#DFE8EC',
                          color: '#9d9d9d',
                        }}>
                        {list.listItems[0].itemName
                          ? list.listItems[0].itemName
                          : ''}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: 5,
                          borderLeftColor: '#F8D3D3',
                          borderLeftWidth: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: '#DFE8EC',
                          color: '#9d9d9d',
                        }}>
                        {list.listItems[1].itemName
                          ? list.listItems[1].itemName
                          : ''}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: 5,
                          borderLeftColor: '#F8D3D3',
                          borderLeftWidth: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: '#DFE8EC',
                          fontSize: 12,
                          color: '#999',
                          fontStyle: 'italic',
                        }}>
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
