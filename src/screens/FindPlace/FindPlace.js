import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Animated} from 'react-native';
import {connect} from 'react-redux';
import {PlaceList} from '../../components/PlaceList/PlaceList';

export class _FindPlaceScreen extends Component {
  // this controls the style of the navigator
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      placesLoaded: false,
      removeAnim: new Animated.Value(1),
      placesAnim: new Animated.Value(0)
    };
  }

  /**
   * Navigation will emit willAppear, didAppear, willDisappear, didDisappear events. These are better to use than
   * ComponentDidMount/WillMount b/c the navigator sometimes caches your Components.
   * The nav bar buttons also emit events: NavBarButtonPress. We give it an id so we know which button was pressed.
   * See navigatorButtons.leftButtons[0].id in startMainTabs.js.
   * @param event
   */
  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
      this.props.navigator.toggleDrawer({
        side: 'left'
      });
    }
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState(() => ({
        placesLoaded: true
      }));
      this.placesLoadedHandler();
    });
  };
  itemSelectedHandler = (key) => {
    const selectedPlace = this.props.places.find(place => place.key === key);
    this.props.navigator.push({
      screen: 'awesome-places.PlaceDetailScreen',
      // set the title to be the name of the selected place. find it by key passed-in
      title: selectedPlace.name,
      passProps: {
        selectedPlace
      }
    })
  };

  render() {
    // <Animated.View>, when passing it a style, it will extract the value out of removeAnim
    let content = (
      <Animated.View style={{opacity: this.state.removeAnim, transform: [
          {
            // instead of shrinking, we want it to expand. so here we interpolate and go the reverse
            // direction from 0 to 1. outputRange means that when we get to 0 we want a value of 12 for scale
            // (so 0 equals to 21
            scale: this.state.removeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 1]
            })
          }
        ]}}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View style={{opacity: this.state.placesAnim}}>
          <PlaceList onItemSelected={this.itemSelectedHandler} places={this.props.places}/>
        </Animated.View>
      )
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20,
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26,
  },
});
const mapStateToProps = state => {
  return {
    places: state.places.places
  }
};
export const FindPlaceScreen = connect(mapStateToProps)(_FindPlaceScreen);
