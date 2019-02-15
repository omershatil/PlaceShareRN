import React from 'react';
import {Text, StyleSheet} from 'react-native';

/**
 * Here we have a default reusable heading. Note the passing of the actual text (props.children).
 * @param props
 * @returns {*}
 */
export const HeadingText = props => (
  <Text
    {...props}
    // don't allow to completely erase the default style.
    // only allow to override whatever is specified in props.style.
    style={[styles.textHeadings, props.style]}
  >{props.children}</Text>
);
const styles = StyleSheet.create({
  textHeadings: {
    fontSize: 28,
    fontWeight: "bold"
  },
});
