import { Navigation } from "./components/LeftPanel/Navigation/Navigation";
import { RightPanel } from "./components/RightPanel/RightPanel";
import styled from "styled-components";
import React from "react";
import { Action, initialState, reducer } from "./store/store";
import { GlobalFonts } from "./design/fonts";
import {TabType} from './store/store';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0px;
`;

type ThemeType = {
  theme: "light" | "dark";
  storeDispatch: React.Dispatch<Action>,
  tableData: {
    header: {};
    data: [];
  },
  tabData: TabType[]
};

export const ThemeContext = React.createContext<ThemeType>({
  theme: "dark",
  storeDispatch: () => {},
  tableData: {
    header: {},
    data: [],
  },
  tabData: []
});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        storeDispatch: dispatch,
        tableData: state.table,
        tabData: state.tabs
      }}
    >
      <AppContainer>
        <Navigation changeTheme={dispatch} />
        <RightPanel />
      </AppContainer>
      <GlobalFonts />
    </ThemeContext.Provider>
  );
}

export default App;
