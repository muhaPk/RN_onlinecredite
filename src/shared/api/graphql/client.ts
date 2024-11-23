import { ApolloClient, InMemoryCache, createHttpLink, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onError } from '@apollo/client/link/error';

// Create the HTTP Link
const httpLink = createHttpLink({
  uri: 'http://10.0.2.2:4200/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions?.code === 'UNAUTHENTICATED') {
          return new Observable(observer => {
            (async () => {
              try {
                // Get refresh token
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (!refreshToken) {
                  throw new Error('Refresh token is missing');
                }
  
                // Request a new access token
                const response = await fetch('http://10.0.2.2:4200/auth/refresh', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ refreshToken }),
                });
  
                if (!response.ok) {
                  throw new Error('Failed to refresh token');
                }
  
                const { accessToken, refreshToken: newRefreshToken } = await response.json();
  
                // Store new tokens
                await AsyncStorage.setItem('accessToken', accessToken);
                await AsyncStorage.setItem('refreshToken', newRefreshToken);
  
                // Update the failed operation with the new access token
                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${accessToken}`,
                  },
                }));
  
                // Retry the request
                forward(operation).subscribe({
                  next: result => observer.next(result),
                  error: err => observer.error(err),
                  complete: () => observer.complete(),
                });
              } catch (error) {
                console.error('Token refresh failed:', error);
                observer.error(error); // Pass the error to the observer
              }
            })();
          });
        }
      }
    }
  });

// Apollo Client Instance
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
