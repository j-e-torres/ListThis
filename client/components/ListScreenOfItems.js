import React from 'react';
import {Text, View} from 'react-native';

const ListScreenOfItems = ({route: {params}, navigation}) => {
  return (
    <View
      style={{
        padding: '10%',
        alignContent: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          marginBottom: 25,
          textAlign: 'center',
          borderWidth: 1,
          borderColor: '#222',
        }}>
        {params.listName}
      </Text>
      <View>
        {params.listItems.map((item, idx) => {
          return (
            <Text key={idx} style={{marginBottom: 10, textAlign: 'center'}}>
              {item.itemName}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default ListScreenOfItems;
