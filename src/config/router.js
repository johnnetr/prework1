import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import fire from './fire';

import Feeds from '../screens/Feeds';
import Me from '../screens/Me';
import Login from '../component/Login';
import Post from '../screens/Post';


export const JobStack = createStackNavigator({
  Feeds: {
    screen: Feeds,
    navigationOptions: {
      title: 'All Tweets'
    }
  },
  Post: {
    screen: Post,
    navigationOptions: {
      header: null,
    }
  },
})



export const UserProfile = createStackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name='account-circle' size={35} color={tintColor} />,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  }
});


export const Tabs = createBottomTabNavigator({

  Feed: {
    screen: JobStack,
    navigationOptions: {
      tabBarLabel: 'Tweets',
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

