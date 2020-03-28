import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Paper, makeStyles } from '@material-ui/core';
import MUIDataTables from 'mui-datatables'; 

const QUERY = gql`
  query ($tablename: String!) {
    describe(tablename: $tablename) {
      info {
        id 
        name 
        title 
      }
      columns {
        no
        title
        prefix
        name
        type
        size
        iskey
        biko
      }
    }  
  }
`;

const TableDescription = ({
  tablename, 
}) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { tablename }, 
  });
  const { describe: { info, columns } } = data || { describe: {} };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper
        className={classes.paper}
      >
        {loading ? (
          <div>[{tablename.toUpperCase()}]テーブルの列定義を取得しています...</div>
        ) : (
          <Columns info={info} columns={columns} />
        )}
      </Paper>
    </React.Fragment>
  )
}

export default TableDescription;

const Columns = ({
  info, 
  columns, 
}) => {
  return (
    <MUIDataTables
      title={`${info.id} ${info.title}`}
      columns={[
        'no', 
        'title', 
        'prefix', 
        'name', 
        'type', 
        'size', 
        'iskey', 
        'biko', 
      ]}
      data={columns}
      options={{
        responsive: 'scroll', 
        filterType: 'multiselect', 
        selectableRows: 'single', 
        selectableRowsOnClick: true, 
      }}
    />
  );
};

// classes:
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3), 
  }, 
}));