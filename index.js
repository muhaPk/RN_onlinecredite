/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ApolloProvider } from '@apollo/client';
import { client } from 'shared/api/graphql/client';



const AppWithProvider = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
  
AppRegistry.registerComponent(appName, () => AppWithProvider);
