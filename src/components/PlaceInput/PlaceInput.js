import React from "react";
import {DefaultInput} from '../UI/DefaultInput/DefaultInput';

/**
 * An input for a location.
 * @param props
 * @returns {*}
 * @constructor
 */
export const PlaceInput = (props) => {
  return (
    <DefaultInput
      placeholder="Place Name"
      onChangeText={props.onChangeText}
      value={props.placeData.value}
      invalid={props.placeData.touched && !props.placeData.valid}
    />
  );
};
