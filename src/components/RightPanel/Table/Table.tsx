import React from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../../../App";
import { DATABASE_TYPE } from "../../../data/key_data_mapping";
import { COLORS } from "../../../design/theme";
import { ts12m, ts14m } from "../../../design/fonts/typography";

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
`;

const TableDataContainer = styled.div<QueryThemePropsType>`
  ${({ currentTheme }) =>
    css`
      background: ${COLORS[currentTheme].background.layer2};
    `}
  padding: 10px 15px;
  border-radius: 6px;
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
  height: 40vh;
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

export const Table = () => {
  const { theme, tableData } = React.useContext(ThemeContext);

  const { header = [], data = [] } = tableData;

  return (
    <TableContainer currentTheme={theme}>
      <TableDataContainer currentTheme={theme}>
        <TableHead>
          {(Object.keys(header) as Array<string>).map((title: string) => (
            <TableHeadRow currentTheme={theme}>{title}</TableHeadRow>
          ))}
        </TableHead>
        <TableData>
          {data.map((value: DATABASE_TYPE, index) => (
            <TableRow key={index}>
              {(Object.values(value) as Array<string>).map((data) => (
                <TableRowData currentTheme={theme}>{String(data)}</TableRowData>
              ))}
            </TableRow>
          ))}
        </TableData>
      </TableDataContainer>
    </TableContainer>
  );
};
