import React from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../../../App";
import { Button } from "../../../design/system/Button/Button";
import { COLORS } from "../../../design/theme";
import { Tab } from "../Tab/Tab";
import RunQueryIcon from "./images/run-query.svg";

type QueryThemePropsType = {
  currentTheme: "light" | "dark";
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
  const { theme } = React.useContext(ThemeContext);

  const executeQuery = () => {
    console.log('Fetch database');
  }

  return (
    <TabQueryContainer>
      <Tab/>
      <QueryContainer currentTheme={theme}>
        <QueryBox currentTheme={theme}>
          {/* <textarea rows={10} cols={100} defaultValue="enter SQL query here"/> */}
        </QueryBox>
        <RunQuery>
          <Button handleClick={() => executeQuery()} buttonType="secondary">
              <img src={RunQueryIcon} alt="run query" style={{marginRight: '5px'}}/>
              Run query
          </Button>
        </RunQuery>
      </QueryContainer>
    </TabQueryContainer>
  );
};
