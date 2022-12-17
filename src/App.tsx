import { Navigation } from './components/LeftPanel/Navigation/Navigation';
import { RightPanel } from './components/RightPanel/RightPanel';
import styled from 'styled-components';
import React from 'react';
import { initialState, reducer } from './store/store';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
`

export const ThemeContext = React.createContext({theme: 'dark'});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <ThemeContext.Provider value={{theme: state.theme}}>
      <AppContainer>
        <Navigation changeTheme={dispatch}/>
        <RightPanel/>
      </AppContainer>
    </ThemeContext.Provider>
  );
}

export default App;
