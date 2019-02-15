import React from "react";
import { StyleSheet, FlatList } from "react-native";

import {ListItem} from "../ListItem/ListItem";

/**
 * A component that renders a list of places.
 * @param props
 * @returns {*}
 * @constructor
 */
export const PlaceList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={(info) => (
        <ListItem
          placeName={info.item.name}
          placeImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

