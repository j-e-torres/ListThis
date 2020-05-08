import React from 'react';

import {View, Text} from 'react-native';

const ViewUsers = ({navigation, users}) => {
  return (
    <View>
      {users.map((user, idx) => {
        return <Text key={idx}>{user.username}</Text>;
      })}
    </View>
  );
};

export default ViewUsers;
