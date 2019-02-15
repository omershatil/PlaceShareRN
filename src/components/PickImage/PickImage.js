import React, {Component} from 'react';
import {View, Button, StyleSheet, Image} from 'react-native';
import imagePlaceHolder from '../../assets/beautiful-place.jpg';

/**
 * An image picker.
 */
export class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={imagePlaceHolder} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
          <Button title={this.props.title} onPress={() => {}}/>
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
  previewImage: {
    width: '100%',
    height: '100%'
  },
});
