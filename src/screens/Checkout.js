import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Checkout extends Component {
  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'NO-data');
    console.log('checkout component', data);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{data.storeName}</Text>
      </View>
    )
  }
}