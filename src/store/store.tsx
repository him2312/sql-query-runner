
export type State = {
    theme: 'light' | 'dark',
    table: {}
}

export type DISPATCH_TYPE = 'CHANGE_THEME' | 'SET_TABLE_DATA'

export type Action = {
    type: DISPATCH_TYPE,
    payload: any
}


export const initialState: State = {
    theme: 'dark',
    table: {}
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
        default: 
            return state;
    }
}