import React from 'react';
import {Text, View} from 'react-native';

import listArray from '../fakeDB';
import ListScreenOfItems from './ListScreenOfItems';
/*
   Will grab data of lists inside this particular group
   Will display a list of lists, show name of list, 2 items then ...
   Show 4 examples
   Will be a presentational component???
   can user delete list?
*/

const GroupScreenOfLists = ({navigation}) => {
  return (
    <View style={{padding: '10%'}}>
      <Text style={{marginBottom: 50}}>Group Name: Test</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {listArray.map((list, idx) => {
          return (
            <View
              style={{
                width: '50%',
                marginBottom: 25,
                borderColor: 'black',
                borderWidth: 1,
              }}
              key={idx}>
              <Text
                style={{
                  textAlign: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: 'red',
                }}
                onPress={() => navigation.navigate('ListScreen', list)}>
                {list.listName}
              </Text>
              <View style={{padding: '5%'}}>
                <Text>
                  {list.listItems[0].itemName ? list.listItems[0].itemName : ''}
                </Text>
                <Text>
                  {list.listItems[1].itemName ? list.listItems[1].itemName : ''}
                </Text>
                <Text>...</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default GroupScreenOfLists;
