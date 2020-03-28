import React from 'react';
import { useQuery } from '@apollo/react-hooks'; 
import gql from 'graphql-tag';
import MUIDataTable from 'mui-datatables'; 

const DenpyoList = ({
  ymd = "2020-02-10", 
}) => {
  const tran = useTranSummaryQuery(ymd);
  const check = query => !query.loading && !query.error;
  const ready = check(tran);
  return (
    <div>
      {tran.loading && (
        <div>処理日: {ymd} - 伝票番号リストを取得しています...</div>
      )}
      {tran.error && (
        <div><pre>{JSON.stringify(tran.error, null, 2)}</pre></div>
      )}
      {ready && (
        <DennoList ymd={ymd} data={tran.data} />
      )}
      
    </div>
  )
}

export default DenpyoList;

const DennoList = ({
  ymd, 
  data, 
}) => {
  return (
    <MUIDataTable
      title={`処理日：${ymd} - 伝票番号リスト`}
      columns={[
        { name: "AITCD", label: "相手先CD", }, 
        { name: "DENNO", label: "伝票NO", }, 
        { name: "KENSU", label: "件数", }, 
        { name: "KINGK", label: "金額", }, 
      ]}
      data={data}
      options={{
        responsive: 'scrollFullHeight', 
        filterType: 'multiselect', 
        selectableRowsOnClick: true, 
      }}
    />
  );
};

const useTranSummaryQuery = (ymd) => {
  const { loading, error, data } = useQuery(TRAN_SUMMARY_QUERY, {
    variables: { ymd }, 
  });
  return { loading, error, data: data ? data.tranSummary : [] };
};

const TRAN_SUMMARY_QUERY = gql`
  query(
    $ymd: String!
  ) {
    tranSummary(
      tablename: "urikaktrn"
      buscd: "0281"
      ymd: $ymd 
    ) {
      AITCD 
      DENNO 
      KENSU 
      KINGK
    }
  }
`;