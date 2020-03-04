import React from 'react';

import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 25,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    // marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    color: '#fff',
    borderRadius: 50,
  },
  invitationCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invitationCode: {
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    textAlign: 'center',
  },
});

//psuedo loop for invitationCode
let counter = [];
for (let i = 0; i < 7; ++i) {
  counter.push(i);
}

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to ListThis, choose one of the options below.
      </Text>

      <View>
        <Text style={styles.title}>Enter your invitation code</Text>

        <View style={styles.invitationCodeContainer}>
          {counter.map((num, idx) => {
            return (
              <TextInput
                key={idx}
                multiline
                numberOfLines={1}
                maxLength={1}
                style={styles.invitationCode}
              />
            );
          })}
        </View>
      </View>

      <Separator />

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Simple Button pressed')}>
        <Text style={{color: 'blue'}}> Create a Group </Text>
      </TouchableOpacity>

      <Separator />

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}>
          <Text onPress={() => navigation.navigate} style={{color: 'blue'}}>
            {' '}
            Your Groups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}>
          <Text onPress={() => navigation.navigate} style={{color: 'blue'}}>
            {' '}
            Your Lists
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
