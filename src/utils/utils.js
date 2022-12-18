import { DUMMY_NEW_TAB } from "../data/tab_data";


export const numberOfUntitledTabs = (tabGroup) => {
    let untitledTab = tabGroup.findLast((tab) => tab.title.includes('Untitled'));
    if (untitledTab) {
        let GET_LAST_UNTITLED_NUMBER_REGEX = /[^-]*$/g;
        let untitleTabNumber = untitledTab.title.match(GET_LAST_UNTITLED_NUMBER_REGEX);
        return Number(untitleTabNumber[0]);
    }
    return 0;
}

export const addNewTab = (tabGroup, dispatch) => {
    let newTabNumber = numberOfUntitledTabs(tabGroup);
    let NEW_TAB = {
        ...DUMMY_NEW_TAB,
        title : `Untitled-${Number(newTabNumber) + 1}`
    }
    console.log('NEW TAB', NEW_TAB);
    dispatch({type: 'SET_ALL_TABS', payload: [...tabGroup, NEW_TAB]});
}

export const removeTab = (tabGroup, tabTitle, dispatch) => {
    let allTabsDuplicate = [...tabGroup]
    let removeTabIndex = allTabsDuplicate.findIndex((tab) => tab.title === tabTitle);
    if (removeTabIndex > -1) { 
        allTabsDuplicate.splice(removeTabIndex, 1)
        dispatch({type: 'SET_ALL_TABS', payload: [...allTabsDuplicate]});
    }
}