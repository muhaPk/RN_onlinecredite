/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://10.0.2.2:4200/graphql',
    cache: new InMemoryCache(),
});

const AppWithProvider = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
  
AppRegistry.registerComponent(appName, () => AppWithProvider);
