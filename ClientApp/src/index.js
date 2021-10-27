import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {store} from "./Actions/store";
import {Container} from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications"
import DonationCandidates from "./components/DonationCandidates";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ToastProvider autoDismiss={true}>
            <Container maxWidth="lg">
                <DonationCandidates/>
            </Container>
        </ToastProvider>
    </Provider>,
  rootElement);

registerServiceWorker();

