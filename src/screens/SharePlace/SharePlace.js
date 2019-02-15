import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions/places';
import {MainText} from '../../components/UI/MainText/MainText';
import {HeadingText} from '../../components/UI/HeadingText/HeadingText';
import {PickImage} from '../../components/PickImage/PickImage';
import imagePlaceHolder from '../../assets/beautiful-place.jpg';
import {PlaceInput} from '../../components/PlaceInput/PlaceInput';
import {PickLocation} from '../../components/PickLocation/PickLocation';
import {validate} from '../../utility/validation';

class _SharePlaceScreen extends Component {
  // this controls the style of the navigator
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        }
      }
    }
  }

  placeNameChangedHandler = value => {
    this.setState((prevState) => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value,
          valid: validate(value, prevState.controls.placeName.validationRules),
          touched: true
        }
      }
    }));
  };

  placeSubmitHandler = () => {
    const sharePlace = this.state.controls.placeName.value;
    if (!sharePlace || sharePlace.trim() === '') {
      return;
    }

    this.props.onAddPlace(sharePlace);
  };

  /**
   * Navigation will emit willAppear, didAppear, willDisappear, didDisappear events. These are better to use than
   * ComponentDidMount/WillMount b/c the navigator sometimes caches your Components!
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

  render() {
    // you can't set 'style' on <ScrollView> with flexbox. you have to set it on a specific property,
    // 'contentContainerStyle'. that's b/c we are trying to limit the view of an "unlimited" scrolling view and
    // I guess it takes special handling.
    // NOTE: he then went on to remove styling on contentContainerStyle, and added a <View> within <ScrollView>
    // and set the styling on that...
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
          <PickImage title='Pick Image'/>
          <PickLocation/>
          <PlaceInput
            onChangeText={this.placeNameChangedHandler}
            placeData={this.state.controls.placeName}
          />
          <View style={styles.button}>
            <Button title='Share The Place!' onPress={this.placeSubmitHandler} disabled={!this.state.controls.placeName.valid}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
};
export const SharePlaceScreen = connect(null, mapDispatchToProps)(_SharePlaceScreen);
