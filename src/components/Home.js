/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';

import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {colors, borders, typography} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 25,
  },

  title: {
    // flex: 1,
    textAlign: 'center',
    fontSize: typography.font30,
    color: colors.lightBlack,
  },
  subTitle: {
    fontSize: typography.font16,
    textAlign: 'center',
    color: colors.lightBlack,
  },
  secondaryTitle: {
    textAlign: 'center',
    fontSize: typography.font25,
    color: colors.lightOrange,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: borders.borderRadius50,
    borderColor: colors.darkOrange,
    borderWidth: borders.borderWidth1,
  },
  invitationCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  invitationCode: {
    borderWidth: borders.borderWidth1,
    borderColor: colors.lightGrey,
    textAlign: 'center',
    borderRadius: borders.borderRadius5,
  },
  buttonText: {color: colors.lightOrange, fontSize: 25},
});

const Home = ({navigation}) => {
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const testOnChange = ({nativeEvent}) => {
    // console.log('testOnChange', nativeEvent);
    // const {text} = nativeEvent;
    // if (text !== '') this.borderColor = colors.darkOrange;
    // else this.borderColor = colors.darkOrange;
  };

  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      console.log(index, value);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          // this[borderColor] = colors.darkOrange;
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>
          Welcome to <Text style={{fontStyle: 'italic'}}>list</Text>THIS{' '}
        </Text>
        <Text style={styles.subTitle}>choose one of the options below</Text>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'space-evenly',
          alignContent: 'center',
        }}>
        <Text style={styles.secondaryTitle}>Enter your invitation code</Text>

        <View style={styles.invitationCodeContainer}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            thirdTextInputRef,
            fourthTextInputRef,
            fifthTextInputRef,
            sixthTextInputRef,
          ].map((ref, idx) => {
            return (
              <TextInput
                key={idx}
                multiline
                numberOfLines={1}
                maxLength={1}
                onChange={testOnChange}
                style={styles.invitationCode}
                onChangeText={onOtpChange(idx)}
                ref={ref}
              />
            );
          })}
        </View>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}>
          <Text style={{color: colors.lightOrange, fontSize: 25}}>
            Create a Group
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Groups')}>
          <Text style={styles.buttonText}>Your Groups</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Lists')}>
          <Text style={styles.buttonText}>Your Lists</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
