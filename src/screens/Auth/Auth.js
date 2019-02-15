import React, {Component} from 'react';
import {View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback,
  ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {startTabs} from '../MainTabs/startMainTabs';
import {DefaultInput} from '../../components/UI/DefaultInput/DefaultInput';
import {HeadingText} from '../../components/UI/HeadingText/HeadingText';
import {MainText} from '../../components/UI/MainText/MainText';
import {ButtonWithBackground} from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg'
import {validate} from '../../utility/validation';
import {connect} from 'react-redux';
import {tryAuth} from '../../store/actions/auth';

class _AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get('window').height > 600 ? 'portrait' : 'landscape',
      authMode: 'login',
      // build our own validation with validation
      controls: {
        email: {
          value: '',
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: '',
          valid: false,
          validationRules: {
            equalTo: 'password'
          },
          touched: false
        }
      }
    };
    // register a listener so we can dynamically change the screen layout to be more responsive
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount(): void {
    // don't forget to remove the listener
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState=> {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  };
  updateStyles = dims => {
    this.setState(() => ({
      viewMode: Dimensions.get('window').height > 600 ? 'portrait' : 'landscape'
    }));
  };

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };
    this.props.onLogin(authData);
    startTabs();
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }
    this.setState((prevState) => {
      const control = prevState.controls[key];
      return ({
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password' ?
              validate(
                prevState.controls.confirmPassword.value,
                prevState.controls.confirmPassword.validationRules,
                connectedValue) :
              prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...control,
            value,
            valid: validate(value, control.validationRules, connectedValue),
            touched: true
          }
        }
      });
    });
  };

  render(): React.ReactNode {
    let headingText = null;
    let confirmPasswordControl = null;

    // only display the heading if we have a tall-enough window
    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View
          style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
          <DefaultInput
            placeholder='Confirm Password'
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={(value) => this.updateInputState('confirmPassword', value)}
            invalid={this.state.controls.confirmPassword.touched && !this.state.controls.confirmPassword.valid}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
          />
        </View>
      );
    }
    // note that could do the following to override <DefaultInput>'s default and this stylesheet's settings,
    // by setting a new borderColor, which overrides styles.input #bbb, <DefaultInput> #eee, with 'red':
    // <DefaultInput placeholder='Password'  style={[styles.input, {borderColor: 'red'}]}/>
    // Also, note below that <ImageBackground> has to have a style with a width.
    // Finally, KeyboardAvoidingView makes the keyboard behave better and not cover input items
    // so we don't need to close the keyboard in order to be able to go to the next input element
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          {headingText}
          <ButtonWithBackground
            color='#29aaf4'
            onPress={this.switchAuthModeHandler}
          >Switch To {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder='You Email Address'
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={(value) => this.updateInputState('email', value)}
                invalid={this.state.controls.email.touched && !this.state.controls.email.valid}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
              />
              <View
                style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ?
                  styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                <View
                  style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ?
                    styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                  <DefaultInput
                    placeholder='Password'
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={(value) => this.updateInputState('password', value)}
                    invalid={this.state.controls.password.touched && !this.state.controls.password.valid}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground
            color='#29aaf4'
            onPress={this.loginHandler}
            disabled={!this.state.controls.email.valid ||
            !this.state.controls.password.valid ||
            !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup'}
          >Submit
          </ButtonWithBackground>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  container: {
    // we used these in order to see how much space the view was taking. We saw it was taking as much space as its
    // children needed, so we set flex: 1 so that it takes the whole screen.
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  // NOTE: override <DefaultInput> style
  input: {
    backgroundColor: '#eee', // lighter gray
    borderColor: '#bbb', // darker gray
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  landscapePasswordWrapper: {
    width: '40%',
  },
  portraitPasswordWrapper: {
    width: '100%',
  },
});
const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData))
  };
};
export const AuthScreen = connect(null, mapDispatchToProps)(_AuthScreen);
