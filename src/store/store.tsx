import { DATABASE_TYPE } from "../data/key_data_mapping"

export type State = {
    theme: 'light' | 'dark',
    table: {},
    tabs: TabType[],
    selectedTab: '',
    query: {},
    bookmarkedQuery: {}
}

export type TabType = {
    title: string,
    id: string
}

export type QueryType = {
    sqlQuery: string,
    tableData: DATABASE_TYPE[]
}

export type DISPATCH_TYPE = 'CHANGE_THEME' | 'SET_TABLE_DATA' | 'SET_ALL_TABS' | 'SET_QUERY' | 'SET_SELECTED_TAB' | 'SET_BOOKMARKED_QUERY'

export type Action = {
    type: DISPATCH_TYPE,
    payload: any
}

export const initialState: State = {
    theme: 'dark',
    table: {},
    selectedTab: '',
    tabs: [],
    query: {},
    bookmarkedQuery: {}
};

export const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_TABLE_DATA':
            return {
                ...state,
                table: {
                    ...action.payload
                }
            }
        case 'SET_ALL_TABS': {
            return {
                ...state,
                tabs: [...action.payload]
            }
        }
        case 'SET_SELECTED_TAB': {
            return {
                ...state,
                selectedTab: action.payload
            }
        }
        case 'SET_QUERY': {
            return {
                ...state,
                query: {
                    ...state.query,
                    ...action.payload
                }
            }
        }
        case 'SET_BOOKMARKED_QUERY': {
            return {
                ...state,
                bookmarkedQuery: {
                    ...action.payload
                }
            }
        }
        default: 
            return state;
    }
}