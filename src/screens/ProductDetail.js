import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Card, Button } from 'react-native-elements'

class ProductDetail extends Component {


  buyButton = (data) => {
    this.props.navigation.navigate('CheckoutScreen', {
      data: data,
    })
  }

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'NO-data');
    console.log('productdetail',data);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card
          featuredTitle={data.storeName}
          image={{ uri: data.image }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <Text>
              By
              {` ${data.storeName}`}
            </Text>
            <Text>
              By
              {` ${data.description}`}
            </Text>
            <Text>
              :
              {`${data.price}$`}
            </Text>
          </View>
        </Card>
        <Button
          title='click'
          onPress={() => this.buyButton(data)}
          buttonStyle={{
            backgroundColor: "rgb(128,128,128)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 20
          }}
        />
      </View>
    )
  }
}

export default ProductDetail;