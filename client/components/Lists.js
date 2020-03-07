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
    // padding: 10,
  },
  panelsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    padding: '5%',
    backgroundColor: '#cc9966',
  },
});

const Lists = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            paddingBottom: '1%',
            borderWidth: 1,
            borderStyle: 'solid',
            // borderColor: 'black',
            // borderRadius: 40,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#f4511e',
            borderTopColor: 'transparent',
            // backgroundColor: 'blue',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            fontSize: 35,
            textAlign: 'center',
            textAlignVertical: 'center',
            overflow: 'hidden',
            color: '#f77a55',
          }}>
          Here are your active Lists
        </Text>
      </View>

      <View style={{flex: 4}}>
        <ScrollView>
          <View style={styles.panelsContainer}>
            {listArray.map((list, idx) => {
              return (
                <View style={panelStyle(idx).panel} key={idx}>
                  <Text
                    style={{
                      paddingLeft: 5,
                      borderLeftColor: '#F8D3D3',
                      borderLeftWidth: 1,
                      // textAlign: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: '#DFE8EC',
                      fontSize: 25,
                      // textAlignVertical: 'center',
                    }}
                    adjustsFontSizeToFit
                    // allowFontScaling
                    numberOfLines={1}
                    onPress={() => navigation.navigate('ListItems', list)}>
                    {list.listName}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 5,
                      borderLeftColor: '#F8D3D3',
                      borderLeftWidth: 1,
                      // textAlign: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: '#DFE8EC',
                      fontSize: 18,
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
