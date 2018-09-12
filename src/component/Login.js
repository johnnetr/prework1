import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Button } from '../../node_modules/react-native-elements';
import * as firebase from '../../node_modules/firebase';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', number: null, errorMessage: null, userID: [] }
  }

  loginWithEmail = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
    this.props.navigation.navigate('Me');
  }



  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('595917637444703', {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        return 'Error';
      });
    }
  }

  render() {
    return (
      <View style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
          <Image
            style={{
              height: 800,
              width: 400
            }}
            source={require('../assets/buttonCreate.gif')}
          />
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 200
          }}
        >

          {/*           <View>
            <Text>
              email: test@hotmail.com ||

          </Text>
          </View> */}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder='Your email...'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          {/*           <Text>

            password: angereda
          </Text>} */}
          <TextInput
            style={styles.textInput}
            secureTextEntry
            autoCapitalize="none"
            placeholder='Your password...'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button

            title='Login / Registrate'
            onPress={this.loginWithEmail}
            buttonStyle={{
              backgroundColor: "rgb(128,128,128)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 20,
              marginTop: 10,
            }}
          />
          <Button

            title="Facebook Login"
            onPress={() => this.loginWithFacebook()}
            buttonStyle={{
              backgroundColor: "#3b5999",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 20,
              marginTop: 10,
            }}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5
  },
  longTextInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingBottom: 100,
    marginVertical: 20,
    paddingTop: 20,
  },
})