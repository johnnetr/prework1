import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import fire from './fire';

import MyShop from '../screens/MyShop';
import Profile from '../screens/Profile';
import Login from '../component/Login';
import Loading from '../component/Loading';
import Post from '../screens/Post';
import Main from '../screens/Main';
import ProductDetail from '../screens/ProductDetail';
import Checkout from '../screens/Checkout';
import Order from '../screens/Order';
import Setting from '../screens/Setting';

const DetailCheckout = createStackNavigator({
  ProductDetailScreen: {
    screen: ProductDetail,
    navigationOptions: {
      header: null,
      },
  },
  CheckoutScreen: {
    screen: Checkout,
    navigationOptions: {
      header: null,
      },
  }
})

const MainScreenStack = createStackNavigator({
  MainScreen: {
    screen: Main,
  },
  ProductDetailScreen: {
    screen: DetailCheckout,
    navigationOptions: {
      header: null,
      },
  }
})


const MyShopStack = createStackNavigator({
  MyShop: {
    screen: MyShop,
  },
  Post: {
    screen: Post,
    navigationOptions: {
      header: null,
    }
  },
  ProductDetailScreen: {
    screen: ProductDetail,
  }
})



const UserProfile = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name='account-circle' size={35} color={tintColor} />,
    }
  },
  SettingScreen: {
    screen: Setting,
  },
  OrderScreen: {
    screen: Order,
  }
});


const Tabs = createBottomTabNavigator({

  MainScreen: {
    screen: MainScreenStack
  },

  MyShop: {
    screen: MyShopStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name='list' size={35} color={tintColor} />,
    }
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name='account-circle' size={35} color={tintColor} />,
      tabBarVisible: this.hideTabBar,
    }
  },
})

export const AuthFlow = createSwitchNavigator(
  {
    Login: Login,
    Loading: Loading,
    Tabs: Tabs,
  },
  {
    initialRouteName: 'Loading',
  }
)

