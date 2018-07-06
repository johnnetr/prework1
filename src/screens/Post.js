import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, ActivityIndicator, Button, Alert } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput } from 'react-native-elements';

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {

            //testing
            description: null,
            title: null,
        };
    };


    async writePost() {
        const { title, description } = await this.state;
        const jobPostKey = await firebase.database().ref().push().key;
        const postData = await {

            key: jobPostKey,
            title: 'Your tweet:',
            description: description,
            likes: 0,

        };
        await firebase.database().ref(`/jobs/${jobPostKey}`).update(postData);
        await this.props.navigation.state.params.refresh();
        this.props.navigation.navigate('Feeds');
    }


    render() {



        return (
            <View style={styles.container}>


                <FormLabel>You will die tomorrow, last tweet man...</FormLabel>
                <View style={{ width: '90%', borderWidth: 1, borderRadius: 5,}}>
                <FormInput 
                multiline={true}
                autoCorrect={false}
                placeholder='Max two words'
                onChangeText={description => this.setState({ description: description })}
                />
                </View>

                <Button
                    title='Publish'
                    onPress={() => this.writePost()}
                />
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,

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
});
