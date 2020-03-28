import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { Route, useRouteMatch } from 'react-router-dom';
import DenpyoList from './DenpyoList';

const link = new HttpLink({
  uri: 'https://daiei-apollo.aki323buri2.now.sh/', 
});
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const Sales = () => {
  const match = useRouteMatch();

  return (
    <ApolloProvider client={client}>
      <Route path={`${match.url}`} component={DenpyoList} />
    </ApolloProvider>
  )
}

export default Sales
