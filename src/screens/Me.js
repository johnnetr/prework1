import React, { Component } from '../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Tile, Button } from 'react-native-elements';
import * as firebase from 'firebase';


export default class Me extends Component {
  constructor(props) {
    super(props);

    this.state = { userProfile: undefined, avatarSource: null, LoggedIn: false, refresh: false, refresh1: false };
  };

  componentWillMount() {
    this.retrieveUserProfile();
  };

  logicHandler() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log("We are authenticated now!");
        this.setState({ LoggedIn: true });
      }
      else {
        console.log('Not authenticated');
        this.props.navigation.navigate('Login');
      }

    });
  };

  async retrieveUserProfile() {
    await this.logicHandler();
    if (this.state.LoggedIn === true) {
      const userID = await firebase.auth().currentUser.uid;
      firebase.database().ref(`users/${userID}`).on('value', (data) => {
        this.setState({ userProfile: data.toJSON() });
      });
    }
    else {
      Alert.alert('Please Login First');
    }
  };

  refreshPage = () => {
    this.retrieveUserProfile();
  }

  // Signout
  signOut() {
    firebase.auth().signOut();
    this.setState({ refresh: true });
  }

  // Navigate to Edit
  Edit() {
    this.props.navigation.navigate('Edit');
  }

  render() {
    const userProfile = this.state.userProfile;

    if (userProfile != undefined) {
      const userID = this.state.userProfile.userID;
      const userImage = this.state.userProfile.userImage;

      return (
        <View>
          <Tile
            featured
            imageSrc={{ uri: this.state.userProfile.userImage }}
          />

          <Button
            title="logout"
            buttonStyle={{ marginTop: 20 }}
            onPress={() => this.signOut()}
            buttonStyle={{
              backgroundColor: "rgb(128,128,128)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 20,
              marginTop: 10,
            }}
          />


        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>Chill man...</Text>
          <Button
            onPress={() => this.refreshPage()}
            title='Magic Button, do not click'
          />
        </View>
      )
    };
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});