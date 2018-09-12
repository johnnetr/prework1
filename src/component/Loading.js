import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';


export default class Loading extends React.Component {


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                console.log("We are authenticated now!");
                this.props.navigation.navigate('Tabs');
            }
            else {
                console.log('Not authenticated');
                this.props.navigation.navigate('Login');
            }
        });
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});