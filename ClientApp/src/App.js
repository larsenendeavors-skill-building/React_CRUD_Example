import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { store } from "./Actions/store"
import { Provider } from "react-redux";
import './custom.css'
import DonationCandidates from "./components/DonationCandidates";
import DonationCandidateForm from "./components/DonationCandidateForm";
import {Container} from "@material-ui/core";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <>
          <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
          </Layout>
        </>
    );
  }
}
