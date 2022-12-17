import React from "react"
import styled from "styled-components"
import { ThemeContext } from "../../../App"
import { Action } from "../../../store/store"


const NavigationContainer = styled.div`
    flex: 1;
`

type NavigationProps = {
    changeTheme: React.Dispatch<Action>
}

export const Navigation = (props: NavigationProps) => {
    const currentTheme = React.useContext(ThemeContext);

    return (
        <NavigationContainer onClick={() => props.changeTheme({
            type: 'CHANGE_THEME',
            payload: currentTheme.theme === 'dark' ? 'light' : 'dark'
        })}>
            Navigation
        </NavigationContainer>
    )
}