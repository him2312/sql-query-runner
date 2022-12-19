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

export const stringExistsInArray = (string, array) => {
    if (string === '' || array.length === 0) {
        return false;
    }
    return array.includes(string);
}

let timer;
export const debounce = (func, timeout = 1000) => {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export const FETCH_NEXT_PAGE_POST_AT_SCROLL = 90;

export const computeScrollPercentage = (element) => {
    if (element === null) {
        return NaN;
      }
      const height = element.scrollHeight - element.clientHeight;
      return Math.round((element.scrollTop / height) * 100);
}