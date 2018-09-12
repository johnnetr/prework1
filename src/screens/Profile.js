import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Tile, Button } from 'react-native-elements';
import * as firebase from 'firebase';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { userProfile: undefined, avatarSource: null, LoggedIn: false, refresh: false, refresh1: false };
  };

  componentWillMount() {
    this.retrieveUserProfile();
  };

  async retrieveUserProfile() {
    const userID = await firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${userID}`).on('value', (data) => {
      this.setState({ userProfile: data.toJSON() });
      console.log(this.state.userProfile);
    });
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
      const userName = this.state.userProfile.name;

      return (
        <View>
          <Tile
            featured
            imageSrc={require('../assets/buttonCreate.gif')}
            title={userName}
          />

          <View style={{ marginVertical: 20 }}>


            <Button
              title="Setting"
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
            <Button
              title="Order"
              buttonStyle={{ marginTop: 20 }}
              onPress={() => this.signOut()}
              buttonStyle={{
                backgroundColor: "#268FF2",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 20,
                marginTop: 10,
              }}
            />
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150 }} onPress={() => this.signOut()}>
              <Text style={{color: 'grey'}}>logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
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