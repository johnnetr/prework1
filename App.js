import React, {Component} from 'react';
import { AuthFlow } from './src/config/router';
import ProductDetail from './src/screens/ProductDetail';

export default class App extends Component {
  render() {
    return (
      <AuthFlow />
    );
  };
};