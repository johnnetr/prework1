import React, { Component } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Card, Button } from "react-native-elements";
import * as firebase from 'firebase';

class MyShop extends Component {
  static navigationOptions = {
    title: 'CoderSchool',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      reversedData: null,
      error: null,
      refreshing: false,
    };
  }

  componentWillMount() {

    firebase.database().ref('/products/').on('value', (snap) => {
      const newArr = [];
      snap.forEach((child) => {
        newArr.push(
          child.val()
        )
      })
      this.setState({ data: newArr, storeName: 'CoderSchool' });
    });
  }

  /*   makeRemoteRequest = async () => {
      const newArr = [];
      const { page } = await this.state;
      const url = await `https://itemlister-1406b.firebaseio.com/products.json/`;
      await this.setState({ loading: true });
  
      fetch(url)
        .then(res => res.json())
        .then(res => {
  
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
          console.log(this.state.reversedData);
        })
        .catch(error => {
          this.setState({ error, loading: false });
        })
    }; */


  viewMore = (item) => {
    this.props.navigation.navigate('ProductDetailScreen', {
      data: item,
    })
  };

  deleteButton = async (item) => {
    const ref = await firebase.database().ref('products/' + item.key);
    const ref2 = await firebase.database().ref('allProducts/' + item.key);
    await ref.set(null);
    ref2.set(null);
  };


  newPost = () => {
    this.props.navigation.navigate('Post', { refresh: this.refreshChild, data: this.state.storeName });

  }

  refreshChild = () => {
    this.componentDidCatch;
  }


  render() {

    const data = this.state.data;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Card
              featuredTitle={item.productName}
              image={{ uri: item.image }}
              containerStyle={{ borderRadius: 10 }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                <Button
                  title='View'
                  onPress={() => this.viewMore(item)}
                  buttonStyle={{
                    backgroundColor: "#7BB832",
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 10
                  }}
                />
                <Button
                  title='Delete'
                  onPress={() => this.deleteButton(item)}
                  buttonStyle={{
                    backgroundColor: "rgb(128,128,128)",
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 10
                  }}
                />
              </View>
            </Card>
          )}
          keyExtractor={(item, key) => key.toString()}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />

        {/* Button, deconstruct it and make another component later */}
        <TouchableOpacity onPress={() => this.newPost()}>
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
                  height: 120,
                  width: 400
                }}
                source={require('../assets/buttonCreate.gif')}
              />
            </View>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 35,
                  color: 'white'
                }}
              >
                create product
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Button ends */}
      </View >
    );
  }
}

export default MyShop;
