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

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 25,
    // width: '75%',
    // margin: 0,
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
  myButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#640d67',
  },
});

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to ListThis, choose one of the options below.
      </Text>

      <View>
        <Text style={styles.title}>Enter your invitation code</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            placeholder="_"
            multiline
            numberOfLines={1}
            maxLength={1}
          />
          <TextInput
            placeholder="_"
            multiline
            numberOfLines={1}
            maxLength={1}
          />
          <TextInput
            placeholder="_"
            multiline
            numberOfLines={1}
            maxLength={1}
          />
          <TextInput
            placeholder="_"
            multiline
            numberOfLines={1}
            maxLength={1}
          />
          <TextInput
            placeholder="_"
            multiline
            numberOfLines={1}
            maxLength={1}
          />
          <TextInput
            placeholder="_"
            multiline
            numberOfLines={1}
            maxLength={1}
          />
        </View>
      </View>

      {/* <Button
        title="test me bitch"
        onPress={() => Alert.alert('testing bitch')}
        // color="#fff"
      /> */}

      <Separator />

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Simple Button pressed')}>
        <Text style={{color: 'blue'}}> Create a Group </Text>
      </TouchableOpacity>

      <Separator />

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Simple Button pressed')}>
        <Text style={{color: 'blue'}}> View Existing Groups or Lists</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
