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
    // backgroundColor: 'white',
  },
  panelsContainerClipBoard: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#cc9966',
    padding: '5%',
  },
  panelsContainerLayout: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

const Lists = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, padding: '5%'}}>
        <ScrollView style={styles.panelsContainerClipBoard}>
          <View style={styles.panelsContainerLayout}>
            {listArray.map((list, idx) => {
              return (
                <View style={panelStyle(idx).panel} key={idx}>
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
                      {list.listItems.length - 2 > 0 ? 'list continued...' : ''}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Lists;

/* <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                borderWidth: 4,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'black',
                borderTopColor: 'transparent',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                fontSize: 35,
                textAlign: 'center',
                textAlignVertical: 'center',
                overflow: 'hidden',
                // color: '#11526e',
                color: 'black',
                // color: '#092834',
                // color: '#f4511e',
              }}>
              You have{' '}
              {`${listArray.length} active ${
                listArray.length > 1 ? 'lists' : 'list'
              } `}
            </Text>
          </View> */
