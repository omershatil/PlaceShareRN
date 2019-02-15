import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

/**
 * Here we have a default reusable input.
 * @param props
 * @returns {*}
 */
export const DefaultInput = props => (
  <TextInput
    underlineColorAndroid='transparent'
    {...props}
    // don't allow to completely erase the default style.
    // only allow to override whatever is specified in props.style.
    style={[styles.input, props.style, props.invalid && styles.invalid]}
  />
);
const styles = StyleSheet.create({
  input: {
    width: '100%', // for this to work, the component has to be a screen.
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red',
  }
});
