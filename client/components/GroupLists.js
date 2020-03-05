/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

const GroupLists = ({route, navigation}) => {
  const {lists} = route.params;
  const {groupName} = route.params;

  return (
    <View style={{padding: '10%'}}>
      <Text style={{marginBottom: 50}}>
        Here are your active Lists for {groupName}.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {lists.map((list, idx) => {
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
                onPress={() => navigation.navigate('ListItems', list)}>
                {list.listName}
              </Text>
              <View style={{padding: '5%'}}>
                <Text>
                  {list.listItems[0] ? list.listItems[0].itemName : ''}
                </Text>
                <Text>
                  {list.listItems[1] ? list.listItems[1].itemName : ''}
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

export default GroupLists;
