import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

import {colors} from '../../styles';

const ViewUsers = ({navigation, route: {params}, users}) => {
  const {id} = params;

  const groupUsers = users.reduce((acc, user) => {
    let found;

    if (user.groups) {
      found = user.groups.find(group => group.id === id);
    } else if (user.usergroup) {
      found = user.usergroup.groupId === id ? user : undefined;
    }

    if (found) {
      acc.push(user);
    }
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      {groupUsers.length > 0 ? (
        groupUsers.map((user, idx) => {
          return (
            <Text key={idx} style={styles.name}>
              {user.displayName}
            </Text>
          );
        })
      ) : (
        <Text style={styles.name}>No Users</Text>
      )}
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

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps)(ViewUsers);
