import React from 'react';
import {Text, StyleSheet} from 'react-native';

/**
 * There are no cascading fonts in RN. So, you can’t just set fonts on the container and expect them to be
 * passed down to the children. So, we create common components that we reuse them,
 * because if you wrap <Text> with other <Text> styles will cascade!
 * @param props
 * @returns {*}
 */
export const MainText = props => (
  <Text style={[styles.mainText, props.style]}>{props.children}</Text>
);
const styles = StyleSheet.create({
  mainText: {
    color: '#bbb',
    // this is for ios
    backgroundColor: 'transparent'
  },
});
