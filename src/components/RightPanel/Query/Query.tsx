import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { StoreContext } from "../../../App";
import { ts12m } from "../../../design/fonts/typography";
import { Button } from "../../../design/system/Button/Button";
import { COLORS } from "../../../design/theme";
import { QueryType } from "../../../store/store";
import { getFilteredDataFromTable, queryExecutor, returnQueryMapping, SQL_QUERY_VALIDATOR } from "../../../utils/query-execute";
import { debounce } from "../../../utils/utils";
import { Tab } from "../Tab/Tab";
import RunQueryIcon from "./images/run-query.svg";

type QueryThemePropsType = {
  currentTheme: "light" | "dark"
};

const TabQueryContainer = styled.div`
  padding-top: 10px;
  box-sizing: border-box;
`

const QueryContainer = styled.div<QueryThemePropsType>`
  padding: 15px;
  margin: 0px 10px 15px 10px;
  box-sizing: border-box;
  border-radius: 0px 0px 8px 8px;
  position: relative;
  height: calc(100% - 53px);
  ${({ currentTheme }) =>
    css`
      background: ${COLORS[currentTheme].background.layer2};
    `}
`;

const QueryBox = styled.div<QueryThemePropsType>`
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 6px;
  ${({ currentTheme }) =>
    css`
      background: ${COLORS[currentTheme].background.layer3};
    `}

    // TODO: Create a new component for textarea and SQL query executor
   textarea { 
    background: transparent;
    resize: none;
    border: none;
    outline: none;
    height: 100%;
    width: 100%;
    ${ts12m}

    ${({ currentTheme }) =>
    css`
      color: ${COLORS[currentTheme].text.primary};

      &:placeholder {
        color:  ${COLORS[currentTheme].text.secondary};
      }
    `}
   }
`;

const RunQuery = styled.div`
    display: flex;
    position: absolute;
    right: 25px;
    bottom: 26px;
    width: max-content;
`;

export const Query = () => {
  const { theme, selectedTab, query, storeDispatch } = React.useContext(StoreContext);

  const [sqlQuery, setSqlQuery] = useState('');

  useEffect(() => {
    if(query) {
      let queryData = returnQueryMapping(selectedTab, query);
      setSqlQuery(queryData?.sqlQuery);

      storeDispatch({type: 'SET_TABLE_DATA', payload: queryData.tableData})
    }
  }, [query, selectedTab, storeDispatch])

  const executeQuery = () => {
    const result = queryExecutor(sqlQuery);
    const filteredTableData = getFilteredDataFromTable(result?.tableName, result?.fields)
    storeDispatch({
      type: 'SET_TABLE_DATA',
      payload: filteredTableData
    })
    saveQueryForTab(sqlQuery, filteredTableData);
  }

  const formatAndSetSqlQuery = (value: string) => {
    setSqlQuery(value);
    saveQueryForTab(value);
  }

  const saveQueryForTab = debounce((sqlQuery: string, tableData: []) => {
    let savedQuery: QueryType = {
      sqlQuery,
      tableData
    }

    let actionPayload: any = {};
    actionPayload[selectedTab] = savedQuery;

    storeDispatch({type: 'SET_QUERY', payload: actionPayload})    
  }, 500)

  return (
    <TabQueryContainer>
      <Tab/>
      <QueryContainer currentTheme={theme}>
        <QueryBox currentTheme={theme}>
          <textarea value={sqlQuery} placeholder="enter SQL query here" onChange={(e) => formatAndSetSqlQuery(e.target.value)}/>
        </QueryBox>
        <RunQuery>
          <Button disabled={!SQL_QUERY_VALIDATOR.test(sqlQuery)} handleClick={() => executeQuery()} buttonType="secondary">
              <img src={RunQueryIcon} alt="run query" style={{marginRight: '5px'}}/>
              Run query
          </Button>
        </RunQuery>
      </QueryContainer>
    </TabQueryContainer>
  );
};
