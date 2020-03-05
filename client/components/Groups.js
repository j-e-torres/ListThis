import React from 'react';
import {Text, View} from 'react-native';

import groupsArray from '../fakeDB/groupsDB';

const Groups = ({navigation}) => {
  return (
    <View style={{padding: '10%'}}>
      <Text style={{marginBottom: 50}}>
        Active Groups with their respective Lists
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {groupsArray.map((group, idx) => {
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
                onPress={() => navigation.navigate('GroupLists', group)}>
                {group.groupName}
              </Text>
              <View style={{padding: '5%'}}>
                <Text>{group.lists[0] ? group.lists[0].listName : ''}</Text>
                <Text>{group.lists[1] ? group.lists[1].listName : ''}</Text>
                <Text>...</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Groups;
