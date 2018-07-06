import React, { Component } from "react";
import { Text, FlatList, View } from "react-native";
import { Card, Button } from "react-native-elements";
import * as firebase from 'firebase';

class Feeds extends Component {
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
    };
  }

  async componentDidMount() {
    await this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const newArr = [];
    const { page } = await this.state;
    const url = await `https://itemlister-1406b.firebaseio.com/jobs.json/`;
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
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  deleteButton = async (item) => {
    const ref = await firebase.database().ref('jobs/' + item.key);
    await ref.set(null);
    this.makeRemoteRequest();
  };

  likeButton = async (item) => {
    const ref = await firebase.database().ref('jobs/' + item.key);
    currentLikes = await item.likes;
    await ref.update({ likes: item.likes + 1 });
    this.makeRemoteRequest();
  }

  newPost = () => {
    this.props.navigation.navigate('Post', { refresh: this.refreshChild });
    
  }

  refreshChild = () => {
    this.makeRemoteRequest();
  }


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          data={this.state.reversedData}
          renderItem={({ item }) => (
            <Card
            >
              <Text style={{ marginBottom: 10 }}>
                {`${item.title} ${item.description}`}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                <Button
                  title={`Like (${item.likes})`}
                  onPress={() => this.likeButton(item)}
                  buttonStyle={{
                    backgroundColor: "rgb(0,230,0)",
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 20
                  }}
                />
                <Button
                  title='Delete'
                  onPress={() => this.deleteButton(item)}
                  buttonStyle={{
                    backgroundColor: "rgb(128,128,128)",
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 20
                  }}
                />
              </View>
            </Card>
          )}
          keyExtractor={(item, key) => key.toString()}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />

        <Button
          title='Create a new Tweet'
          style={{ marginVertical: 20, borderRadius: 50 }}
          onPress={() => this.newPost()}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 20
          }}
        />
      </View>
    );
  }
}

export default Feeds;
