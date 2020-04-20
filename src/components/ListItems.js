/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {colors, borders, typography} from '../styles';

const completed = bool =>
  StyleSheet.create({
    task: {
      flex: 3,
      fontSize: typography.font30,
      color: bool === true ? colors.lightGrey : colors.lightBlack,
      textDecorationLine: bool === true ? 'line-through' : 'none',
    },
    taskOwner: {
      flex: 1,
      fontSize: typography.font14,
      color: colors.lightGrey,
    },
  });

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: '4%',
    // justifyContent: 'space-between',
  },

  panelsContainerClipBoard: {
    flex: 1,
    ...borders.clipBoardBorder,
  },

  panelsContainerLayout: {
    ...typography.clipBoardListLayout,
  },
  itemLine: {
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: colors.lightPink2,
    borderBottomColor: colors.lightGreyBlue2,
    flexDirection: 'row',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'space-between',
  },

  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: borders.borderRadius50,
    borderColor: colors.darkOrange,
    borderWidth: borders.borderWidth1,
  },

  buttonText: {color: colors.lightOrange, fontSize: 25},

  iconHeader: {
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: '2%',
  },

  footer: {
    flex: 2,
    borderWidth: 1,
    borderColor: colors.lightBlack,
    borderRadius: 50,
    flexWrap: 'wrap',
  },

  footerHeader: {
    color: colors.lightOrange,
    fontSize: typography.font30,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightOrange,
    textAlign: 'center',
  },

  footerContent: {
    color: colors.lightBlack,
    fontSize: typography.font20,
  },
});

const ListItems = ({route: {params}, navigation}) => {
  const sortByCompleted = params.listItems.sort((a, b) =>
    a.completed > b.completed ? 1 : -1,
  );

  return (
    <View style={styles.panelContainer}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.iconHeader}>
            <TouchableOpacity
              onPress={() => Alert.alert('Simple Button pressed')}>
              <Icon name="add-to-list" size={40} color={colors.lightBlack} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert('Simple Button pressed')}>
              <Icon name="add-user" size={40} color={colors.lightBlack} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert('Simple Button pressed')}>
              <Icon name="users" size={40} color={colors.lightBlack} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{flex: 3}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {sortByCompleted.map((item, idx) => {
            return (
              <View key={idx} style={styles.itemLine}>
                <Text style={completed(item.completed).task}>
                  {item.itemName}
                </Text>

                {item.completed === true ? (
                  <Text style={completed(item.completed).taskOwner}>
                    completed by xxx
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => Alert.alert('Simple Button pressed')}
                    style={completed(item.completed).taskOwner}>
                    <Icon name="edit" size={20} color={colors.lightBlack} />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={{flex: 1, padding: '2%'}}>
          <View>
            <Text style={styles.footerHeader}>Notes</Text>
          </View>

          <View>
            <Text style={styles.footerContent}>
              Blah blah
              oqefokoqkfoqkfqejfgoiqejgiqoejgioeqjgiqejgoqiejgiqejgioqjgiqegjq
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListItems;
