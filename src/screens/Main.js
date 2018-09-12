import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Card, Button, Image } from "react-native-elements";
import * as firebase from 'firebase';

export default class Main extends Component {
    static navigationOptions = {
        title: 'All Products',
      };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            reversedData: null,
            error: null,
            refreshing: false,
            test: null,
            refresh1: false,
            title: null,
        };
    }

    componentDidMount() {

        firebase.database().ref('/allProducts/').on('value', (snap) => {
            const newArr = [];
            snap.forEach((child) => {
                newArr.push(
                    child.val()
                )
            })
            this.setState({data: newArr});
            console.log(this.state.data);
        })
    }

    /*  makeRemoteRequest = async () => {
         const newArr = [];
         const { page } = await this.state;
         const url = await `https://itemlister-1406b.firebaseio.com/products.json/`;
         await this.setState({ loading: true });
 
         fetch(url)
             .then(res => res.json())
             .then(res => {
                 console.log(res);
 
                 // since Flatlist cant read unique keys by Firebase we converted to Object. And Reverse the index for Flatlist.
                 Object.keys(res).map((key, index) => {
                     newArr.push(res[key]);
                     this.setState({
                         data: newArr,
                         error: res.error || null,
                         loading: false,
                         refreshing: false,
                         test: res,
                     });
                 });
                 this.setState({
                     reversedData: this.state.data.reverse()
                 });
             })
             .catch(error => {
                 this.setState({ error, loading: false });
             })
     }; */

    click(item) {
        this.props.navigation.navigate('ProductDetailScreen', {
            data: item,
        })
        console.log('data:', item);
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        //Click to navigate to productdetail
                        <TouchableOpacity onPress={() => this.click(item)}>
                            <Card
                            containerStyle={{borderRadius: 10}}
                                featuredTitle={item.productName}
                                image={{ uri: item.image }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >

                                    <Text>
                                        By
                                        {` ${item.storeName}`}
                                    </Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, key) => key.toString()}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                />
            </View>
        )
    }
}