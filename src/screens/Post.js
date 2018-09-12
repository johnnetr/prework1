import React, { Component } from 'react';
import { Text, Image, TextInput, StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, Tile, Button } from 'react-native-elements';
import { ImagePicker, Permissions, Camera } from 'expo';

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {

            price: null,
            description: null,
            productName: null,
            storeName: null,
            image: null,
            defaultImage: 'https://firebasestorage.googleapis.com/v0/b/itemlister-1406b.appspot.com/o/images%2Fimg_212908.png?alt=media&token=911e30bd-8435-4745-aabc-470c88eef72f'
        };
    };


    async writePost(storeName) {
        const { description, productName, image, price } = await this.state;
        const key = await firebase.database().ref().push().key;
        const postData = await {

            key: key,
            productName: productName,
            description: description,
            storeName: storeName,
            image: image,
            price: price

        };
        await firebase.database().ref(`/products/${key}`).update(postData);
        await firebase.database().ref(`/allProducts/${key}`).update(postData);
        await this.props.navigation.state.params.refresh();
        this.props.navigation.navigate('MyShop');
    }


    pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPerm === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                const key = firebase.database().ref().push().key;
                this.uploadImage(result.uri, key)
                    .then(() => {
                        Alert.alert("Success");
                    })
                    .catch((error) => {
                        Alert.alert(error);
                    });
            }
        }
    };

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = await firebase.storage().ref().child("images/" + imageName)


        return ref.put(blob).then(() => {
            ref.getDownloadURL().then((url) => this.setState({ image: url, defaultImage: url }));
        });
    }


    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data');

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.pickImage()}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: this.state.defaultImage }}
                    />

                </TouchableOpacity>
                <Text style={{ marginTop: 10, color: 'grey', fontSize: 10 }}>choose an image</Text>


                <FormLabel style={{ marginTop: 20 }}>Your Product Name</FormLabel>
                <View style={{ width: '90%', borderWidth: 1, borderRadius: 5, }}>
                    <FormInput
                        multiline={true}
                        autoCorrect={false}
                        placeholder='E.g. Volvo 90XC..'
                        onChangeText={productName => this.setState({ productName: productName })}
                    />
                </View>
                <FormLabel>Description</FormLabel>
                <View style={{ width: '90%', borderWidth: 1, borderRadius: 5, }}>
                    <FormInput
                        multiline={true}
                        autoCorrect={false}
                        placeholder='E.g. Best car ever..'
                        onChangeText={description => this.setState({ description: description })}
                    />
                </View>

                <FormLabel>Price in USD</FormLabel>
                <View style={{ width: '90%', borderWidth: 1, borderRadius: 5, }}>
                    <FormInput
                        multiline={true}
                        autoCorrect={false}
                        placeholder='E.g. 20$..'
                        onChangeText={price => this.setState({ price: price })}
                    />
                </View>

                <Button
                    title='Create'
                    onPress={() => this.writePost(data)}
                    buttonStyle={{
                        marginTop: 20,
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
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
