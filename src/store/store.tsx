
export type State = {
    theme: 'light' | 'dark',
    table: {},
    tabs: TabType[]
    query: {}
}

export type TabType = {
    title: string,
    id: string
}

export type DISPATCH_TYPE = 'CHANGE_THEME' | 'SET_TABLE_DATA' | 'SET_ALL_TABS'

export type Action = {
    type: DISPATCH_TYPE,
    payload: any
}

export const initialState: State = {
    theme: 'dark',
    table: {},
    tabs: [],
    query: {}
};

export const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_TABLE_DATA':
            console.log('payload', action.payload)
            return {
                ...state,
                table: {
                    ...action.payload
                }
            }
        case 'SET_ALL_TABS': {
            console.log('Store', action);
            return {
                ...state,
                tabs: [...action.payload]
            }
        }
        default: 
            return state;
    }
}