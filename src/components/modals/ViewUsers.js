import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

import {colors} from '../../styles';

const ViewUsers = ({navigation, route: {params}, users, userLogin}) => {
  const {id} = params;
  // console.log('viewUsers,userLogin', userLogin);
  // console.log('viewUsers,user 1', users[0]);
  // console.log('viewUsers,user 2', users[1]);

  const groupUsers = users.reduce((acc, user) => {
    const found = user.groups.find(group => group.id === id);
    if (found) {
      acc.push(user);
    }
    return acc;
  }, []);

  // console.log('viewUsers, groupUsers', groupUsers);

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

const mapStateToProps = ({users, userLogin}) => ({users, userLogin});

export default connect(mapStateToProps)(ViewUsers);
