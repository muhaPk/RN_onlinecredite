import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onError } from '@apollo/client/link/error';
import { refreshAccessToken } from 'shared/lib/refreshAccessToken';
import { isTokenExpired } from 'shared/lib/isTokenExpired';

import { REACT_APP_GRAPHQL_URI } from 'shared/config/consts';

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useNavigate } from 'shared/hooks/useNavigate';



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

    if (!response) {
      
      console.error('Failed to refresh access token, logging out...');
      
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      throw new Error('Invalid or expired refresh token');
    }

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

const errorLink = onError(({ networkError, graphQLErrors}) => {

  // const { navigateToPage } = useNavigate(); // Custom navigation hook

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations, null, 2)}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // Handle token expiry or invalid token case
      console.error('Unauthorized access detected. Logging out...');
      // Clear tokens and redirect to login page
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');

      // navigateToPage("Login");
    }
  }
});


export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
});
