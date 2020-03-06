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
      // borderWidth: 1,
      // borderColor: 'blue',
      // borderRadius: 1,
      backgroundColor: 'white',
      width: '49%',
      // margin: 1,
      padding: '2%',
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
      <Text style={{marginBottom: 50}}>Here are your active Lists</Text>
      <ScrollView>
        {/* <Image source={require('../assets/bulletinBoard2.jpg')}> */}
        {/* <ImageBackground
          source={require('../assets/bulletinBoard2.jpg')}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'stretch',
            // flex: 1,
          }}> */}
        <View style={styles.panelsContainer}>
          {listArray.map((list, idx) => {
            return (
              <View style={panelStyle(idx).panel} key={idx}>
                <Text
                  style={{
                    paddingLeft: 10,
                    borderLeftColor: '#F8D3D3',
                    borderLeftWidth: 1,
                    // textAlign: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#DFE8EC',
                    // justifyContent: 'center',
                    // alignSelf: 'stretch',
                    fontSize: 25,
                  }}
                  onPress={() => navigation.navigate('ListItems', list)}>
                  {list.listName}
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
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
                      paddingLeft: 10,
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
                      paddingLeft: 10,
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
                      paddingLeft: 10,
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
        {/* </Image> */}
        {/* </ImageBackground> */}
      </ScrollView>
    </View>
  );
};

export default Lists;
