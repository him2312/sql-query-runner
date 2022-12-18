import { Navigation } from "./components/LeftPanel/Navigation/Navigation";
import { RightPanel } from "./components/RightPanel/RightPanel";
import styled from "styled-components";
import React from "react";
import { Action, initialState, reducer } from "./store/store";
import { GlobalFonts } from "./design/fonts";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0px;
`;

type ThemeType = {
  theme: "light" | "dark";
  storeDispatch: React.Dispatch<Action>;
  tableData: {
    header: {};
    data: [];
  };
};

export const ThemeContext = React.createContext<ThemeType>({
  theme: "dark",
  storeDispatch: () => {},
  tableData: {
    header: {},
    data: [],
  },
});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        storeDispatch: dispatch,
        tableData: state.table,
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
