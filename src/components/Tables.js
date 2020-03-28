import React from 'react';
import { useQuery, ApolloProvider } from '@apollo/react-hooks'; 
import gql from 'graphql-tag';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import MUIDataTable from 'mui-datatables';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import TableDescription from './TableDescription';

// Apollo Client
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://daiei-apollo.aki323buri2.now.sh/', 
})
const client = new ApolloClient({
  cache, 
  link, 
})
// query
const QUERY = gql`
  query {
    tableList {
      id 
      name 
      title 
    }
  }
`;

const Tables = ({}) => {
  const match = useRouteMatch();
  return (
    <ApolloProvider client={client}>
      <Route 
        exact 
        path={`${match.url}/`} 
        component={TablesList}
      />
      <Route 
        path={`${match.url}/:tablename`} 
        render={({ match }) => (
          <TableDescription tablename={match.params.tablename}/>
        )}
      />
    </ApolloProvider>
  );
};

// TableList
const columns = [
  {
    name: 'id', 
    label: 'ID', 
  }, 
  {
    name: 'name', 
    label: 'テーブル名', 
  }, 
  {
    name: 'title', 
    label: '表示名', 
  }, 
];
const TablesList = ({
}) => {
  const { loading, error, data } = useQuery(QUERY);
  const history = useHistory();
  const match = useRouteMatch();

  // 行セレクト
  const onRowsSelect = (currentRowsSelected) => {
    const selected = data.tableList[currentRowsSelected[0].dataIndex];
    history.push(`${match.url}/${selected.name}`);
  };
  
  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <MUIDataTable 
        title="テーブル定義一覧"
        columns={columns}
        data={data ? data.tableList : []}
        options={{
          responsive: 'scrollFullHeight', 
          filterType: 'multiselect', 
          selectableRows: 'single', 
          selectableRowsOnClick: true, 
          onRowsSelect, 
        }}
        
      />
    </div>
  )
}



export default Tables;