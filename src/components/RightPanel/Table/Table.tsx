import React, { useState } from "react";
import styled, { css } from "styled-components";
import { StoreContext } from "../../../App";
import { DATABASE_TYPE, getNextPageData } from "../../../data/key_data_mapping";
import { COLORS } from "../../../design/theme";
import { ts12m, ts14m } from "../../../design/fonts/typography";
import { computeScrollPercentage, debounce, FETCH_NEXT_PAGE_POST_AT_SCROLL } from "../../../utils/utils";

type QueryThemePropsType = {
  currentTheme: "light" | "dark";
};

const TableContainer = styled.div<QueryThemePropsType>`
  ${({ currentTheme }) =>
    css`
      background: ${COLORS[currentTheme].background.layer1};
    `}
  padding: 10px 15px;
  border-radius: 8px;
  box-sizing: border-box;
`;

const TableDataContainer = styled.div<QueryThemePropsType>`
  ${({ currentTheme }) =>
    css`
      background: ${COLORS[currentTheme].background.layer2};
    `}
  padding: 10px 15px;
  border-radius: 6px;
  overflow-y: scroll;
  height: calc(100% - 20px);
`;

const TableHead = styled.div`
  display: flex;
  border-radius: 6px;
`;

const TableHeadRow = styled.div<QueryThemePropsType>`
  padding: 12px 6px;
  flex: 1;
  min-width: 100px;
  ${ts14m}
  ${({ currentTheme }) =>
  css`
    background: ${COLORS[currentTheme].background.layer4};
    color: ${COLORS[currentTheme].text.primary};
    border-bottom: 1px solid ${COLORS[currentTheme].border};

    :not(:first-child) {
        border-left: 1px solid ${COLORS[currentTheme].border};;
    }
  `}
`;

const TableData = styled.div`
  overflow-y: scroll;
  height: calc(100% - 20px);
`;

const TableRow = styled.div`
  display: flex;
`;

const TableRowData = styled.div<QueryThemePropsType>`
    flex: 1;
    min-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 12px 6px;
    ${ts12m}
    ${({ currentTheme }) =>
    css`
    background: ${COLORS[currentTheme].background.layer3};
    color: ${COLORS[currentTheme].text.primary};
    border-bottom: 1px solid ${COLORS[currentTheme].border};

        :not(:first-child) {
            border-left: 1px solid ${COLORS[currentTheme].border};;
        }
    `}
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 10px 5px;
`

export const Table = () => {
  const { theme, tableData, currentTable, storeDispatch } = React.useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { header = [], data = [] } = tableData;

  const fetchMoreRows = debounce((element: EventTarget) => {
    let scrollPercentage = computeScrollPercentage(element);

    if (scrollPercentage >= FETCH_NEXT_PAGE_POST_AT_SCROLL) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1); 
      let nextPageData = getNextPageData(currentTable ,currentPage + 1);

      if (nextPageData.length) {
        storeDispatch({
          type: 'SET_TABLE_DATA',
          payload: {
            ...tableData,
            data: [
              ...tableData.data,
              ...nextPageData
            ]
          }
        })
      } else {
        setIsLoading(false);
      }

    }
  }, 100)

  return (
    <TableContainer currentTheme={theme}>
      <TableDataContainer currentTheme={theme}>
        <TableHead>
          {(Object.keys(header) as Array<string>).map((title: string) => (
            <TableHeadRow key={title} currentTheme={theme}>{title}</TableHeadRow>
          ))}
        </TableHead>
        <TableData onScroll={(event) => fetchMoreRows(event.target)}>
          {data.map((value: DATABASE_TYPE, index) => (
            <TableRow key={index}>
              {(Object.values(value) as Array<string>).map((data) => (
                <TableRowData currentTheme={theme}>{String(data)}</TableRowData>
              ))}
            </TableRow>
          ))}
           {
          isLoading && <Loading>Loading...</Loading>
        }
        </TableData>
      </TableDataContainer>
    </TableContainer>
  );
};
