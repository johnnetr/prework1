import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';


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
      <View style={styles.container}>
        <Text>
          Try this account
          </Text>}

        <View>
          <Text>
            email: test@hotmail.com ||
            password: angereda
          </Text>}
          </View>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button

          title='Login with email'
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
            backgroundColor: "rgb(0,0,205)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 20,
            marginTop: 10,
          }}
        />
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
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
})
