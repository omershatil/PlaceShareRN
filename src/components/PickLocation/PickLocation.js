import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

/**
 * A location picker.
 */
export class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button title='Locate Me' onPress={() => {}}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8,
  },
});
