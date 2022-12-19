import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { StoreContext } from "../../../App";
import { ts12m } from "../../../design/fonts/typography";
import { Button } from "../../../design/system/Button/Button";
import { COLORS } from "../../../design/theme";
import { QueryType } from "../../../store/store";
import {
  getFilteredDataFromTable,
  queryExecutor,
  returnQueryMapping,
  SQL_QUERY_VALIDATOR,
} from "../../../utils/query-execute";
import { getSQLQueryCheat } from "../../../utils/shortcut";
import { debounce, stringExistsInArray } from "../../../utils/utils";
import { Tab } from "../Tab/Tab";
import RunQueryIcon from "./images/run-query.svg";
import BookmarkedIcon from "../../../shared/images/bookmarked.png";
import EmptyDarkBookmarkIcon from "../../../shared/images/empty-dark-bookmark.png";
import EmptyLightBookmarkIcon from "../../../shared/images/empty-light-bookmark.png";
import HotKeys from "react-hot-keys";

type QueryThemePropsType = {
  currentTheme: "light" | "dark";
};

const TabQueryContainer = styled.div`
  padding-top: 10px;
  box-sizing: border-box;
`;

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
          color: ${COLORS[currentTheme].text.secondary};
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

const Bookmark = styled.div`
  position: absolute;
  top: -5px;
  right: 25px;
  cursor: pointer;
  img {
    height: 30px;
    width: 30px;
  }
`;

export const Query = () => {
  const { theme, selectedTab, query, storeDispatch, bookmarkedQuery } =
    React.useContext(StoreContext);

  const [sqlQuery, setSqlQuery] = useState("");

  useEffect(() => {
    if (query) {
      let queryData = returnQueryMapping(selectedTab, query);
      setSqlQuery(queryData?.sqlQuery);

      storeDispatch({ type: "SET_TABLE_DATA", payload: queryData.tableData });
    }
  }, [query, selectedTab, storeDispatch]);

  const executeQuery = () => {
    const result = queryExecutor(sqlQuery);
    const filteredTableData = getFilteredDataFromTable(
      result?.tableName,
      result?.fields
    );
    storeDispatch({
      type: "SET_TABLE_DATA",
      payload: filteredTableData,
    });
    storeDispatch({
      type: "SET_CURRENT_TABLE",
      payload: result?.tableName,
    });
    saveQueryForTab(sqlQuery, filteredTableData);
  };

  const formatAndSetSqlQuery = (value: string) => {
    setSqlQuery(value);
    saveQueryForTab(value);
  };

  const saveQueryForTab = debounce((sqlQuery: string, tableData: []) => {
    let savedQuery: QueryType = {
      sqlQuery,
      tableData,
    };

    let actionPayload: any = {};
    actionPayload[selectedTab] = savedQuery;

    storeDispatch({ type: "SET_QUERY", payload: actionPayload });
  }, 500);

  const fillCannedResponse = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Tab") {
      event.preventDefault();
      let shortcutKeyword = (event.target as HTMLInputElement).value;
      formatAndSetSqlQuery(getSQLQueryCheat(shortcutKeyword));
    }
  };

  const saveQueryToBookmark = () => {
    if (SQL_QUERY_VALIDATOR.test(sqlQuery)) {
      storeDispatch({
        type: "SET_BOOKMARKED_QUERY",
        payload: {
          ...bookmarkedQuery,
          [sqlQuery]: true,
        },
      });
    } else {
      console.log("Nothing to bookmark");
    }
  };

  const onKeyDown = (keyName: string) => {
    switch (keyName) {
      case 'shift+r':
        executeQuery();
        break;
      case 'shift+b':
        saveQueryToBookmark();
        break;
      default:
        console.log('No shortcut');
        break;
    }
  };

  const isBookmarked = stringExistsInArray(
    sqlQuery,
    Object.keys(bookmarkedQuery)
  );
  return (
    <TabQueryContainer>
      <HotKeys keyName="shift+r, shift+b" onKeyDown={onKeyDown}>
        <Tab />
        <QueryContainer currentTheme={theme} data-testid="query-box">
          <Bookmark data-testid="bookmark-cta" onClick={saveQueryToBookmark}>
            {isBookmarked ? (
              <>
                <img src={BookmarkedIcon} data-testid="bookmarked" alt="bookmarked" />
              </>
            ) : (
              <>
                {
                  <img
                    data-testid="not-bookmarked"
                    src={
                      theme === "light"
                        ? EmptyDarkBookmarkIcon
                        : EmptyLightBookmarkIcon
                    }
                    alt="bookmarked"
                  />
                }
              </>
            )}
          </Bookmark>
          <QueryBox currentTheme={theme}>
            <textarea
              data-testid="query-input"
              value={sqlQuery}
              placeholder="enter SQL query here"
              onKeyDown={(e) => fillCannedResponse(e)}
              onChange={(e) => formatAndSetSqlQuery(e.target.value)}
            />
          </QueryBox>
          <RunQuery>
            <Button
              data-testid="query-runner"
              disabled={!SQL_QUERY_VALIDATOR.test(sqlQuery)}
              handleClick={() => executeQuery()}
              buttonType="secondary"
            >
              <img
                src={RunQueryIcon}
                alt="run query"
                style={{ marginRight: "5px" }}
              />
              Run query
            </Button>
          </RunQuery>
        </QueryContainer>
      </HotKeys>
    </TabQueryContainer>
  );
};
