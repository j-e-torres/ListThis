import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../../styles';

const ViewUsers = ({navigation, route: {params}}) => {
  const {users} = params;

  return (
    <View style={styles.container}>
      {users.map((user, idx) => {
        return (
          <Text key={idx} style={styles.name}>
            {user.username}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    color: colors.lightBlack,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '2%',
  },
});

export default ViewUsers;
