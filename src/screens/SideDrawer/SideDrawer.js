import React, {Component} from 'react';
// Dimensions allows us to find out the dimensions of the device we are running on.
import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class SideDrawer extends Component {
  render() {
    // there's a bug in the navigator. if we don't specify the width below the drawer will not show! here we set it
    // to 80% of the window's width.
    // NOTE: we can pass an array of styles!!!
    return (
      <View style={[styles.container, {width: Dimensions.get('window').width * .8}]}>
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === 'android'? 'md-log-out' : 'ios-log-out'} size={30} color='#aaa' style={styles.drawerItemIcon}/>
            <Text>Sine Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'white',
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  drawerItemIcon: {
    marginRight: 10
  }
});
