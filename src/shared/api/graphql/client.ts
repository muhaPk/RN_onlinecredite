import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onError } from '@apollo/client/link/error';
import { refreshAccessToken } from 'shared/lib/refreshAccessToken';
import { isTokenExpired } from 'shared/lib/isTokenExpired';

import { REACT_APP_GRAPHQL_URI } from 'shared/config/consts';

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


// Create the HTTP Link
const uploadLink = createUploadLink({
  uri: REACT_APP_GRAPHQL_URI,
  fetch,
});

const authLink = setContext(async (_, { headers }) => {

  // if isTokenExpired: refresh token
  let token = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (token && isTokenExpired(token)) {
    const response = await refreshAccessToken(refreshToken || '');
    if (!response) throw new Error('client: Failed to refresh tokens: response is null');
    console.log('client: refreshAccessToken')
    await AsyncStorage.setItem('accessToken', response.accessToken);
    token = response.accessToken;
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ networkError, graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations, null, 2)}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});


export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
});
