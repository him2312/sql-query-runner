import { Navigation } from "./components/LeftPanel/Navigation/Navigation";
import { RightPanel } from "./components/RightPanel/RightPanel";
import styled from "styled-components";
import React from "react";
import { Action, initialState, reducer } from "./store/store";
import { GlobalFonts } from "./design/fonts";
import {TabType} from './store/store';
import { TableName } from "./data/key_data_mapping";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0px;
`;

type StoreType = {
  theme: "light" | "dark";
  storeDispatch: React.Dispatch<Action>,
  tableData: {
    header: {};
    data: [];
  },
  selectedTab: string,
  tabData: TabType[],
  query: {},
  bookmarkedQuery: {},
  currentTable: TableName
};

export const StoreContext = React.createContext<StoreType>({
  theme: "dark",
  storeDispatch: () => {},
  tableData: {
    header: {},
    data: [],
  },
  selectedTab: '',
  tabData: [],
  query: {},
  bookmarkedQuery: [],
  currentTable: 'users'
});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StoreContext.Provider
      value={{
        theme: state.theme,
        storeDispatch: dispatch,
        tableData: state.table,
        tabData: state.tabs,
        selectedTab: state.selectedTab,
        query: state.query,
        bookmarkedQuery: state.bookmarkedQuery,
        currentTable: state.currentTable
      }}
    >
      <AppContainer>
        <Navigation changeTheme={dispatch} />
        <RightPanel />
      </AppContainer>
      <GlobalFonts />
    </StoreContext.Provider>
  );
}

export default App;
