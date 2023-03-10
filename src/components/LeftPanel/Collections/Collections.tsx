import React, { useState } from "react";
import styled, { css } from "styled-components";
import { StoreContext } from "../../../App";
import { ts12m, ts14sb } from "../../../design/fonts/typography";
import { COLORS } from "../../../design/theme";
import DropdownIcon from "../../../shared/images/down-arrow.svg";
import ShareIcon from "../../../shared/images/share.svg";
import QueryIcon from "./images/select.svg";

const CollectionContainer = styled.div`
  margin-top: 20px;
  border-top: 1px solid #7a7a7a;
  padding-top: 18px;
`;

type ToggleType = {
  expand: boolean;
};

const Toggle = styled.div<ToggleType>`
  cursor: pointer;
  :active {
    opacity: 0.7;
    transform: scale(0.97);
  }
  img {
    width: 12px;
    height: 12px;
  }

  ${({ expand }) =>
    expand &&
    css`
      transform: rotate(180deg);
    `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  ${ts14sb}
  color: ${COLORS.light.text.primary};
  margin-left: 8px;
`;

const Sync = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    opacity: 0.7;
    transform: scale(0.97);
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

const QueryData = styled.div`
  display: flex;
  flex-direction: column;
`;

const SavedQuery = styled.div`
  ${ts12m}
  color: ${COLORS.light.text.primary};
  padding: 10px 0px;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 12px;
    margin-right: 4px;
  }
`;

const QueryTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Collection = () => {
  const { bookmarkedQuery } = React.useContext(StoreContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <CollectionContainer>
      <Header>
        <HeaderLeft>
          <Toggle
            expand={isCollapsed}
            data-testid="toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <img src={DropdownIcon} alt="show all tables" height={12} width={12}/>
          </Toggle>
          <Title>SAVED</Title>
        </HeaderLeft>
        <Sync>
          <img src={ShareIcon} alt="share collection" height={16} width={16}/>
        </Sync>
      </Header>
      {!isCollapsed && (
        <QueryData test-dataid="all-saved-queries">
          {(Object.keys(bookmarkedQuery) as any).map((query: string) => (
            <SavedQuery>
              <img src={QueryIcon} alt="select" height={12} width={30}/>
              <QueryTitle>{query}</QueryTitle>
            </SavedQuery>
          ))}
        </QueryData>
      )}
    </CollectionContainer>
  );
};
