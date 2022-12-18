import Split from "react-split";
import styled, {css} from "styled-components";
import { Query } from "./Query/Query";
import { Table } from "./Table/Table";
import { COLORS } from "../../design/theme";
import React from "react";
import { StoreContext } from "../../App";

type QueryThemePropsType = {
    currentTheme: "light" | "dark";
};

const ExecutorContainer = styled.div<QueryThemePropsType>`
  flex: 4;
  ${({ currentTheme }) =>
  css`
    background: ${COLORS[currentTheme].background.layer1};
  `}
`;

const Executor = styled.div<QueryThemePropsType>`
  .gutter {
    ${({ currentTheme }) =>
    css`
      background: ${COLORS[currentTheme].background.layer3};
    `}
    background-repeat: no-repeat;
    background-position: 50%;
    cursor: row-resize;
  }

  .gutter.gutter-vertical {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
  }

  .gutter.gutter-horizontal {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
  }
`;

export const RightPanel = () => {
    const { theme } = React.useContext(StoreContext);

  return (
    <ExecutorContainer currentTheme={theme}>
      <Executor currentTheme={theme}>
        {/* TODO: Revisit the 100px height here */}
        <Split direction="vertical" sizes={[40,60]} minSize={200} style={{ height: '100vh' }}>
          <Query />
          <Table />
        </Split>
      </Executor>
    </ExecutorContainer>
  );
};
