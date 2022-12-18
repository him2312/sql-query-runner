
export type State = {
    theme: 'light' | 'dark'
}

export type Action = {
    type: string,
    payload: any
}


export const initialState: State = {
    theme: 'dark'
};

export const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            }
        default: 
            return state;
    }
}