import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../../styles';

const IsLoading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Loading!</Text>
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
    justifyContent: 'center',
    padding: '2%',
  },
});

export default IsLoading;
