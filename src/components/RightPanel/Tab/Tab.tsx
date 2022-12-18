import { useContext, useEffect } from "react";
import styled, { css } from 'styled-components';
import CrossIcon from '../../../shared/images/cross.svg';
import PlusIcon from '../../../shared/images/plus.svg';
import { COLORS } from "../../../design/theme";
import { StoreContext } from "../../../App";
import { ts12m } from "../../../design/fonts/typography";
import { DUMMY_TAB_DATA } from "../../../data/tab_data";
import { addNewTab, removeTab } from "../../../utils/utils";

type QueryThemePropsType = {
    currentTheme: "light" | "dark",
    isSelected?: boolean
};

const TabHead = styled.div<QueryThemePropsType>`
    display: flex;
    align-items: center;
    border-radius: 8px 8px 0px 0px;
    padding: 0px 10px;
    cursor: pointer;

    ${ts12m}
    ${({ isSelected, currentTheme }) =>
    css`
      background: ${isSelected ? COLORS[currentTheme].background.layer2 : COLORS[currentTheme].background.layer3};
      color: ${COLORS[currentTheme].text.primary};
    `}
    
    img {
        transform: rotate(45deg);
        margin-left: 40px;
    }
`

const TabGroup = styled.div`
    display: flex;
    margin-left: 10px;
`

const UserTabGroup = styled.div`
    display: flex;
    overflow-x: scroll;
    max-width: 75vw;
`

const AddNewTab = styled.div`
    border-radius: 6px 6px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2196F3;
    padding: 9px 12px;
    cursor: pointer;

    :active {
        opacity: 0.7;
        transform: scale(0.97);
    }
`

export const Tab = () => {
  const {theme, tabData, storeDispatch, selectedTab} = useContext(StoreContext);

  useEffect(() => {
    storeDispatch({type: 'SET_ALL_TABS', payload: DUMMY_TAB_DATA});
    storeDispatch({type: 'SET_SELECTED_TAB', payload: DUMMY_TAB_DATA[0].title});
  }, [storeDispatch])

  const addNewTabGroup = () => {
    addNewTab([...tabData], storeDispatch);
  }

  const openTab = (tabTitle: string) => {
    storeDispatch({type: 'SET_SELECTED_TAB', payload: tabTitle});
  }

  const closeTab = (tabTitle: string) => {
    removeTab([...tabData], tabTitle, storeDispatch);
  }

  return (
    <TabGroup>
       <UserTabGroup>
        {tabData?.map((tabData) => (
            <TabHead key={tabData.title} currentTheme={theme} onClick={() => openTab(tabData.title)} isSelected={selectedTab === tabData.title}>
                {tabData.title}
                <img src={CrossIcon} alt="cross" onClick={() => closeTab(tabData.title)}/>
            </TabHead>
        ))}
       </UserTabGroup>
       <AddNewTab onClick={addNewTabGroup}>
            <img src={PlusIcon} alt="add new tab" />
       </AddNewTab>
    </TabGroup>
  );
};
