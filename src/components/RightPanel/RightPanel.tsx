import React from "react"
import styled from "styled-components"
import { ThemeContext } from "../../App"
import { Query } from "./Query/Query"
import { Tab } from "./Tab/Tab"
import { Table } from "./Table/Table"

const ExecutorContainer = styled.div`
    flex: 4;
`

export const RightPanel = () => {
    const currentTheme = React.useContext(ThemeContext);

    return (
        <ExecutorContainer>
            <Tab/>
            <Query/>
            <Table/>
            <div>
                {currentTheme.theme}
            </div>
        </ExecutorContainer>
    )
}